const Reservation = require('../models/Reservation');
const MenuItem = require('../models/MenuItem');
const Event = require('../models/Event');
const Enquiry = require('../models/Enquiry');
const User = require('../models/User');
const { sequelize } = require('../config/db');

// @desc    Get Admin Dashboard Overview Stats
// @route   GET /api/admin/dashboard-stats
// @access  Private/Admin
const getDashboardStats = async (req, res, next) => {
  try {
    const totalReservations = await Reservation.count();
    const pendingReservations = await Reservation.count({ where: { status: 'pending' } });
    const confirmedReservations = await Reservation.count({ where: { status: 'confirmed' } });
    const unreadEnquiries = await Enquiry.count({ where: { status: 'unread' } });
    const totalMenuItems = await MenuItem.count();
    const activeEvents = await Event.count({ where: { isActive: true } });
    const totalCustomers = await User.count({ where: { role: 'customer' } });

    // Category distribution for menu
    const menuByCategory = await MenuItem.findAll({
      attributes: ['category', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['category'],
      raw: true
    });

    // Reservations count grouped by status
    const reservationsByStatus = await Reservation.findAll({
      attributes: ['status', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['status'],
      raw: true
    });

    // Recent 5 reservations
    const recentReservations = await Reservation.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    res.json({
      success: true,
      stats: {
        totalReservations,
        pendingReservations,
        confirmedReservations,
        unreadEnquiries,
        totalMenuItems,
        activeEvents,
        totalCustomers,
        estimatedRevenue: confirmedReservations * 85
      },
      charts: {
        menuByCategory: menuByCategory.map(item => ({ category: item.category, count: Number(item.count) })),
        reservationsByStatus: reservationsByStatus.map(item => ({ status: item.status, count: Number(item.count) }))
      },
      recentReservations
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};
