const express = require('express');
const { celebrate, Joi } = require('celebrate');

const users = express.Router();
const {
  getUsers, getUserById, updateUser, updateAvatar, getUserMe,
} = require('../controllers/users');

users.get('/', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), getUsers);

users.get('/me', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), getUserMe);

users.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }).unknown(true),
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), getUserById);

users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), updateUser);

users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      if (/http[s]?:\/\/w?w?w?\.?[a-z\d-.]+\.[a-z]+[\w\-.+)(^\][~:/?#@!$&'*,;=]+[#]?/.test(value)) {
        return value;
      }
      return helpers.message('Не корректная ссылка на аватар');
    }),
  }).unknown(true),
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), updateAvatar);

module.exports = users;
