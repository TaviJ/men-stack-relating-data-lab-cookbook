const express = require('express');
const router = express.Router();
const User = require('../models/user');

// INDEX – show pantry
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    res.render('foods/index.ejs', {
      pantry: user.pantry,
      userId: user._id
    });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// NEW
router.get('/new', (req, res) => {
  res.render('foods/new.ejs', { userId: req.session.user._id });
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    user.pantry.push({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });

    await user.save();

    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;
