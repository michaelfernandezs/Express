const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('price_comparator', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
