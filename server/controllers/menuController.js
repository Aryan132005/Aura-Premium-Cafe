const MenuItem = require('../models/MenuItem');
const { Op } = require('sequelize');

// @desc    Get all menu items (with search, category, veg filters)
// @route   GET /api/menu
// @access  Public
const getMenuItems = async (req, res, next) => {
  try {
    const { category, search, isVeg, isAvailable } = req.query;
    let where = {};

    if (category && category !== 'All') {
      where.category = category;
    }

    if (isVeg !== undefined && isVeg !== '') {
      where.isVeg = isVeg === 'true';
    }

    if (isAvailable !== undefined && isAvailable !== '') {
      where.isAvailable = isAvailable === 'true';
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    const menuItems = await MenuItem.findAll({
      where,
      order: [['category', 'ASC'], ['name', 'ASC']]
    });

    res.json({ success: true, count: menuItems.length, data: menuItems });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
const getMenuItemById = async (req, res, next) => {
  try {
    const item = await MenuItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new menu item
// @route   POST /api/menu
// @access  Private/Admin
const createMenuItem = async (req, res, next) => {
  try {
    let { name, description, price, category, image, isVeg, isAvailable, isFeatured, prepTime, rating } = req.body;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (!image) {
      image = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600';
    }

    const item = await MenuItem.create({
      name,
      description,
      price: Number(price),
      category,
      image,
      isVeg: isVeg === true || isVeg === 'true',
      isAvailable: isAvailable !== false && isAvailable !== 'false',
      isFeatured: isFeatured === true || isFeatured === 'true',
      prepTime: prepTime || '15-20 mins',
      rating: rating ? Number(rating) : 4.8
    });

    res.status(201).json({ success: true, data: item, message: 'Menu item created successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
const updateMenuItem = async (req, res, next) => {
  try {
    let item = await MenuItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.isVeg !== undefined) updateData.isVeg = updateData.isVeg === true || updateData.isVeg === 'true';
    if (updateData.isAvailable !== undefined) updateData.isAvailable = updateData.isAvailable === true || updateData.isAvailable === 'true';
    if (updateData.isFeatured !== undefined) updateData.isFeatured = updateData.isFeatured === true || updateData.isFeatured === 'true';

    await item.update(updateData);

    res.json({ success: true, data: item, message: 'Menu item updated successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    await item.destroy();
    res.json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
