const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const Error401 = require('../errors/error401');
const Error404 = require('../errors/error404');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) throw new Error404('Пользователь с указанным id не найден');

    res.send(user);
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name, about, avatar, email, password: hash,
    });
    res.send({
      name, about, avatar, email, id: newUser._id,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new Error404('Пользователь с указанным id не найден');

    const { name, about } = req.body;
    const newUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    );
    res.send(newUser);
  } catch (err) {
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new Error404('Пользователь с указанным id не найден');

    const { avatar } = req.body;
    const newUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    );
    res.send(newUser);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error401('Неправильные почта или пароль');

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new Error401('Неправильные почта или пароль');

    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

const getUserMe = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) throw new Error404('Пользователь с указанным id не найден');

    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers, getUserById, addUser, updateUser, updateAvatar, login, getUserMe,
};
