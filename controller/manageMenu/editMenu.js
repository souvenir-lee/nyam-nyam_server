module.exports = {
  get: async (req, res) => {
    const { storeId, productionId } = req.body;
    const { user, store, production, production_ingredient, ingredient, store_production, } = require('../../models');
    const jwt = require('jsonwebtoken');
    const access_token = req.headers['x-access-token']
  
    //해당 유저만 접근할 수 있도록 하기
    const decoded = jwt.decode(access_token, { complete: true });
    const account = decoded.payload.account;
    const id = await user.findOne({
      where : { email : account},
      attributes: ['id']
    })
    const checkStore = await store.findOne({where : { id : storeId, userId : id.dataValues.id}})
    console.log(id.dataValues.id, checkStore)
    if(!checkStore) return res.status(404).json('해당 매장은 접근 권한이 없습니다')
    
    //기존 기능 시작
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
      res.status(404).send('Bad Request');
    }
  },

  post: async (req, res) => {
    const {
      storeId,
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
