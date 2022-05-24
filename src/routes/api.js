const express = require('express');
const router = express.Router();

const ApiController = require('../controllers/ApiController');

const CheckAuth = require('../middlewares/CheckAuth').checkAuth;

router.post('/favorites', CheckAuth, ApiController.GetFavorites);
router.patch('/favorites', CheckAuth, ApiController.ManageFavorites);

module.exports = router;
