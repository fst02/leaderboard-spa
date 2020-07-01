const express = require('express');
const multer = require('multer');

const RegistrationController = require('../controllers/RegistrationController');
const SignInController = require('../controllers/SignInController');
const ScoreController = require('../controllers/ScoreController');
const ProfileController = require('../controllers/ProfileController');

const upload = multer({
  dest: 'public/images',
  limits: { fileSize: 2 * 1024 },
}).single('file');

const router = express.Router();

router.get('/score/all', ScoreController.all);

router.post('/registration', upload, RegistrationController.register);

router.get('/registration/verify', RegistrationController.verify);

router.post('/signin', SignInController.signIn);

router.put('/profile/update/:userId', upload, ProfileController.update);

module.exports = router;
