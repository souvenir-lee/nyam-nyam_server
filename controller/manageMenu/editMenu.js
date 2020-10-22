const {
  store,
  production,
  production_ingredient,
  store_production,
} = require('../../models');
module.exports = {
  get: async (req, res) => {
    const { storeId, productionId } = req.body;
    const menuInfo = await store_production.findOne({
      include: {
        model: store,
        attributes: ['storeName'],
        include: {
          model: production,
          attributes: ['productionName', 'productionImg', 'price', 'info'],
        },
      },
      where: { storeId: storeId, productionId: productionId }, //여긴 store소속이 맞음
    });
    res.status(200).send(menuInfo);
  },
  post: async (req, res) => {
    const {
      storeId,
      userId,
      productionId,
      productionName,
      productionImg,
      price,
      ingredient1,
      ingredient2,
      info,
      storeName,
      dessertType,
      type,
    } = req.body;

    const editMenu = await production.update(
      {
        productionName: productionName,
        productionImg: productionImg,
        price: price,
        info: info,
        dessertType: dessertType,
        type: type,
      },
      { where: { id: productionId } }
    );
    const editIngredient = await production_ingredient.update(
      {
        ingredientId: ingredient1,
      },
      { where: { productionId: productionId } }
    );
    if (ingredient2) {
      production_ingredient.create({
        productionId: productionId,
        ingredientId: ingredient2,
      });
    }
    if (editMenu) {
      if (editIngredient) {
        res.status(201).send('수정되었습니다');
      }
    } else {
      res.status(404).send('Bad Request');
    }
  },
};
