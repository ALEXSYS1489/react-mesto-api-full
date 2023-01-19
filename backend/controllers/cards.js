const Card = require('../models/card');

const Error403 = require('../errors/error403');
const Error404 = require('../errors/error404');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const addCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const newCard = await new Card({ name, link, owner }).populate('owner');
    res.send(await newCard.save());
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) throw new Error404('Карточка с указанным id не найдена');
    if (!card.owner._id.equals(req.user._id)) throw new Error403('Нельзя удалять карточки других пользователей');

    await Card.findByIdAndRemove(req.params.cardId);
    res.send(card);
  } catch (err) {
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).populate(['owner', 'likes']);
    if (!card) throw new Error404('Карточка с указанным id не найдена');

    const updetedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate(['owner', 'likes']);
    res.send(updetedCard);
  } catch (err) {
    next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).populate(['owner', 'likes']);
    if (!card) throw new Error404('Карточка с указанным id не найдена');

    const updetedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).populate(['owner', 'likes']);
    res.send(updetedCard);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCards, addCard, deleteCard, likeCard, dislikeCard,
};
