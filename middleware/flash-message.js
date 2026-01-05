// middleware/flash-message.js
const flashMessage = (req, res, next) => {
  res.locals.message = req.session.message || null;
  req.session.message = null; // clear after showing once
  next();
};

module.exports = flashMessage;
