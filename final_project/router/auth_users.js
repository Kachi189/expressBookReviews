const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    if(username){
        return true
    }else{
        return false
    }
    //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username, password)=>{ 
    let regedUsers = users.filter(user => {
        return username === user.username && password === user.password
    })
    if(regedUsers.length > 0){
        return true;
    }else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username
  const password = req.body.password
  if(!username || !password){
    return res.status(404).json({message: "Can not log in user"});
  }

    if(authenticatedUser(username, password)){
        let accessToken = jwt.sign({
            data : password
        }, "access", {expiresIn : 60 * 60 * 60});

        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).json({message: "User logged in!"}); 
    }else{
       return res.status(404).json({message: "User not authenticated"}); 
    }
  
});

// Add a book review
regd_users.put("/auth/review/:isbn", async (req, res) => {
  //Write your code here

  const isbn = req.params.isbn;
  const review = req.query.review;
  const userName = req.session.authorization.username;
  let myRev = books[isbn].reviews
 myRev[userName] = review;

  return res.json({message : "Review added Successfully!"});

//    if(isValid(username))
//     books[isbn].review[username] = review;
//     // console.log(isValid(username),)
//     return res.status(200).json({message: "Review added"});
//   }else{
//     return res.status(403).json({message: "User not authorized"});
//   }
  
});
// Delete book review
regd_users.delete("/auth/review/:isbn", async (req, res) => {
  //Write your code here

  const isbn = req.params.isbn;
//   const review = req.query.review;
  const userName = req.session.authorization.username;
  let myRev = books[isbn].reviews
 delete myRev[userName];

  return res.json({message : "Review Deleted Successfully!"});

//    if(isValid(username))
//     books[isbn].review[username] = review;
//     // console.log(isValid(username),)
//     return res.status(200).json({message: "Review added"});
//   }else{
//     return res.status(403).json({message: "User not authorized"});
//   }
  
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
