const Sequelize = require('sequelize');
const User = require('./User');
const Game = require('./Game');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Score = sequelize.define('scores', {
  maxPoints: {
    type: Sequelize.INTEGER,
  },
  numberOfWins: {
    type: Sequelize.INTEGER,
  },
  numberOfRounds: {
    type: Sequelize.INTEGER,
  },
  country: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false,
      len: [1, 255],
    },
  },
  city: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false,
      len: [1, 255],
    },
  },
});

User.hasMany(Score);
Score.belongsTo(User);
Game.hasMany(Score);
Score.belongsTo(Game);

module.exports = Score;
