const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const review = require('../models/Review');
const recom = require('../models/recommendation');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
  const { username, email, password,preferences  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      
      const user1 = new User({username, email, password:hashedPassword,preferences });
      const createduser = await user1.save();
      res.status(201).json(createduser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    
  };
});

// // @desc    Authenticate user & get token
// // @route   POST /api/users/login
// // @access  Public
 const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    
    // console.log(password);
    // console.log(user.password);
     
    const isMatch = await bcrypt.compare(password, user.password);
    const isMatch1=(password===user.password)?true:false;
    console.log(isMatch);
    if (!isMatch&&!isMatch1) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    
   // const token = generateToken(user._id);
        
    //res.json({ user, token });
    //res.json({ message: 'Login successful'});
    res.json(user);
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {

  
    try {
      const user = await User.find({});
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
 
  

});


 const getrew= async (req, res) => {
  try {
    const userId = req.params.id;
    
      const reviews = await review.find({ user_id:userId });
      console.log(reviews);
      res.json(reviews);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// 2. GET /users/:id/recommendations - Get all recommendations for a specific user
const getrecom=async (req, res) => {
  try {
    const userId = req.params.id;
      const recommendations = await recom.find({ user_id: userId }).populate('food_item_id');
      res.json(recommendations);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await review.deleteMany({ user_id: userId });

    await recom.deleteMany({ user_id: userId });

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User and associated data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserbyname = async (req, res) => {
  const uname = req.params.name;

  let user1;
  try {
    user1 = await User.find({ username:uname});
    if (!user1) return res.status(404).json({ message: 'user not found' });
    else return res.status(200).json(user1);


  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
module.exports = { registerUser, authUser, getUserProfile,getrecom,getrew,deleteUserById , getUserbyname, };
//module.exports = { registerUser, getUserProfile };
