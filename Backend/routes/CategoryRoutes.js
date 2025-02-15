const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

// Route to create a category
//router.post('/categories', categoryController.createCategory);

// Route to get all categories
router.get('/', categoryController.getCategories);

// Route to get a specific category by ID
router.get('/:id', categoryController.getCategoryById);

// Route to add a food item to a specific category
//router.post('/categories/:id/add-food', categoryController.addFoodToCategory);

module.exports = router;
