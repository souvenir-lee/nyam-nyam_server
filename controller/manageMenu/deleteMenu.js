module.exports = {
  post: async (req, res) => {
    const {
      store_production,
      production,
      production_ingredient,
    } = require('../../models');

    const { storeId, productionId } = req.body;
    const deleteProduction = await production.destroy({
      where: {
        id: productionId,
      },
    });
    const deleteP_I_Join = await production_ingredient.destroy({
      where: {
        productionId: productionId,
      },
    });
    const deleteS_P_Join = await store_production
      .destroy({
        where: { storeId: storeId, productionId: productionId },
      })
      .then(() => {
        // if (deleteProduction || deleteP_I_Join || deleteS_P_Join) {
        res.status(201).send('삭제되었습니다');
      })
      .catch((err) => {
        res.status(404).send('Bad Request');
      });
  },
};
