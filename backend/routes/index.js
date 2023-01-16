const express = require('express');
const users = require('./users');
const cards = require('./cards');
const auth = require('../middlewares/auth');
const Error404 = require('../errors/error404');

const routes = express.Router();

routes.use('/users', auth, users);
routes.use('/cards', auth, cards);
routes.use('/*', async (req, res, next) => {
  try {
    throw new Error404('Страница не найдена');
  } catch (err) { next(err); }
});

module.exports = routes;
