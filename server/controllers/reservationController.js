const Reservation = require('../models/Reservation');
const { Op } = require('sequelize');

// @desc    Create a table reservation
// @route   POST /api/reservations
// @access  Public (Optionally authenticated)
const createReservation = async (req, res, next) => {
  try {
    const { name, email, phone, date, time, guests, specialRequest } = req.body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Check capacity / existing bookings for same slot
    const existingCount = await Reservation.count({
      where: {
        date,
        time,
        status: { [Op.ne]: 'cancelled' }
      }
    });

    if (existingCount >= 10) {
      return res.status(400).json({
        success: false,
        message: 'Sorry, that time slot is fully booked. Please select a different time or date.'
      });
    }

    const reservation = await Reservation.create({
      userId: req.user ? req.user.id : null,
      name,
      email: email.toLowerCase(),
      phone,
      date,
      time,
      guests: Number(guests),
      specialRequest: specialRequest || '',
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      data: reservation,
      message: 'Reservation request submitted successfully! We will confirm your table shortly.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user reservations
// @route   GET /api/reservations/my
// @access  Private
const getMyReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll({
      where: {
        [Op.or]: [
          { userId: req.user.id },
          { email: req.user.email.toLowerCase() }
        ]
      },
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, count: reservations.length, data: reservations });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reservations (Admin)
// @route   GET /api/reservations
// @access  Private/Admin
const getAllReservations = async (req, res, next) => {
  try {
    const { status, date, search } = req.query;
    let where = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (date) {
      where.date = date;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } }
      ];
    }

    const reservations = await Reservation.findAll({
      where,
      order: [['date', 'ASC'], ['time', 'ASC']]
    });

    res.json({ success: true, count: reservations.length, data: reservations });
  } catch (error) {
    next(error);
  }
};

// @desc    Update reservation status
// @route   PUT /api/reservations/:id/status
// @access  Private/Admin
const updateReservationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    reservation.status = status;
    await reservation.save();

    res.json({
      success: true,
      data: reservation,
      message: `Reservation status updated to ${status}`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete reservation
// @route   DELETE /api/reservations/:id
// @access  Private/Admin
const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    await reservation.destroy();
    res.json({ success: true, message: 'Reservation deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservationStatus,
  deleteReservation
};
