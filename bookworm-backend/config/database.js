const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './bookworm.sqlite'  // или './data/bookworm.sqlite'
});
module.exports = sequelize;
