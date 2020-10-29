const {
  production,
  store_production,
  weather,
  production_quantity,
} = require('../../models');
module.exports = {
  get: async (req, res) => {
    const { storeId } = req.body;
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
      res.status(400).send('Bad Request');
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
    for (let i = 0; i < findId.length; i++) {
      await production_quantity.create({
        store_productionId: findId[i].dataValues.id,
        date: date,
        quantity: sales[i].quantity,
        weatherId: findWeather[0].dataValues.id,
      });
    }
    const result = await production_quantity.findAll({
      where: {
        date: date,
      },
    });
    // res.status(201).send('ok');
    // console.log(
    //   findId[0].dataValues.id,
    //   findId[1].dataValues.id,
    //   findId[2].dataValues.id,
    //   findId[3].dataValues.id,
    //   findId[4].dataValues.id
    // );
    if (findId || findWeather || date || quantity) {
      res.status(201).send(result);
    } else {
      res.status(404).send('Bad Request');
    }
  },
};
