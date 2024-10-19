// backend/routes/foodRoutes.js
const express = require('express');
const { getreview, addreview ,getreviewById,updatereviewById,deletereviewById} = require('../controllers/ReviewController');
const router = express.Router();

router.route('/').get(getreview).post(addreview);
router.route('/:id').get(getreviewById).put(updatereviewById).delete(deletereviewById);


module.exports = router;
