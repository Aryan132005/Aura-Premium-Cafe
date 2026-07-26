const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getEvents);
router.post('/', verifyToken, isAdmin, upload.single('imageFile'), createEvent);
router.put('/:id', verifyToken, isAdmin, upload.single('imageFile'), updateEvent);
router.delete('/:id', verifyToken, isAdmin, deleteEvent);

module.exports = router;
