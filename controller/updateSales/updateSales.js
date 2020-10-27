const {
  production,
  store_production,
  weather,
  production_quantities,
} = require('../../models');

module.exports = {
  get: async (req, res) => {
    const storeId = req.params.storeId;
    const findProduction = await store_production.findAll({
      include: {
        model: production,
        attributes: ['productionName', 'productionImg'],
      },
      where: { storeId: storeId },
    });
    if (findProduction) {
      res.status(200).send(findProduction);
    } else {
      res.status(404).send('Bad Request');
    }
  },

  post: async (req, res) => {
    const { storeId, date, weatherName, sales } = req.body;
    const findId = await store_production.findAll({
      attributes: ['id'],
      where: { storeId: storeId },
    });
    const findWeather = await weather.findAll({
      attributes: ['id', 'name'],
      where: { name: weatherName },
    });
    // const updateSales = await production_quantities.map((el) => {
    //   store_quantity.create({
    //     store_productionId: findId.dataValues.id,
    //     date: date,
    //     quantity: sales.quantity,
    //     weatherId: findWeather.dataValues.id,
    //   });
    // });
    res.status(201).send(findId);
    console.log('fdsa', findId);
    console.log('asdf', findWeather);
    // console.log('슈량', sales);
  },
};
