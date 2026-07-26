const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    orderType: {
      type: DataTypes.ENUM('Dine-In', 'Takeaway', 'Delivery'),
      defaultValue: 'Dine-In'
    },
    tableNumber: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    deliveryAddress: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Preparing', 'Served', 'Completed', 'Cancelled'),
      defaultValue: 'Pending'
    },
    paymentMethod: {
      type: DataTypes.ENUM('Cash / Pay at Counter', 'UPI / Card', 'Online'),
      defaultValue: 'Cash / Pay at Counter'
    },
    paymentStatus: {
      type: DataTypes.ENUM('Pending', 'Paid'),
      defaultValue: 'Pending'
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    specialInstructions: {
      type: DataTypes.TEXT,
      defaultValue: ''
    }
  },
  {
    timestamps: true,
    tableName: 'orders'
  }
);

module.exports = Order;
