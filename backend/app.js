const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors, celebrate, Joi } = require('celebrate');
const routes = require('./routes/index');
const { addUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => {
      if (/http[s]?:\/\/w?w?w?\.?[a-z\d-.]+\.[a-z]+[\w\-.+)(^\][~:/?#@!$&'*,;=]+[#]?/.test(value)) {
        return value;
      }
      return helpers.message('Не корректная ссылка на аватар');
    }),
  }).unknown(true),
}), addUser);

app.use(routes);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Не валидный id' });
  } else if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Ошибка валидации полей', ...err });
  } else if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с таким email уже зарегистрирован' });
  } else {
    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  }
  next();
});

async function connect() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});
  app.listen(PORT);
}

connect();
