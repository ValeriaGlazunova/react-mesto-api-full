const { ERR_DUPLICATE } = require('../utils/constants');

class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERR_DUPLICATE;
  }
}

module.exports = DuplicateError;
