const { ERR_DEFAULT } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = ERR_DEFAULT, message } = err;

  res.status(statusCode).send(statusCode === ERR_DEFAULT
    ? { message: 'Ошибка сервера' }
    : { message });
  next();
};
