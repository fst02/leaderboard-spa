class RegistrationError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = 'RegistrationError';
    this.errors = errors;
  }
}

module.exports = {
  RegistrationError,
};
