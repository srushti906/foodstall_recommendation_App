// backend/controllers/FoodstallController.js
const foodstall = require('../models/Foodstall');
const Food = require('../models/Food');
const review = require('../models/Review');
// Get all Foodstall items
const getFoodstall = async (req, res) => {
  try {
    const Foodstallst = await foodstall.find({});
    if (!Foodstallst) return res.status(404).json({ message: 'Foodstall not found' });


    //res.json({ foods });
    // if(!foods)
    // {
    //   res.send("check");
    // }
    //res.json({ Foodstallst});

    res.json(Foodstallst);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getfoodstallById = async (req, res) => {
  const foodstallId = req.params.id;

  let foodstall1;
  try {
     foodstall1 = await foodstall.findById(foodstallId).populate('foodIds');
     //const foods = await Food.find({  foodStall:foodstallId });

     res.json({foodstall1});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // try {
  //   const foods = await Food.find({  foodStall: req.params.id });
  //   const createdFoodstall = await foodstall1.save();
  //   res.status(201).json(createdFoodstall,foods);
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
};

const updatefoodstallById = async (req, res) => {
  const foodstallId = req.params.id;

 var foodstall1=await foodstall.findById(foodstallId);
  
  try {
    const {name,location,cuisine,rating,is_open,contact_number,price,imageUrl,description,foodIds } = req.body;

    //  foodstall1 = new foodstall({foodstallId,name,location,cuisine,rating,is_open,contact_number });
    foodstall1.name = name;
     foodstall1.location =location;
     foodstall1.cuisine =cuisine;
     foodstall1.rating =rating;
     foodstall1.is_open = is_open;
     foodstall1.contact_number =contact_number;
     foodstall1.price =price;     
     foodstall1.imageUrl=imageUrl;
     foodstall1.description=description;
     foodstall1.foodIds=foodIds;
     await foodstall.updateOne({_id:req.params.id},foodstall1);
    getFoodstall(req,res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Add a new Foodstall item
const addFoodstall = async (req, res) => {
  try {
    const {name,location,cuisine,rating,is_open,contact_number,price,imageUrl,description,foodIds } = req.body;
    const foodstall1 = new foodstall({name,location,cuisine,rating,is_open,contact_number,price,imageUrl,description,foodIds });
    const createdFoodstall = await foodstall1.save();
    res.status(201).json(createdFoodstall);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletefoodstallById = async (req, res) => {
 
  try {
    const foodstallId = req.params.id;

    const foodstall1 = await foodstall.findById(foodstallId);
    if (!foodstall1) return res.status(404).json({ message: 'Foodstall not found' });

    await Food.deleteMany({ foodStall: foodstallId });

    await review.deleteMany({ foodstall: foodstallId });

    //await foodstall.deleteOne();
     await foodstall.deleteOne({_id:req.params.id});
    getFoodstall(req,res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getfoodsoffs= async (req, res) => {
  try {
      const foods = await Food.find({ foodStall: req.params.id });
      if (!foods) return res.status(404).json({ message: 'Food not found' });

      res.json(foods);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

  const reviewoffs= async (req, res) => {
  try {
      const reviews = await review.find({ foodstall: req.params.id }).populate('user_id');
      res.json(reviews);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
}
module.exports = {
  getFoodstall,
  addFoodstall,
  getfoodstallById,
  updatefoodstallById,
  deletefoodstallById,
  getfoodsoffs,
  reviewoffs
};
