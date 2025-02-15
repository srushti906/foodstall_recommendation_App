// backend/controllers/foodController.js
const Food = require('../models/Food');
const Foodstall1 = require('../models/Foodstall');
const review = require('../models/Review');
const mongoose = require('mongoose');
const recom = require('../models/recommendation');

// Get all food items
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({}).populate('foodstall').exec(); 
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recommended food items
const getRecommendedFoods = async (req, res) => {
  try {
    const foods = await Food.find({ recommended: true });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new food item
const addFood = async (req, res) => {
  try {
const{name,cuisine,rating, ingredients, price,recommended,foodstall,imageUrl, description} = req.body;
// const foodstall1 = await Foodstall1.findById(foodstall);

// //const foodstall1 = await Foodstall.findById(foodStall);
//         if (!foodstall1) return res.status(404).json({ message: 'Foodstall not found' });




    const food = new Food({ name,cuisine,rating, ingredients, price,recommended,foodstall:foodstall,imageUrl, description});
   const createdFood = await food.save();

  //  const createdFood = new Food(req.body); // This will automatically validate the data
  //  await createdFood.save();
    res.status(201).json(createdFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deletefoodById = async (req, res) => {
 
  try {
   
    // await Food.deleteOne({_id:req.params.id});
    const foodId = req.params.id;

    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ message: 'Food item not found' });

    await review.deleteMany({ food_item_id: foodId });
    await recom.deleteMany({ food_item_id: foodId });


    await food.deleteOne();

    res.status(200).json({ message: 'Food item and related reviews deleted successfully' });

    getFoods(req,res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getfoodById = async (req, res) => {
  const foodId = req.params.id;

  let food1;
  try {
     food1 = await Food.findById(foodId).populate('foodstall').exec();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  try {
    
   // const createdFood = await food1.save();
    //res.status(201).json(createdFood);
    res.status(201).json(food1);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatefoodById = async (req, res) => {
  const foodId = req.params.id;

 var food1=await Food.findById(foodId);
  
  try {
    const {name,cuisine,rating, ingredients, price,recommended, foodstall ,imageUrl, description} = req.body;

    //  food1 = new food({foodId,name,location,cuisine,rating,is_open,contact_number });
    //name,cuisine,rating, ingredients, price,recommended
    food1.name = name;
     food1.ingredients =ingredients;
     food1.cuisine =cuisine;
     food1.rating =rating;
     food1.price = price;
     food1.recommended =recommended;
    food1. foodstall= foodstall;
    food1.imageUrl = imageUrl;
    food1.description = description;
     await Food.updateOne({_id:req.params.id},food1);
    getFoods(req,res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getFoods,
  getRecommendedFoods,
  addFood,
  deletefoodById,
  updatefoodById,
  getfoodById,
 
};
