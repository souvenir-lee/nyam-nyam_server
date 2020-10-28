const {
  user,
  store,
  production,
  production_quantity,
  store_production,
} = require('../../models');
module.exports = {
  get: async (req, res) => {
    const { userId } = req.body;
    const findUser = await user.findOne({
      attributes: ['username', 'userImg'],
      where: { id: userId },
    }); //user
    const findStore = await store.findAndCountAll({
      attributes: ['id'],
      where: {
        userId: userId,
      },
    }); //findStore.rows.length
    const productions = [];
    for (let i = 0; i < findStore.rows.length; i++) {
      const findProduction = await store_production.findAndCountAll({
        attributes: ['id'],
        where: {
          storeId: findStore.rows[i].dataValues.id,
        },
      });
      productions.push(findProduction);
      const findUpload = store_production.findAndCountAll({
        include: {
          model: production_quantity,
          attributes: ['id'],
        },
        where: {
          storeId: findProduction.rows,
        },
      });
    }
    res.status(200).send(productions);
    console.log('길이', findProduction.rows[0].dataValues.id);
    console.log('asdfasdfa', findStore.rows);
  },
};