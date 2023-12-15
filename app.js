const express = require('express')
const app = express()
const path = require('path')
const port = 5000
const bodyParser =require('body-parser')
const users = require('./models/users')
const router=require("./controller/myController")
const session = require("express-session")

const dotEnv = require('dotenv')
dotEnv.config()

// We can configure the dotenv like this instead of the above way
// require('dotenv').config()


const nocache=require("nocache")
app.use(nocache());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
      sameSite:'strict',
      secure: false,
      httpOnly: true,
    }
  }));
  
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use (bodyParser.urlencoded({extended:true}))
app.use('/',router);




app.listen(port, ()=>{
    console.log("Server running on the port 5000")
})
