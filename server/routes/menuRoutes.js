const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);
router.post('/', verifyToken, isAdmin, upload.single('imageFile'), createMenuItem);
router.put('/:id', verifyToken, isAdmin, upload.single('imageFile'), updateMenuItem);
router.delete('/:id', verifyToken, isAdmin, deleteMenuItem);

module.exports = router;
