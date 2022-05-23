const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/LoginController');

router.post('/signin', LoginController.Login);
router.post('/signup', LoginController.Register);

module.exports = router;
