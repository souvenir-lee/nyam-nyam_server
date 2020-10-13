'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class production extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  production.init(
    {
      storeId: DataTypes.INTEGER,
      productionName: DataTypes.STRING,
      price: DataTypes.INTEGER,
      info: DataTypes.STRING,
      type: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'production',
    }
  );
  return production;
};
