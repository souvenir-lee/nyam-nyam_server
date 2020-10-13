'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'productions', // name of Target table
        'dessertType', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
        }
      )
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
