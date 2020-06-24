const express = require('express');
const multer = require('multer');
const readChunk = require('read-chunk');
const imageType = require('image-type');
const path = require('path');

const upload = multer({
  dest: 'public/images',
});

const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/registration', upload.single('file'), async (req, res) => {
  try {
    let filename = null;
    if (req.file) {
      const buffer = readChunk.sync(path.join(__dirname, `../public/images/${req.file.filename}`), 0, 12);
      if (imageType(buffer).mime.includes('image')) {
        filename = req.file.filename;
      }
    }
    const userData = Object.assign(JSON.parse(req.body.user), { avatar: filename });
    const user = await User.create(userData);
    res.json(user);
  } catch (err) {
    res.status(500).json(err); // todo
  }
});

module.exports = router;
