const express = require('express');
const multer = require('multer');

const RegistrationController = require('../controllers/RegistrationController');

const upload = multer({
  dest: 'public/images',
  limits: { fileSize: 2 * 1024 * 1024 },
});

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/registration', upload.single('file'), RegistrationController.register);

module.exports = router;
