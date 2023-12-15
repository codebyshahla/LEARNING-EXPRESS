const express = require("express");
const Router = express.Router();
const {
  signup,
  home,
  login,
  logout,
  relogin,
  resignup,
} = require("../controller/myController");

Router.get("/", signup);
Router.post("/signup", resignup);
Router.get("/home", home);
Router.get("/login", login);
Router.post("/login", relogin);
Router.get("/logout", logout);

module.exports = Router;
