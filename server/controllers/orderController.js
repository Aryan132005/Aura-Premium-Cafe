const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const MenuItem = require('../models/MenuItem');
const setupAssociations = require('../models/associations');
const { Op } = require('sequelize');

setupAssociations();

// @desc    Create a new order (Dine-in, Takeaway, Delivery)
// @route   POST /api/orders
// @access  Public (Optionally Authenticated)
const createOrder = async (req, res, next) => {
  try {
    const {
      customerName,
      customerPhone,
      orderType = 'Dine-In',
      tableNumber,
      deliveryAddress,
      items,
      paymentMethod = 'Cash / Pay at Counter',
      specialInstructions
    } = req.body;

    if (!customerName || !customerPhone || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide customer name, phone number, and at least one item in order.'
      });
    }

    if (orderType === 'Dine-In' && !tableNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please specify your table number for Dine-In orders.'
      });
    }

    if (orderType === 'Delivery' && !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: 'Please specify delivery address for online delivery orders.'
      });
    }

    // Calculate total amount & prepare order items
    let totalAmount = 0;
    const preparedItems = [];

    for (const item of items) {
      const price = Number(item.price || item.itemPrice || 0);
      const qty = Number(item.quantity || 1);
      const subtotal = price * qty;
      totalAmount += subtotal;

      preparedItems.push({
        menuItemId: item.id || item.menuItemId || null,
        itemName: item.name || item.itemName,
        itemPrice: price,
        quantity: qty,
        subtotal: subtotal
      });
    }

    // Unique Order Number e.g., ORD-849302
    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = await Order.create({
      orderNumber,
      userId: req.user ? req.user.id : null,
      customerName,
      customerPhone,
      orderType,
      tableNumber: orderType === 'Dine-In' ? String(tableNumber) : '',
      deliveryAddress: orderType === 'Delivery' ? deliveryAddress : '',
      status: 'Pending',
      paymentMethod,
      paymentStatus: 'Pending',
      totalAmount: totalAmount.toFixed(2),
      specialInstructions: specialInstructions || ''
    });

    // Create Order Items
    for (const pItem of preparedItems) {
      await OrderItem.create({
        ...pItem,
        orderId: newOrder.id
      });
    }

    // Fetch complete order with items
    const completeOrder = await Order.findByPk(newOrder.id, {
      include: [{ model: OrderItem, as: 'items' }]
    });

    res.status(201).json({
      success: true,
      data: completeOrder,
      message: `Order #${orderNumber} placed successfully!`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        [Op.or]: [
          { userId: req.user.id },
          { customerPhone: req.user.phone || 'N/A' }
        ]
      },
      include: [{ model: OrderItem, as: 'items' }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order details by ID or order number
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let order;

    if (id.startsWith('ORD-')) {
      order = await Order.findOne({
        where: { orderNumber: id },
        include: [{ model: OrderItem, as: 'items' }]
      });
    } else {
      order = await Order.findByPk(id, {
        include: [{ model: OrderItem, as: 'items' }]
      });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin Dashboard)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res, next) => {
  try {
    const { status, orderType, search } = req.query;
    const where = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (orderType && orderType !== 'all') {
      where.orderType = orderType;
    }

    if (search) {
      where[Op.or] = [
        { orderNumber: { [Op.like]: `%${search}%` } },
        { customerName: { [Op.like]: `%${search}%` } },
        { customerPhone: { [Op.like]: `%${search}%` } },
        { tableNumber: { [Op.like]: `%${search}%` } }
      ];
    }

    const orders = await Order.findAll({
      where,
      include: [{ model: OrderItem, as: 'items' }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status or payment status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, as: 'items' }]
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (status) {
      const validStatuses = ['Pending', 'Preparing', 'Served', 'Completed', 'Cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid order status value' });
      }
      order.status = status;
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.json({
      success: true,
      data: order,
      message: `Order #${order.orderNumber} updated to ${order.status}`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an order (Admin)
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    await order.destroy();
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
};
