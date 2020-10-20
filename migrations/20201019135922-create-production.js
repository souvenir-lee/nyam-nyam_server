'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      storeId: {
        type: Sequelize.INTEGER,
        constraints: false,
        onDelete: 'cascade',
        references: {
          model: {
            tableName: 'stores',
          },
          key: 'id',
        },
      },
      productionName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productionImg: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      info: {
        type: Sequelize.STRING,
      },
      dessertType: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('productions');
  },
};
