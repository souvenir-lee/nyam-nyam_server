'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'users', // name of Target table
        'userImg', // name of the key we're adding
        {
          type: Sequelize.STRING,
        }
      )
      .then(() =>
        queryInterface.addColumn(
          'productions', // name of Target table
          'productionImg', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        )
      );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
