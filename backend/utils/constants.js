const ERR_BAD_REQUEST = 400;
const ERR_NOT_FOUND = 404;
const ERR_DEFAULT = 500;
const ERR_AUTH = 401;
const ERR_FORBIDDEN = 403;
const ERR_DUPLICATE = 409;

const linkRegExp = /^https?:\/\/(www\.)?([a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=])+\b(\/|#)?$/;

module.exports = {
  ERR_BAD_REQUEST,
  ERR_NOT_FOUND,
  ERR_DEFAULT,
  ERR_AUTH,
  ERR_FORBIDDEN,
  ERR_DUPLICATE,
  linkRegExp,
};
