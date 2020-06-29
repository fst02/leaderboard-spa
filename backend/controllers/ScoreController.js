const ScoreService = require('../services/ScoreService');

const all = async (req, res) => {
  try {
    const { order, game, orderByColumn } = req.query;
    const scores = await ScoreService.select(orderByColumn, order, game);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message, errors: err.errors });
  }
};

module.exports = {
  all,
};
