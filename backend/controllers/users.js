const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const InvalidDataError = require('../errors/InvalidDataError');
const NotFoundError = require('../errors/NotFoundError');
const DuplicateError = require('../errors/DuplicateError');

const SALT_ROUNDS = 10;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => {
      User.create({
        email, password: hash, name, about, avatar,
      })
        .then((user) => res.status(201).send({
          data: {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          },
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new InvalidDataError(`Переданы некорректные данные: ${err.message}`));
          } else if (err.code === 11000) {
            next(new DuplicateError('Пользователь с данным email уже существует'));
          } else {
            next(err);
          }
        });
    });
};

module.exports.findUsers = (req, res, next) => {
  User.find({})
    .then((users) => res
      .send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new InvalidDataError('некорректный id пользователя'));
        return;
      } next(error);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        next(new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`));
        return;
      } next(error);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        next(new InvalidDataError(`Запрос содержит некорректные данные ${error.message}`));
        return;
      } next(error);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .status(200)
        .send({ token });
    })
    .catch(next);
};
