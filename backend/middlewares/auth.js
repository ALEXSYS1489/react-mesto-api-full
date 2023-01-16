const jwt = require('jsonwebtoken');

const Error401 = require('../errors/error401');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error401('Необходима авторизация');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      throw new Error401('Необходима авторизация');
    }

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
