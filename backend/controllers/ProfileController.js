const hasha = require('hasha');
const multer = require('multer');
const User = require('../models/User');
const { VerificationError } = require('./errors/VerificationError');

const FileUploadService = require('../services/FileUploadService');

module.exports = {
  update: async (req, res, err) => {
    try {
      const filename = await FileUploadService.imageUpload(req.file);
      const userData = JSON.parse(req.body.user);
      const user = await User.findOne({ where: { id: req.params.userId } });
      if (err instanceof multer.MulterError) {
        res.status(500).json(err);
        return;
      }
      if (user.password !== hasha(userData.password)) {
        throw new VerificationError('Invalid password');
      }
      if (filename) {
        user.avatar = filename;
      }
      user.introduction = userData.introduction;
      if (userData.newPassword) {
        user.password = hasha(userData.newPassword);
      }
      user.save();
      res.json(user);
    } catch (error) {
      if (error instanceof VerificationError) {
        res.status(422).json({ error: error.toJSON() });
      }
      res.status(500).json({
        error,
        errors: error.errors,
      });
    }
  },
};
