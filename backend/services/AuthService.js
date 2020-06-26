const UserActivation = require('../models/UserActivation');

const select = async (token) => {
  const result = await UserActivation.findOne({
    where: { token },
  });
  return result;
};

module.exports = {
  select,
};
