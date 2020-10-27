module.exports = {
  get: async (req, res) => {
    const { store } = require('../../models');
    if (req.body === undefined || req.body.userId === undefined) {
      res.status(400).send('Bad Request');
    }
    const findStore = await store.findAll({
      where: {
        userId: req.body.userId,
      },
    });
    console.log('스토어', findStore);
    res.status(200).send(findStore);
  },
};
