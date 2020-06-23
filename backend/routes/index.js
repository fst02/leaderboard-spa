const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/registration', async (req, res) => {
  console.log(req.body);
  await User.create(req.body);
  res.json({ response: 'ok' });
});

module.exports = router;
