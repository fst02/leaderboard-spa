const readChunk = require('read-chunk');
const imageType = require('image-type');
const path = require('path');

const { RegistrationError } = require('../controllers/errors/RegistrationError');

module.exports = {
  imageUpload: async (file) => {
    try {
      let filename = null;
      if (file) {
        const buffer = readChunk.sync(path.join(__dirname, `../public/images/${file.filename}`), 0, 12);
        if (imageType(buffer).mime.includes('image')) {
          filename = file.filename;
        }
      }
      return filename;
    } catch (err) {
      throw new RegistrationError('Validation error', [{ path: 'image', message: 'Image only allowed' }]);
    }
  },
};
