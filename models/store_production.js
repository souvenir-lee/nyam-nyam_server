'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store_production extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  store_production.init({
    storeId: DataTypes.INTEGER,
    productionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'store_production',
  });
  return store_production;
};