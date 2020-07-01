const hasha = require('hasha');
const User = require('../models/User');
const { VerificationError } = require('./errors/VerificationError');

const FileUploadService = require('../services/FileUploadService');

module.exports = {
  update: async (req, res) => {
    try {
      const filename = await FileUploadService.imageUpload(req.file);
      const userData = JSON.parse(req.body.user);
      const user = await User.findOne({ where: { id: req.params.userId } });
      if (user.password !== hasha(userData.password)) {
        throw new VerificationError('Invalid password');
      }
      if (filename) {
        user.avatar = filename;
      }
      user.introduction = userData.introduction;
      user.save();
      res.json(user);
    } catch (err) {
      if (err instanceof VerificationError) {
        res.status(422).json({ error: err.toJSON() });
      }
      res.status(500).json({
        error: err,
        errors: err.errors,
      });
    }
  },
};
