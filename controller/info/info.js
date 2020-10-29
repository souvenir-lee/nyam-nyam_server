module.exports = {
  get: async (req, res) => {
    const {
      user,
      store,
      production_quantity,
      store_production,
    } = require('../../models');
    const { userId } = req.params;

    const findUser = await user.findOne({
      attributes: ['username', 'userImg'],
      where: { id: userId },
    }); //user
    console.log('유저', findUser);
    const findStore = await store.findAndCountAll({
      attributes: ['id'],
      where: {
        userId: userId,
      },
    }); //findStore.rows.length

    const productions = [];
    for (let i = 0; i < findStore.count; i++) {
      const findProduction = await store_production.findAndCountAll({
        attributes: ['storeId', 'productionId'],
        where: {
          storeId: findStore.rows[i].dataValues.id,
        },
      });
      productions.push(findProduction); //내 매장에 있는 제품들
    }
    const sumProductions = (productions) => {
      let count = 0;
      for (let i = 0; i < productions.length; i++) {
        count = count + productions[i].count;
      }
      return count;
    };
    const quantities = [];
    for (let i = 0; i < productions.length; i++) {
      for (let j = 0; j < productions[i].count; j++) {
        const quantity = await production_quantity.findAll({
          attributes: ['storeId', 'productionId', 'quantity'],
          where: {
            storeId: findStore.rows[i].dataValues.id,
            productionId: productions[i].rows[j].dataValues.productionId,
          },
        });
        quantities.push(quantity);
      }
    }
    res.status(200).send({
      username: findUser.dataValues.username,
      userImg: findUser.dataValues.userImg,
      store: findStore.count,
      production: sumProductions(productions),
      upload: quantities.length,
    });
    console.log('콘솔', quantities);
  },
};
