const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MenuItem = sequelize.define(
  'MenuItem',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('Beverages', 'Starters', 'Main Course', 'Desserts'),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isVeg: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 4.8
    },
    prepTime: {
      type: DataTypes.STRING,
      defaultValue: '15-20 mins'
    }
  },
  {
    timestamps: true,
    tableName: 'menu_items'
  }
);

module.exports = MenuItem;
