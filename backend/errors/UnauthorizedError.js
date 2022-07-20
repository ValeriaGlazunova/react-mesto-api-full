const { ERR_AUTH } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERR_AUTH;
  }
}

module.exports = UnauthorizedError;
