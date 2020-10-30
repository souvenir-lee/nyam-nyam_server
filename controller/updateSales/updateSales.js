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
    //console.log(req.body.data)
    const { storeId } = req.body
    const {
      production,
      store_production,
      weather,
      production_quantity,
    } = require('../../models');

    let weatherArr =[]
    req.body.data.map(el => {
      weatherArr.push(el.weatherName)
      return weatherArr
    })
    console.log(weatherArr)
    const findWeather = await weather.findAll({
      where: { name: weatherArr },
    });
    console.log('밖',findWeather)

    let test = req.body.data.map(async (el) => {
      const { date, production } = el
      
      console.log('findWeather', el.weatherName, findWeather )
      for (let i = 0; i < production.length; i++) {
        await production_quantity.create({
          productionId: production[i][0],
          storeId : storeId,
          date: date,
          quantity: production[i][1],
          weatherId: findWeather.dataValues.id,
        }).catch(err => console.log('err',err))
      }
      // const result = await production_quantity.findAll({
      //   where: {
      //     date: date,
      //   },
      // });
      if (findId || findWeather || date || quantity) {
        return true
      } else {
        return false
      }
    })

    if(test){
      return res.status(201).send('내역이 반영되었습니다');
    } else {
      return res.status(404).send('Bad Request');
    }
    
  },
};
