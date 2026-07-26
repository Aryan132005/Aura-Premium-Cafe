const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} = require('../controllers/enquiryController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/', createEnquiry);
router.get('/', verifyToken, isAdmin, getEnquiries);
router.put('/:id', verifyToken, isAdmin, updateEnquiryStatus);
router.delete('/:id', verifyToken, isAdmin, deleteEnquiry);

module.exports = router;
