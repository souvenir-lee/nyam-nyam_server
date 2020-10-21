'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('production_quantities', 
      [{
        store_productionId : 1,
        quantity : 10,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 2,
        quantity : 7,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 3,
        quantity : 16,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 4,
        quantity : 17,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 5,
        quantity : 20,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 6,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 7,
        quantity : 8,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 8,
        quantity : 10,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 9,
        quantity : 7,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 10,
        quantity : 16,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 11,
        quantity : 17,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 12,
        quantity : 20,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 13,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 14,
        quantity : 8,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 15,
        quantity : 10,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 16,
        quantity : 7,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 17,
        quantity : 16,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 18,
        quantity : 17,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 19,
        quantity : 20,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 20,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 21,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 22,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 23,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 24,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 25,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 26,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 27,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 28,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 29,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 30,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 31,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 32,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 33,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 34,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 35,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 36,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 37,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 38,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 39,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 40,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      },{
        store_productionId : 41,
        quantity : 13,
        weatherId : 8,
        date : '2020-10-20 15:00:00',
      }], 
    {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'production_quantities',
      {
        weatherId: {
          [Op.in]: [8],
        },
      },
      {}
    );
  }
};
