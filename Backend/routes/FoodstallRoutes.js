// backend/routes/foodRoutes.js
const express = require('express');
const { getFoodstall, addFoodstall,getfoodstallById,updatefoodstallById,deletefoodstallById,getfoodsoffs,reviewoffs} = require('../controllers/foodstallController');
const router = express.Router();

router.route('/').get(getFoodstall).post(addFoodstall);
router.route('/:id').get(getfoodstallById).put(updatefoodstallById).delete(deletefoodstallById);
router.route('/:id/foods').get(getfoodsoffs);
router.route('/:id/reviews').get(reviewoffs);
module.exports = router;
