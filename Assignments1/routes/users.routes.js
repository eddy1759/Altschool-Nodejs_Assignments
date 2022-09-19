const express = require("express");
const path = require("path");
const {getDbFiles, writeToDb} = require('../utils')

const userRouter = express.Router();

const  usersDbPath = path.join(path.dirname(__dirname),"db", "users.json");

// =====================================================


userRouter.get('/', async (req, res, next) => {
    try {
        const {email, password} = req.body

        const users = await getDbFiles(usersDbPath);

        const userFound = users.find(user => user.email === email && user.password === password);

        if(!userFound) {
            res.status(404).send("User not found!")
            return
        }

        if(userFound.role !== "Admin"){
            res.status(403).send("Access denied")
            return
        }
        return res.status(200).json(users)
    } catch (error) {
        error.status = 404
        error.message = "Data not Found";
        next(error);
    };
        
        
});

userRouter.post("/auth", async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const users =  await getDbFiles(usersDbPath);

        const userFound = users.find((user) => user.email === email && user.password === password);

        if (!userFound) {
            res.status(404).send("User not found")
            return;
        }

        res.status(200).json(userFound)

    } catch (error) {
        error.status = 404;
        error.message = "Data Not Found";
        next(error);
    }
});


userRouter.post("/create", async (req, res, next) => {
    try {
        const {name, email, password, phoneNumber, address, role = "visitor"} = req.body;

        const users = await getDbFiles(usersDbPath)

        if (name == undefined || email == undefined || password == undefined || phoneNumber == undefined || address == undefined ) {
            res.status(400).end("Missing Information! The information is not complete");
            return
        }

        lastUser = users[users.length - 1];
        lastUserId = lastUser.userid;
        let userId = lastUserId + 1;

        const newBody = {... req.body, role, userId}

        users.push(newBody);
        writeToDb(usersDbPath, users)
        // fsPromise.writeFile(usersDbPath, JSON.stringify(users));
        return res.status(200).json(newBody);   

    } catch (error) {
        error.status = 404;
        error.message = "Data not found";
        next(error)
    }
});


userRouter.put("/profileUpdate", async (req, res, next) => {
    try {
            const {userid, detailsToUpdate} = req.body;
            const users = await getDbFiles(usersDbPath);
            const userIndex = users.findIndex(user => user.userid === userid);
            if (userIndex == -1){
                res.status(404).send("User not found")
                return
        }
            users[userIndex] = {...users[userIndex], ...detailsToUpdate}
            writeToDb(usersDbPath, users)
            // fsPromise.writeFile(usersDbPath, JSON.stringify(users))
            return res.status(200).send(users[userIndex])

    } catch (error) {
        error.status = 404
        error.message = "error-404.html";
        next(error);
    }
});

userRouter.delete("/delete", async (req, res, next) => {
    try {
        const {id} = req.body;
        const users =  await getDbFiles(usersDbPath);
        const userIndex = users.findIndex(user => user.id === id);
        if(userIndex == -1){
            res.status(404).send("User Not found. Can't delete user")
            return
        }

        const userDel = users.splice(userIndex, 1);
        writeToDb(usersDbPath, users)
        // fsPromise.writeFile(usersDbPath, JSON.stringify(users))
        res.status(200).send(...userDel)

    } catch (error) {
        error.status = 404;
        error.message = "Data Not Found";
        next(error)
    }
});

module.exports = {
    userRouter
}


