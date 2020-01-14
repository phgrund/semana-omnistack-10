const { Router } = require('express');
const controller = require('../controllers/searchController');
const route = Router();

route.get('/', controller.index);

module.exports = route;