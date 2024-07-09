const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
    let regedUsers = users.filter(user => {
       return user.username === username
    })
    if(regedUsers.length > 0){
        return true;
    }else {
        return false;
    }
}


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username
  const password = req.body.password
  if(username && password){
    if(doesExist(username)){
        return res.json({message : "User already exist!"})
    }else{
        users.push({
            username : username,
            password : password
        })
        return res.status(200).json({message : " User registered successfully!"})
    }
  }else{
    return res.status(404).json({message: "Not user details"});
  }
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Gets all books
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        return res.status(200).send(JSON.stringify(books, null, 4));
    },6000)})

  myPromise1.then(err => {
    return res.status(200).send("Error");
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Gets book by isbn
  
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        let isbn = req.params.isbn;
        return res.status(200).json(books[isbn]);
    },6000)})

  myPromise1.then(err => {
    return res.status(200).send("Error");
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Gets book by author


  let myPromise3 = new Promise((resolve,reject) => {
    setTimeout(() => {
        let author = req.params.author;
  let mBooks = []
  for(var x in books){
    if(books[x].author === author){
        mBooks.push(books[x])
    }
  }
 
  console.log(mBooks)
  return res.status(200).json(mBooks);
    },6000)})

  myPromise3.then(err => {
    return res.status(200).send("Error");
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
 //Gets book by title


 let myPromise3 = new Promise((resolve,reject) => {
    setTimeout(() => {
        let title = req.params.title;
        let mBooks = [];
        for(var x in books){
          if(books[x].title === title){
              mBooks.push(books[x])
          }
        }
        console.log(mBooks)
        return res.status(200).json(mBooks);
    },6000)})

  myPromise3.then(err => {
    return res.status(200).send("Error");
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Get reviews by isbn
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
