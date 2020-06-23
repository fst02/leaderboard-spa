var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/registration', async (req, res) => {
  res.json({ response: 'ok' });
});


module.exports = router;
