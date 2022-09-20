![Altschool Logo](https://raw.githubusercontent.com/Oluwasetemi/altschool-opensource-names/d5d87d27629fdd83b4a1d601afee0248f69cb25e/AltSchool-dark.svg)

# Altschool Nodejs BookStore Project 

After learning **Nodejs** in the second week of the second semester in Altschool, I started building this project in order to test what have learned so far.

## Table of contents

- [Overview](#overview)
  - [The project](#the-project)
  - [About project](#about-project)
  - [Usage](#usage)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### About project

This is an API created with Express framework. It can be classified into two main routes, the `users` routes and the `books` route. Each route contains the following methods:

- **Users** route:
  - createUser ```POST```
  - authenticateUser ```POST```
  - getAllUsers ```GET```
  - profileUpdate ```PUT```
- **Books** route:
  - createBook ```POST```
  - deleteBook ```DELETE```
  - loanOutBooks ```POST```
  - returnBooks ```POST```
  - updateBook ```PUT```

## Usage

Clone repository 

```
git clone https://<insert_your_token>@github.com/eddy1759/Altschool-Nodejs_Assignments
```

Change directory

```
cd Altschool-Nodejs_Assignments/Assignment1
```

Install dependencies

```
npm install
```

Start server

```
npm run start:dev
```
### Testing endpoints

| ENDPOINT                 |METHODS | DESCRIPTION                 | SEND DATA      |
| ------------------------ | ------ | --------------------------- | -------------- |
| /api/books               | GET    | Gets all books              | -              |
| /api/books/create        | POST   | Adds a book to database     | body `json`    |
| /api/books/update-book   | PUT    | Updates a book in database  | body `json`    |
| /api/books/deletebook    | DELETE | Deletes a book from db      | body `json`|
| /api/books/loanbook      | POST   | Loans  book                 | body `json`    |
| /api/books/returnbook    | POST   | Return books to database    | body `json`    |
| /api/users               | GET    | Gets all users fron db      | -              |
| /api/users/create        | POST   | Create new user             | body `json`    |
| /api/users/auth          | POST   | Authenticates user          | body `json`    |
| /api/users/profileUpdate | PUT    | Update User Profile         | body `json`    |
| /api/users//delete       | DELETE | Deletes a user from db      | body `json`    |
| /                        | GET    | Get the Home page           | -              |
| /about                   | GET    | Get the about page          | -              |
| /contact                 | GET    | Get the contact page        | -              |

## My process

The design process I used to create this API is very simple. First of all I had to write down the basic files and folders I will need and list the files that will be contained in each folder. While writing the code, there were five main stages in my design process which were: 

- Write test code to test routes
- Setup server with a request handler
- Add routes to request handler and test them
- Add functionality to each route
- test each route

### Built with

- NExpressJS

### What I learned

- How to setup a server with `NodeJS` and `Express`
- Basics of `authentication`
- Code documentation
- How to test code using `TDD` framework
- How to build a `CRUD` app
- Basics of error handling
- How to categorise code files


### Useful resources

Google [resource](https://google.com) was a very useful resource.

## Author

- Twitter - [@eddyozone](https://www.twitter.com/eddyozone)
- LinkedIn - [Edet Emmanuel Asuquo](https://www.linkedin.com/in/edet-e-asuquo/)
