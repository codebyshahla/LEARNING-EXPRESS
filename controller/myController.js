const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const { log } = require("console");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let users = JSON.parse(fs.readFileSync("./models/users.json"));


const signup = (req, res) => {
  res.render("signup");
};

const resignup = (req, res) => {
  const { name, password } = req.body;
  let user = users.find((e) => {
    return e.name == name;
  });
  if (user) {
    res.redirect("/");
  } else {
    users.push({name: name.trim(), password:password.trim()});
    fs.writeFile("./models/users.json", JSON.stringify(users), (err) => {});
    req.session.username = name;
    res.redirect("/home");
  }
};

const home = (req, res) => {
  if (req.session.username) {
    res.render("home");
  } else {
    res.redirect("/login");
  }
};

const login = (req, res) => {
  res.render("login");
};

const relogin = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  let user = users.find((e) => {
    return e.name == email && e.password == password;
  });
  console.log(users);
  console.log(user);
  if (user) {
    req.session.username = email;
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.sendStatus(500);
    } else {
      res.redirect("/login");
    }
  });
};

module.exports = {
  signup,
  resignup,
  home,
  login,
  relogin,
  logout,
};
