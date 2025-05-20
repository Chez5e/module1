const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './bookworm.sqlite'
});

module.exports = sequelize;
