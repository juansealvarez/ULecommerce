'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Videogame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Videogame.belongsTo(models.Category, {
        foreignKey : 'idCategory'
      });
    }
  };
  Videogame.init({
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    idCategory: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Videogame',
    freezeTableName: true
  });
  return Videogame;
};