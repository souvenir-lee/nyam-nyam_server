module.exports = {
  get: async(req, res) => {
    const { production, store_production, store } = require('../../models')
    if(!req.params.id) return res.status(400).send('Bad Request')
    console.log(req.params)

    const storeId = 
      await store_production.findOne({
        attributes : ['storeId'],
        where : { productionId : req.params.id }
      })
    const id = await 
      store.findOne({
        attributes : ['userId'],
        where : { id : storeId.dataValues.storeId }
      })
    const productionData = 
      await production.findOne({where : { id : req.params.id }})
      .catch(err => res.status(500).send(err))

    const { userId } =id
    return res.status(200).json({
      userId, 
      'productionData' : productionData.dataValues
    })
  },
};
