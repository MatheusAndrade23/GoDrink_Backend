const mongoose = require('mongoose');
const Requests = require('../models/requests');

module.exports.IncrementRequests = async (req, res, next) => {
  try {
    await Requests.updateOne({ index: 1 }, { $inc: { requests: 1 } });
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};
