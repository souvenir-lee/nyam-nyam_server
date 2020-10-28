const {
  store,
  production,
  production_ingredient,
  ingredient,
} = require('../../models');
module.exports = {
  get: async (req, res) => {
    const { storeId, productionId } = req.body;
    const storeInfo = await store.findOne({
      where: { id: storeId },
    });
    const menuInfo = await production.findOne({
      where: { id: productionId },
    });
    const findIngredient = await production_ingredient.findAll({
      where: { productionId: productionId },
    });
    const ingredientInfo = await ingredient.findOne({
      where: {
        id: findIngredient[0].dataValues.ingredientId,
      },
    });
    if (storeInfo) {
      if (menuInfo) {
        if (ingredientInfo) {
          if (findIngredient[1]) {
            const ingredientInfo2 = await ingredient.findOne({
              where: {
                id: findIngredient[1].dataValues.ingredientId,
              },
            });
            res.status(200).send({
              storeName: storeInfo.dataValues.storeName,
              productionName: menuInfo.dataValues.productionName,
              price: menuInfo.dataValues.price,
              info: menuInfo.dataValues.info,
              ingredient1: ingredientInfo.dataValues.name,
              ingredient2: ingredientInfo2.dataValues.name,
            });
          } else {
            res.status(200).send({
              storeName: storeInfo.dataValues.storeName,
              productionName: menuInfo.dataValues.productionName,
              price: menuInfo.dataValues.price,
              info: menuInfo.dataValues.info,
              ingredient1: ingredientInfo.dataValues.name,
              ingredient2: null,
            });
          }
        }
      }
    } else {
      res.status(400).send('Bad Request');
    }
  },

  post: async (req, res) => {
    const {
      productionId,
      productionName,
      productionImg,
      price,
      ingredient1,
      ingredient2,
      info,
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
      res.status(400).send('Bad Request');
    }
  },
};
