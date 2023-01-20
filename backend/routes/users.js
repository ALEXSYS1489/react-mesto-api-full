const express = require('express');
const { celebrate, Joi } = require('celebrate');

const users = express.Router();
const {
  getUsers, getUserById, updateUser, updateAvatar, getUserMe,
} = require('../controllers/users');

users.get('/', getUsers);

users.get('/me', getUserMe);

users.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserById);

users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      if (/http[s]?:\/\/w?w?w?\.?[a-z\d-.]+\.[a-z]+[\w\-.+)(^\][~:/?#@!$&'*,;=]+[#]?/.test(value)) {
        return value;
      }
      return helpers.message('Не корректная ссылка на аватар');
    }),
  }),
}), updateAvatar);

module.exports = users;
