const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define(
  'Product',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'sin titulo',
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'sin precio',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'sin descripcion', // false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'sin imagen',
    },
    product_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Product;
