const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('price_comparator', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
  
});

module.exports = sequelize;
