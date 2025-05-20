const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Подключаем модели
db.User = require('./user');
db.Card = require('./card');

// Настраиваем связи
db.User.hasMany(db.Card, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Card.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
