const { ERR_FORBIDDEN } = require('../utils/constants');

class ErrForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERR_FORBIDDEN;
  }
}

module.exports = ErrForbidden;
