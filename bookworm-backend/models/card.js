const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CardModel = sequelize.define('Card', {
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('share', 'want'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'published', 'rejected'),
    allowNull: false,
    defaultValue: 'pending',
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = CardModel;
