const readChunk = require('read-chunk');
const imageType = require('image-type');
const path = require('path');
const hasha = require('hasha');
const cryptoRandomString = require('crypto-random-string');

const UserActivation = require('../models/UserActivation');
const MailerService = require('../services/MailerService');
const ValidationService = require('../services/ValidationService');

const User = require('../models/User');

module.exports = {
  register: async (req, res) => {
    try {
      let filename = null;
      if (req.file) {
        const buffer = readChunk.sync(path.join(__dirname, `../public/images/${req.file.filename}`), 0, 12);
        if (imageType(buffer).mime.includes('image')) {
          filename = req.file.filename;
        }
      }

      const userData = JSON.parse(req.body.user);
      userData.avatar = filename;
      userData.password = hasha(userData.password);

      const user = await User.create(userData);

      const token = cryptoRandomString({ length: 15, type: 'url-safe' });

      const expiredAt = new Date();
      expiredAt.setHours(expiredAt.getHours() + 24);

      await UserActivation.create({ token, expiredAt, userId: user.id });

      MailerService.send(
        userData.email,
        'Confirmation email',
        `Let's confirm your email address.
        Please finish your registration by clicking on the link below:
        http://fullstack.braininghub.com:8080/registration/verify?token=${token}`,
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message, errors: err.errors }); // todo
    }
  },
  verify: async (req, res) => {
    try {
      const currentDate = new Date();
      const result = await ValidationService.select(req.query.token);
      if (result.length !== 0 && result[0].expiredAt >= currentDate) {
        ValidationService.setToVerified(result[0].userId);
      }
      const user = await User.findOne({
        where: { id: result[0].userId },
      });
      res.json(user);
    } catch (err) {
      console.log(`verify error: ${err}`);
    }
  },
};
