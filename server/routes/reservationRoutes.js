const express = require('express');
const router = express.Router();
const {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservationStatus,
  deleteReservation
} = require('../controllers/reservationController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Optional auth helper for guest / logged in reservation
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_premium_cafe_jwt_key_2026');
      req.user = await User.findById(decoded.id).select('-password');
    } catch (e) {
      // Ignore token validation error for guest reservation
    }
  }
  next();
};

router.post('/', optionalAuth, createReservation);
router.get('/my', verifyToken, getMyReservations);
router.get('/', verifyToken, isAdmin, getAllReservations);
router.put('/:id/status', verifyToken, isAdmin, updateReservationStatus);
router.delete('/:id', verifyToken, isAdmin, deleteReservation);

module.exports = router;
