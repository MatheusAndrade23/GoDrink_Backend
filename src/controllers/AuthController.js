const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = class LoginApiController {
  static Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({
        message: 'The Email is required!',
      });
    }

    if (!password) {
      return res.status(422).json({
        message: 'The Password is required!',
      });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: 'User not Found!',
        });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(422).json({
          message: 'Wrong Password!',
        });
      }

      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,
        // {
        //   expiresIn: '18000s',
        // },
      );

      const userFiltered = await User.findOne({ email }, '-password');
      res
        .status(200)
        .json({ message: 'Logged with Success', token, user: userFiltered });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: 'Something went wrong, try again later!' });
    }
  };

  static Register = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({
        message: 'The Email is required!',
      });
    }

    if (!password) {
      return res.status(422).json({
        message: 'The Password is required!',
      });
    }

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(422).json({
          message: 'This Email is Already in Use!',
        });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = {
        email: email,
        password: passwordHash,
        favorites: [],
      };

      User.create(newUser);

      res.status(201).json({
        message: 'User Created with Success!',
        error: false,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Internal Server Error! Try again later!',
      });
    }
  };
};
