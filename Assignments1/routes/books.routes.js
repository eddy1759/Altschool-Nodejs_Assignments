const express = require("express");
const path = require("path");
const fsPromise = require('fs').promises;
const {getDbFiles, writeToDb} = require('../utils');

const bookRouter = express.Router();

const booksDbPath = path.join(path.dirname(__dirname), "db", "books.json");
const  usersDbPath = path.join(path.dirname(__dirname),"db", "users.json");
const loanBooksDbPath = path.join(path.dirname(__dirname), "db", "loanBook.json");



bookRouter.get('/', async(req, res, next) => {
    try {
        const {email, password} = req.body;

        const books = await getDbFiles(booksDbPath);
        const users = await getDbFiles(usersDbPath);

        const userFound = users.find((user) => user.email == email && user.password == password);

        if (!userFound) {
            res.status(404).send("Invalid user details")
            return
        }

        return res.status(200).json(books)
    } catch (error) {
        error.status = 404
        error.message = "Data Not Found"
        next(error)

    }
});

bookRouter.post('/createbook', async (req, res, next) => {
    try {
        
        const {email, title, author, year, isbn, publisher, pages, rating} = req.body;

        const users = await getDbFiles(usersDbPath);
        const books = await getDbFiles(booksDbPath);
        const loanBooks = await getDbFiles(loanBooksDbPath);

        const userFound = users.find(user => user.email === email);
        const bookFound = books.find(book => book.title === title);
        const loanBookFound = loanBooks.find(loanbk => loanbk.title === title);


        if (!userFound) {
            res.status(404).send("Invalid User details")
            return
        }
        if (userFound.role !== "Admin") {
            res.status(401).send("Unauthorized Access")
            return
        }

        if (bookFound === undefined || loanBookFound === undefined) {

            const lastBook = books[books.length - 1];
            let lastBookId = lastBook.bookId;
            let bookId = lastBookId + 1
    
            const newBook = {bookId, title, author, year, isbn, publisher, pages, rating}
            books.push(newBook);
            writeToDb(booksDbPath, books);
            res.status(200).json(newBook);

        } else {
            res.status(404).send("Book already exits")
        }

       

    } catch (error) {
        error.status = 404
        error.message = "Data Not found"
        next(error)
    }
})


bookRouter.delete('/', async (req, res, next) => {
    try {
        const {bookId} = req.body;
        const books = await getDbFiles(booksDbPath);

        const bookIndex = books.findIndex(book => book.bookId === bookId)

        if (bookIndex == -1) {
            res.status(404).send("Book not found")
            return
        }

        const bookDel = books.splice(bookIndex, 1);
        fsPromise.writeFile(booksDbPath, JSON.stringify(books));
        res.status(200).send(...bookDel);

    } catch (error) {
        error.status = 404;
        error.message = "Data Not Found"
        next(error)
    }
});

bookRouter.post('/loanbook', async (req, res, next) => {
    try {
    
        const {email, password, title} = req.body;

        const users = await getDbFiles(usersDbPath);
        const books = await getDbFiles(booksDbPath);
        
        const userFound = users.find(user => user.email === email && user.password === password);
        if (!userFound) {
            res.status(404).send("Email or Password Incorrect")
            return
        }
        
        const bookToLoan = books.find(book => book.title === title)
        if (!bookToLoan){
            res.status(404)
            .send("The requested book isn't available")
            return
        }

        const dt = new Date();
        let timeNow = dt.getUTCDate() + "-" + (dt.getUTCMonth() + 1) + "-" + dt.getUTCFullYear()

        const loanBooks = await getDbFiles(loanBooksDbPath);
        let lastLoanBook = loanBooks[loanBooks.length - 1];

        let lastLoanBookId = lastLoanBook.id,
        id = lastLoanBookId + 1

        const loanBooksToAddDb = { email, id, bookToLoan, timeNow};

        const avaialableBooks = books.filter((book) => book.bookId !== bookToLoan.bookId
        );

        // // pushing loan bok to its db
        loanBooks.push(loanBooksToAddDb);
        fsPromise.writeFile(loanBooksDbPath, JSON.stringify(loanBooks));
        fsPromise.writeFile(booksDbPath, JSON.stringify(avaialableBooks))

        return res.status(200).json(bookToLoan)
    }catch (error) {
        error.status = 404;
        error.message = "Data Not Found";
        next(error);
    }
});

bookRouter.post('/returnbook', async (req, res, next) => {
    try {
        const {id} = req.body;
        const loanBooks = await getDbFiles(loanBooksDbPath);
        const books = await getDbFiles(booksDbPath)

        const returnBook = loanBooks.find((returnbk) => returnbk.id === id);

        if (!returnBook) {
            res.status(404).send("Book title not valid")
            return
        }

        const newLoanBks = loanBooks.filter((book) => book.id !== returnBook.id)
        books.push(returnBook.bookToLoan);

        // fsPromise.writeFile(loanBooksDbPath, JSON.stringify(newLoanBks));
        // fsPromise.writeFile(booksDbPath, JSON.stringify(books));

        writeToDb(loanBooksDbPath, newLoanBks);
        writeToDb(booksDbPath, books);

        return res.status(200).json(returnBook.bookToLoan);
        
    } catch (error) {
        error.status = 404;
        error.message = "Data Not Found"
        next(error)
    }
});

bookRouter.put("/update-book", async (req, res, next) => {
    try {
        const {bookId, detailsToUpdate} = req.body

        const books = await getDbFiles(booksDbPath);

        const bookIndex = books.findIndex(book => book.bookId === bookId)

        if (bookIndex == -1) {
            res.status(404).send("Book not found")
            return
        }

        const bookToUpdate = { ...books[bookIndex], ...detailsToUpdate};
        books[bookIndex] = bookToUpdate

        writeToDb(booksDbPath, books);
        res.status(200).json(books[bookIndex])
    } catch (error) {
        error.status = 404;
        error.message = "Data Not found"
        next(error);
    }
})

bookRouter.delete('/deletebook', async (req, res, next) => {
    try {
        const {Id} = req.body;
        const books = await getDbFiles(booksDbPath)

        const bookIndex = books.findIndex(book => book.bookId === Id);
        if (bookIndex == -1) {
            res.status(404).send("Book not found")
            return
        }

        const bookDel = books.splice(bookIndex, 1);
        writeToDb(booksDbPath, books)
        res.status(200).send(...bookDel)

    } catch (error) {
        error.status = 404
        error.message = "Data Not Found"
        next(error)
    }
})


module.exports = {
    bookRouter
}