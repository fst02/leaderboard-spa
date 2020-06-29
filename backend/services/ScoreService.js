const Score = require('../models/Score');
const User = require('../models/User');
const Game = require('../models/Game');

const select = async (orderColumn = 'maxPoints', orderDirection = 'DESC', game = 'All') => {
  const whereStatement = {};
  if (game !== 'All') {
    whereStatement.game = game;
  }
  const results = await Score.findAll({
    where: whereStatement,
    order: [[orderColumn, orderDirection]],
    include: [User, Game],
  });
  const exportData = [];
  results.forEach((result) => {
    exportData.push({
      id: result.id,
      name: result.user.nickname,
      game: result.game.game,
      maxPoints: result.maxPoints,
      numberOfRounds: result.numberOfRounds,
    });
  });
  return exportData;
};

module.exports = {
  select,
};
