const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/LoginController');

router.post('/login/signin', LoginController.Login);
router.post('/login/signup', LoginController.Register);

module.exports = router;
