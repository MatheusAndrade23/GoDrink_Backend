const mongoose = require('mongoose');

const Requests = mongoose.model('requests', {
  requests: Number,
});

module.exports = Requests;
