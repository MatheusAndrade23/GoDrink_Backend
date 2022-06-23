const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/signin', AuthController.Login);
router.post('/signup', AuthController.Register);
router.post('/send-email', AuthController.SendMail);
router.post('/reset-password', AuthController.ResetPassword);

module.exports = router;
