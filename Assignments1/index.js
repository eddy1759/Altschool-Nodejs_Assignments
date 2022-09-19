const express = require("express");
const bodyParser = require("body-parser");
const process = require('process');

const PORT = process.env.PORT || 3000;
const HOST_NAME = 'localhost'


const {userRouter} = require('./routes/users.routes');
const {bookRouter} = require('./routes/books.routes');

const app = express();

app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

app.get("/", (req, res) => {
    res.send("<h1>Welcome To The Home Page</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>ABOUT PAGE</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact Page</h1>");
});

app.get("/*", (req, res) => {
    // res.status(404).redirect("error-404.html");
    res.status(404).end("Page not found")
});


app.listen(PORT, () => {
    console.log(`Server is running on ${HOST_NAME}:${PORT}`);
});


module.exports = {
    app
}