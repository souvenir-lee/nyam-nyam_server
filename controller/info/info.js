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
    }); //store
    // const findProduction = await production.findAndCountAll({
    //   where:{
    //     storeId : findStore.rows.
    //   }
    // })
    //storeId를 map으로돌려 해당 productiondl 몇개인지 계산한다
    const findUploads = await production_quantity.findAndCountAll({});
    //store_production에서 storeId를 통해 Id를 알아낸다
    res.status(200).send(findStore);
    console.log('이거 없어?', findStore.rows[0].dataValues.id);
  },
};
