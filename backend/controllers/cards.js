const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const InvalidDataError = require('../errors/InvalidDataError');
const ErrForbidden = require('../errors/ErrForbidden');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name, link, owner: req.user._id,
  })
    .then((card) => res.status(201).send({
      name: card.name,
      link: card.link,
      owner: card.owner,
      _id: card._id,
      likes: card.likes,
    }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`));
      } else {
        next(error);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка для удаления не найдена'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ErrForbidden('Нет прав у текущего пользователя');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.status(200).send(card))
        .catch(next);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`));
        return;
      } next(error);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка на нейдена');
      }
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`));
        return;
      } next(error);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка на нейдена');
      }
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`));
        return;
      } next(error);
    });
};
