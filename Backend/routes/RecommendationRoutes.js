// backend/routes/foodRoutes.js
const express = require('express');
const { getrec, addrec,getrecById,updaterecById,deleterecById } = require('../controllers/recommendationController');
const router = express.Router();

router.route('/').get(getrec).post(addrec);
router.route('/:id').get(getrecById).put(updaterecById).delete(deleterecById);


module.exports = router;
