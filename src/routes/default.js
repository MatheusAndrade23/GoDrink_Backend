const express = require('express');
const router = express.Router();

const DefaultController = require('../controllers/DefaultController');
const { checkAuth } = require('../middlewares/CheckAuth');

router.get('/', DefaultController.ShowHome);

module.exports = router;
