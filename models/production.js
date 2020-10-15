'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class production extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.store_production); // 1:N
      this.belongsTo(models.store); //1:1 여기에 fk
    }
  };
  production.init({
    storeId: DataTypes.INTEGER,
    productionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productionImg: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    info: DataTypes.STRING,
    dessertType: DataTypes.INTEGER,
    type: {
      type: DataTypes.INTEGER,
      defaultValue : null,
    },
  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'production',
  });
  return production;
};