module.exports = {
  get: async (req, res) => {
    const { store_production, production } = require('../../models');
    const { storeId } = req.body;

    // if (req.body === undefined || req.body.userId === undefined||req.body.storeId===undefined||req.body.storeName===undefined) {
    // res.status(404).send('Bad Request');
    const menuList = await store_production.findAll({
      include: {
        model: production,
        attributes: ['productionName', 'price', 'info'],
      },
      where: {
        storeId: storeId,
      },
    });
    if (menuList) {
      res.status(200).send(menuList);
    } else {
      res.status(400).send('Bad Request');
    }
  },
};
