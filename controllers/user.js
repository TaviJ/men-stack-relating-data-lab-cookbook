

const express = require("express");
const router = express.Router();
const User = require("../models/user.js");


router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "username"); // only grab username
    res.render("user/index.ejs", { users });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});


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
