'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stores', 
    [{
      userId : '1',
      storeName : 'sonb',
      storeAddress : '서울시 종로구 자하문로9길 14',
      latitude : '78',
      longitude : '90',
    }], 
    {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
