const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './bookworm.sqlite', // база создастся рядом с backend
});

module.exports = sequelize;
