const mongoose = require('mongoose');

const User = mongoose.model('users', {
  email: String,
  password: String,
  favorites: Array,
  passwordResetToken: String,
  passwordResetExpires: String,
});

module.exports = User;
