'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user); //1:1
      this.hasMany(models.store_production); //1:N
      this.hasMany(models.production); //1:N
    }
  };
  store.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storeAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
    timestamps:true,
    modelName: 'store',
  });
  return store;
};