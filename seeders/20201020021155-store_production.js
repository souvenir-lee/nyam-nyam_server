'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('store_productions', 
      [{
        storeId:1,
        productionId:1,
      },{
        storeId:1,
        productionId:2,
      },{
        storeId:1,
        productionId:3,
      },{
        storeId:1,
        productionId:4,
      },{ /******** 한슬 1 ******/
        storeId:2,
        productionId:5,
      },{
        storeId:2,
        productionId:6,
      },{
        storeId:2,
        productionId:7,
      },{
        storeId:2,
        productionId:8,
      },{
        storeId:2,
        productionId:9,
      },{
        storeId:2,
        productionId:10,
      },{
        storeId:2,
        productionId:11,
      },{ /******** 수진 1 ******/
        storeId:3,
        productionId:1,
      },{
        storeId:3,
        productionId:2,
      },{
        storeId:3,
        productionId:12,
      },{
        storeId:3,
        productionId:13,
      },{
        storeId:3,
        productionId:14,
      },{/******** 수진 2 ******/
        storeId:4,
        productionId:1,
      },{
        storeId:4,
        productionId:2,
      },{
        storeId:4,
        productionId:3,
      },{
        storeId:4,
        productionId:12,
      },{
        storeId:4,
        productionId:15,
      },{ /******** 혁원 1 ******/
        storeId:5,
        productionId:1,
      },{
        storeId:5,
        productionId:16,
      },{
        storeId:5,
        productionId:17,
      },{ /******** 혁원 2 ******/
        storeId:6,
        productionId:2,
      },{
        storeId:6,
        productionId:3,
      },{
        storeId:6,
        productionId:16,
      },{ /******** 혁원 3 ******/
        storeId:7,
        productionId:1,
      },{
        storeId:7,
        productionId:2,
      },{
        storeId:7,
        productionId:3,
      },{
        storeId:7,
        productionId:18,
      },{
        storeId:7,
        productionId:19,
      },{ /******** 원동 1 ******/
        storeId:8,
        productionId:20,
      },{
        storeId:8,
        productionId:21,
      },{ /******** 원동 2 ******/
        storeId:9,
        productionId:22,
      },{
        storeId:9,
        productionId:23,
      },{
        storeId:9,
        productionId:24,
      },{ /******** 원동 3 ******/
        storeId:10,
        productionId:21,
      },{
        storeId:10,
        productionId:25,
      },{
        storeId:10,
        productionId:26,
      },{ /******** 원동 4 ******/
        storeId:11,
        productionId:21,
      },{
        storeId:11,
        productionId:25,
      },{
        storeId:11,
        productionId:27,
      },{
      storeId:11,
      productionId:28,
      }], 
    {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'store_productions',
      {
        storeId: {
          [Op.in]: [1,2,3,4,5,6,7,8,9,10,11],
        },
      },
      {}
    );
  }
};
