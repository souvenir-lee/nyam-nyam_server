const {
  production,
  store_production,
  production_ingredient,
} = require('../../models');
module.exports = {
  post: async (req, res) => {
    const {
      storeId,
      productionName,
      productionImg,
      ingredient1,
      ingredient2,
      price,
      info,
      dessertType,
    } = req.body;

    const addPro = await production.create({
      productionName: productionName,
      productionImg: productionImg,
      price: price,
      info: info,
      dessertType: dessertType,
      type: 1,
    }); //메뉴를 추가하고
    const joinS_P = await store_production.create({
      storeId: storeId,
      productionId: addPro.dataValues.id,
    }); //메뉴와 스토어를 연결.

    const joinP_I = await production_ingredient.create({
      productionId: addPro.dataValues.id,
      ingredientId: ingredient1,
    }); //메뉴와 주재료 연결

    if (ingredient2) {
      await production_ingredient.create({
        productionId: addPro.dataValues.id,
        ingredientId: ingredient2,
      });
    }
    console.log('productionId', addPro.dataValues.id);

    if (addPro || joinS_P || joinP_I) {
      res.status(201).send('추가되었습니다');
    } else {
      res.status(404).send('BadRequest');
    }
  },
};
