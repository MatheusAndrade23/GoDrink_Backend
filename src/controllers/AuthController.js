const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const sendMail = require('../mail/index');

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

  static SendMail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(422).json({
        message: 'The Email is required!',
      });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: 'User not Found!',
        });
      }

      const secret = process.env.RESET_SECRET;
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,
        {
          expiresIn: '18000s',
        },
      );

      const mail = {
        to: 'matheusandrade.ma2003@gmail.com',
        subject: 'Password Recover - Go Drink',
        html: `<h2>HI!</h2><p>
        <a href='https://go-drink.vercel.app/password/${token}/${email}'>Click Here</a> to recover your password.</p>
        <p>If you didn't request it, please ignore it and don't share with anyone!</p>`,
        text: `Access this link to recover your password: https://go-drink.vercel.app/password/${token}/${email}`,
      };

      await sendMail(mail);

      res.status(200).json({ message: 'Check your mail box!' });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: 'Something went wrong, try again later!' });
    }
  };

  static ResetPassword = async (req, res) => {
    const { email, token, password } = req.body;

    if (!email) {
      return res.status(422).json({
        message: 'The Email is required!',
      });
    }

    if (!token) {
      return res.status(422).json({
        message: 'The Token is required!',
      });
    }

    if (!password) {
      return res.status(422).json({
        message: 'The password is required!',
      });
    }

    try {
      const secret = process.env.RESET_SECRET;
      jwt.verify(token, secret);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Invalid Token' });
    }

    try {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      await User.updateOne({ email }, { password: passwordHash });

      const userUpdated = await User.findOne({ email }, '-password');

      const mail = {
        to: 'matheusandrade.ma2003@gmail.com',
        subject: 'Password Recover - Go Drink',
        html: '<h2>HI!</h2><p>Password changed successfully!</p>',
        text: 'Password changed successfully',
      };

      await sendMail(mail);

      res.status(200).json({ user: userUpdated });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: 'Something went wrong, try again later!' });
    }
  };
};
