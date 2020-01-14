const { Router } = require('express');
const controller = require('../controllers/devsController');
const route = Router();

route.get('/', controller.index);
route.post('/', controller.store);
route.put('/', controller.update);
route.delete('/', controller.destroy);

module.exports = route;