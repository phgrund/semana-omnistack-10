const { Router } = require('express');
const route = Router();

const devsRoute = require('./routes/devs');
const searchRoute = require('./routes/search');

route.use('/devs', devsRoute);
route.use('/search', searchRoute);

module.exports = route;