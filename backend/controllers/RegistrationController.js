const readChunk = require('read-chunk');
const imageType = require('image-type');
const path = require('path');
const hasha = require('hasha');

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
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message, errors: err.errors }); // todo
    }
  },
};
