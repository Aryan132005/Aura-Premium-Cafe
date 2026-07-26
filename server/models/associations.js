const Order = require('./Order');
const OrderItem = require('./OrderItem');

const setupAssociations = () => {
  try {
    Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items', onDelete: 'CASCADE' });
    OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
  } catch (err) {
    console.warn('Associations setup notice:', err.message);
  }
};

module.exports = setupAssociations;
