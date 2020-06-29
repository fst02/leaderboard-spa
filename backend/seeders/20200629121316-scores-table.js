const scores = require('./scores.json');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('scores', scores.map((score) => Object.assign(score, { createdAt: new Date(), updatedAt: new Date() }))),

  down: (queryInterface) => queryInterface.bulkDelete('scores', null, {}),
};
