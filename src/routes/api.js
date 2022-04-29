const express = require('express');
const router = express.Router();

const ApiController = require('../controllers/ApiController');

router.get('/drink/list/:type', ApiController.GetList);
router.get('/drink/search/:letters', ApiController.Search);
router.get('/drink/random', ApiController.GetRandom);
router.get('/drink/:id', ApiController.GetById);

router.get('/drink/favorites', ApiController.Favorites);

module.exports = router;
