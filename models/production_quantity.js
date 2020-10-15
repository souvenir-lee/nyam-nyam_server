'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class production_quantity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.store_production) //1:1 여기에 fk
      this.belongsTo(models.weather) //1:1 여기에 fk
    }
  };
  production_quantity.init({
    store_productionId: DataTypes.INTEGER,
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weatherId: DataTypes.INTEGER,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'production_quantity',
  });
  return production_quantity;
};