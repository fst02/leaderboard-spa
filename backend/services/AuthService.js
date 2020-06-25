const UserActivation = require('../models/UserActivation');

const select = async (token) => {
  const results = await UserActivation.findAll({
    where: { token },
  });
  const exportData = [];
  results.forEach((result) => {
    exportData.push({
      userId: result.userId,
      token: result.token,
      expiredAt: result.expiredAt,
    });
  });
  return exportData;
};

module.exports = {
  select,
};
