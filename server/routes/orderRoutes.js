const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Optional auth helper for guest or logged in user order placement
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_premium_cafe_jwt_key_2026');
      req.user = await User.findByPk(decoded.id);
    } catch (e) {
      // Ignore invalid token for guest ordering
    }
  }
  next();
};

router.post('/', optionalAuth, createOrder);
router.get('/my', verifyToken, getMyOrders);
router.get('/detail/:id', getOrderById);
router.get('/', verifyToken, isAdmin, getAllOrders);
router.put('/:id/status', verifyToken, isAdmin, updateOrderStatus);
router.delete('/:id', verifyToken, isAdmin, deleteOrder);

module.exports = router;
