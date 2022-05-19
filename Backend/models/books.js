'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Books.belongsTo(models.category, {
        foreignKey: 'category_id',
        onDelete: 'CASCADE',
      });
    }
  }
  Books.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      subject: DataTypes.STRING,
      price: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      availability: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Books',
    }
  );
  return Books;
};
