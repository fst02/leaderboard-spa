const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/registration', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err); // todo
  }
});

module.exports = router;
