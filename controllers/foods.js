

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get("/", async (req, res) => {
  try{
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    res.render("foods/index.ejs", {pantry: user.pantry});
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
});
router.get("/new", (req, res) => {
  res.render("foods/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);

    user.pantry.push(req.body);
    await user.save();
req.session.message = "Item added to your pantry!";
res.redirect(`/user/${userId}/foods`);
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
});
router.get("/:itemId/edit", async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);

    const food = user.pantry.id(req.params.itemId);
    if (!food) return res.redirect(`/user/${userId}/foods`);


    res.render("foods/edit.ejs", { food });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
});
router.put("/:itemId", async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);

    const food = user.pantry.id(req.params.itemId);
    if (!food) return res.redirect(`/user/${userId}/foods`);

    food.set(req.body);
    await user.save();

    req.session.message = "Item updated!";
    res.redirect(`/user/${userId}/foods`);
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }

});
router.put("/:itemId", async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);

    const food = user.pantry.id(req.params.itemId);
    if (!food) return res.redirect(`/user/${userId}/foods`);

    food.set(req.body);
    await user.save();

    res.redirect(`/user/${userId}/foods`);
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
});
router.delete("/:itemId", async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);

    user.pantry.id(req.params.itemId).deleteOne();
    await user.save();
req.session.message = "Item deleted.";
res.redirect(`/user/${userId}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
module.exports = router;
