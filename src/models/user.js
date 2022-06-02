const mongoose = require('mongoose');

const User = mongoose.model('users', {
  email: String,
  password: String,
  favorites: Array,
});

module.exports = User;
