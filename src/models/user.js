const mongoose = require('mongoose');

const User = mongoose.model('users', {
  user: String,
  password: String,
  favorites: Array,
});

module.exports = User;
