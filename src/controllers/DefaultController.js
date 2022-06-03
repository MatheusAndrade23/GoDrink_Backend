const mongoose = require('mongoose');
const Requests = require('../models/requests');

module.exports = class ApiController {
  static ShowHome = async (req, res) => {
    try {
      const requests = await Requests.findOne({ index: 1 });
      res.render('pages/defaultpage', { number: requests.requests });
    } catch (error) {
      res.render('pages/defaultpage', { number: 'Error' });
    }
  };
};
