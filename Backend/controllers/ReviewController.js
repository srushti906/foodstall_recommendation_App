// backend/controllers/FoodstallController.js
const review = require('../models/Review');
const Food = require('../models/Food');
const User = require('../models/User');
const foodstall2 = require('../models/Foodstall');


// Get all Foodstall items
const getreview = async (req, res) => {
  try {
    const revi = await review.find({});
    res.json(revi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Add a new Foodstall item
const addreview = async (req, res) => {
  try {
    const {food_item_id,user_id,rating,review_text,date,foodstall} = req.body;

    const food = await Food.findById(food_item_id);
    const foodstall1 = await foodstall2.findById(foodstall);
    const user = await User.findById(user_id);

    if (!food || !foodstall1 || !user) {
      return res.status(404).json({ message: 'Food, Foodstall, or User not found' });
    }
    const rev1 = new review({ food_item_id: food._id,user_id:user.id,foodstall:foodstall1.id,rating,review_text,date});
    const createdreview = await rev1.save();
    res.status(201).json(createdreview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getreviewById = async (req, res) => {
  const reviewId = req.params.id;

  let review1;
  try {
    review1 = await review.find({food_item_id:reviewId}) .populate('user_id', 'username').populate('foodstall', 'name');
    if (!review1) return res.status(404).json({ message: 'Review not found' });
    else return res.status(200).json(review1);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//.populate('user_id food_item_id ')

const updatereviewById = async (req, res) => {
  const reviewId = req.params.id;

 var review1=await review.findById(reviewId);
  
  try {
    const {food_item_id,user_id,rating,review_text,date,foodstall} = req.body;

    //  review = new reviewom({reviewomId,name,location,cuisine,rating,is_open,contact_number });
    review1.food_item_id = food_item_id;
    review1.foodstall= foodstall;
     review1.user_id =user_id;
     review1.rating =rating;
     review1.review_text = review_text;
     review1.date =date;
     await review.updateOne({_id:req.params.id},review1);
    getreview(req,res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletereviewById = async (req, res) => {
 
  try {
   
     await review.deleteOne({_id:req.params.id});

     
    getreview(req,res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }


};




module.exports = {
  getreview,
  addreview,
  deletereviewById,
  updatereviewById,
  getreviewById,
 
};
