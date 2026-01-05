// controllers/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// COMMUNITY INDEX - GET /users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "username"); // only grab username
    res.render("user/index.ejs", { users });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// COMMUNITY SHOW - GET /users/:userId
router.get("/:userId", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.userId);
    res.render("user/show.ejs", { foundUser });
  } catch (err) {
    console.log(err);
    res.redirect("/user");
  }
});

module.exports = router;
