class VerificationError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'VerificationError';
  }

  toJSON() {
    return { message: this.message };
  }
}

module.exports = {
  VerificationError,
};
