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
        enMessage: 'The Email is required!',
        ptBrMessage: 'O email é obrigatório!',
      });
    }

    if (!password) {
      return res.status(422).json({
        enMessage: 'The Password is required!',
        ptBrMessage: 'A senha é obrigatória!',
      });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          enMessage: 'Wrong user or password!',
          ptBrMessage: 'Usuário ou senha incorretos!',
        });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(422).json({
          enMessage: 'Wrong user or password!',
          ptBrMessage: 'Usuário ou senha incorretos!',
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
      res.status(200).json({
        enMessage: 'Logged with Success',
        ptBrMessage: 'Autenticado com sucesso!',
        token,
        user: userFiltered,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        enMessage: 'Something went wrong, try again later!',
        ptBrMessage: 'Algo deu errado, tente novamente mais tarde!',
      });
    }
  };

  static Register = async (req, res) => {
    const { email, password } = req.body;
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

    const emailTested = emailRegex.test(email);

    if (!email) {
      return res.status(422).json({
        enMessage: 'The Email is required!',
        ptBrMessage: 'O email é obrigatório!',
      });
    }

    if (!password) {
      return res.status(422).json({
        enMessage: 'The Password is required!',
        ptBrMessage: 'A senha é obrigatória!',
      });
    }

    if (!emailTested) {
      return res.status(422).json({
        enMessage: 'Invalid Email!',
        ptBrMessage: 'Email inválido!',
      });
    }

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(422).json({
          enMessage: 'This Email is Already in Use!',
          ptBrMessage: 'Este email já está em uso!',
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
        enMessage: 'User Created with Success!',
        ptBrMessage: 'Usuário criado com sucesso!',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        enMessage: 'Internal Server Error! Try again later!',
        ptBrMessage: 'Algo deu errado, tente novamente mais tarde!',
      });
    }
  };

  static SendMail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(422).json({
        enMessage: 'The Email is required!',
        ptBrMessage: 'O email é obrigatório!',
      });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          enMessage: 'User not Found!',
          ptBrMessage: 'Usuário não encontrado!',
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
        to: email,
        subject: 'Password Recover - Go Drink',
        html: `<h2>HI!</h2><p>
        <a href='https://go-drink.vercel.app/password/${token}/${email}'>Click Here</a> to recover your password.</p>
        <p>If you didn't request it, please ignore it and don't share with anyone!</p>`,
        text: `Access this link to recover your password: https://go-drink.vercel.app/password/${token}/${email}`,
      };

      await sendMail(mail);

      res.status(200).json({
        enMessage: 'Check your mail box!',
        ptBrMessage: 'Verifique sua caixa de email!',
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        enMessage: 'Something went wrong, try again later!',
        ptBrMessage: 'Algo deu errado, tente novamente mais tarde!',
      });
    }
  };

  static ResetPassword = async (req, res) => {
    const { email, token, password } = req.body;

    if (!email) {
      return res.status(422).json({
        enMessage: 'The Email is required!',
        ptBrMessage: 'O email é obrigatório!',
      });
    }

    if (!token) {
      return res.status(422).json({
        enMessage: 'The Token is required!',
        ptBrMessage: 'O token é obrigatório!',
      });
    }

    if (!password) {
      return res.status(422).json({
        enMessage: 'The password is required!',
        ptBrMessage: 'A senha é obrigatória!',
      });
    }

    try {
      const secret = process.env.RESET_SECRET;
      jwt.verify(token, secret);
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ enMessage: 'Invalid Token', ptBrMessage: 'Token inválido' });
    }

    try {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      await User.updateOne({ email }, { password: passwordHash });

      const mail = {
        to: email,
        subject: 'Password Recover - Go Drink',
        html: '<h2>HI!</h2><p>Password changed successfully!</p>',
        text: 'Password changed successfully',
      };

      await sendMail(mail);

      const userUpdated = await User.findOne({ email }, '-password');

      res.status(200).json({ user: userUpdated });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        enMessage: 'Something went wrong, try again later!',
        ptBrMessage: 'Algo deu errado, tente novamente mais tarde!',
      });
    }
  };
};
