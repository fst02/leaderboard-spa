const User = require('../models/User');
const { RegistrationError } = require('../controllers/errors/RegistrationError');
const UserActivation = require('../models/UserActivation');

module.exports = {
  create: async (userData) => {
    try {
      const user = await User.create(userData);
      return user;
    } catch (err) {
      throw new RegistrationError('Validation error', err.errors);
    }
  },

  activate: async (user, token) => {
    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 24);
    try {
      await UserActivation.create({ token, expiredAt, userId: user.id });
    } catch (err) {
      throw new RegistrationError('Validation error', err.errors);
    }
  },
};
