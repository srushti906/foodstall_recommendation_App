// backend/routes/foodRoutes.js
const express = require('express');
const { getFoods, getRecommendedFoods, addFood ,deletefoodById,updatefoodById,getfoodById} = require('../controllers/foodController');
const router = express.Router();

router.route('/').get(getFoods).post(addFood);
router.route('/recommended').get(getRecommendedFoods);
router.route('/:id').get(getfoodById).put(updatefoodById).delete(deletefoodById);
module.exports = router;
