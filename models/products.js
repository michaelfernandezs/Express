const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  image_url: {
    type: DataTypes.STRING,
  },
  product_url: {
    type: DataTypes.STRING,
  },
});

module.exports = Product;
