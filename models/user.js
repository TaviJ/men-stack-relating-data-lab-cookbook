const mongoose = require('mongoose');

// Food schema (embedded)
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // EMBEDDED PANTRY
  pantry: [foodSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;