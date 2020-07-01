const User = require('../models/User');

const FileUploadService = require('../services/FileUploadService');

module.exports = {
  update: async (req, res) => {
    try {
      const filename = await FileUploadService.imageUpload(req.file);
      const userData = JSON.parse(req.body.user);
      const user = await User.findOne({ where: { id: req.params.userId } });
      if (filename) {
        user.avatar = filename;
      }
      user.introduction = userData.introduction;
      user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message, errors: err.errors });
    }
  },
};
