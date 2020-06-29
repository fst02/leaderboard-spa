const express = require('express');
const multer = require('multer');

const RegistrationController = require('../controllers/RegistrationController');
const SignInController = require('../controllers/SignInController');
const ScoreController = require('../controllers/ScoreController');

const upload = multer({
  dest: 'public/images',
  limits: { fileSize: 2 * 1024 * 1024 },
});

const router = express.Router();

router.get('/score/all', ScoreController.all);

router.post('/registration', upload.single('file'), RegistrationController.register);

router.post('/signin', SignInController.signIn);

router.get('/registration/verify', RegistrationController.verify);

module.exports = router;
