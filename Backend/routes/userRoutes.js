const express = require('express');
 const { registerUser, authUser, getUserProfile, getrecom, getrew,deleteUserById ,getUserbyname } = require('../controllers/userController');
 
//const { registerUser,  getUserProfile } = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);

//router.get('/profile', protect, getUserProfile);
router.get('/',getUserProfile);
router.get('/:name',getUserbyname);
router.get('/:id/reviews',getrew) ;
router.get('/:id/recommendations',getrecom);
router.delete('/:id',deleteUserById );
module.exports = router;
