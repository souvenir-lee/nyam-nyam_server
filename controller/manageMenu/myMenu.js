module.exports = {
  get: (req, res) => {
    const { store, user, production } = require('../../models');
    const { token, storeName } = req.body;
    user.findOne({
      where: {
        storeName: storeName,
      },
    });
  },
};
