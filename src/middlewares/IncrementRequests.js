const mongoose = require('mongoose');
const Requests = require('../models/requests');

module.exports.IncrementRequests = async (req, res, next) => {
  await Requests.updateOne({ index: 1 }, { $inc: { requests: 1 } });
  next();
};
