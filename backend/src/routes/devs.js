const { Router } = require('express');
const controller = require('../controllers/devsController');
const route = Router();

route.get('/', controller.index);
route.post('/', controller.store);

module.exports = route;