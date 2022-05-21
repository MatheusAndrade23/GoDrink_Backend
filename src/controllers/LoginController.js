const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = class LoginApiController {
  static Login(req, res) {
    if (!req.body.user || !req.body.password) {
      res.status(406).json({
        message: 'Without User or Password',
        error: true,
      });
    } else {
      User.findOne({ user: req.body.user }, (error, user) => {
        if (error) {
          res.status(500).json({
            message: 'Internal Server Error!',
            error: true,
          });
        } else if (user) {
          if (req.body.password === user.password) {
            res.status(200).json({ message: 'Success', error: false });
          } else {
            res.status(401).json({ message: 'Wrong Password', error: true });
          }
        } else {
          res.status(406).json({ message: 'User not Found', error: true });
        }
      });
    }
  }

  static Register(req, res) {
    if (!req.body.user || !req.body.password) {
      res.status(406).json({
        message: 'Without User or Password',
        error: true,
      });
    } else {
      User.findOne({ user: req.body.user }, (error, user) => {
        if (error) {
          res.status(500).json({
            message: 'Internal Server Error!',
            error: true,
          });
        } else if (user) {
          res.status(406).json({
            message: 'This User already Exists',
            error: true,
          });
        } else {
          let NewUser = {
            email: req.body.user,
            password: req.body.password,
            favorites: [],
          };
          try {
            User.crate(NewUser);
            res.status(201).json({
              message: 'User Created with Success!',
              error: false,
            });
          } catch (error) {
            res.status(500).json({
              message: 'Internal Server Error while Creating User!',
              error: true,
            });
          }
        }
      });
    }
  }
};
