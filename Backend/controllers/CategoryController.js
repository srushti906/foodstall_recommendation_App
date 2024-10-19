// const Category = require('../models/category');
// const Food = require('../models/Food');

// // Create a new category
// const createCategory = async (req, res) => {
//   const { name, foods } = req.body;

//   try {
//     const category = new Category({
//       name,
//       foods,
//     });
//     await category.save();
//     res.status(201).json(category);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all categories with populated food items


// // Get a specific category by ID
// const getCategoryById = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id).populate('foods');
//     if (!category) return res.status(404).json({ message: 'Category not found' });
//     res.status(200).json(category);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Add a food item to a category
// const addFoodToCategory = async (req, res) => {
//   const { foodId } = req.body;
//   const { id } = req.params;

//   try {
//     const category = await Category.findById(id);
//     if (!category) return res.status(404).json({ message: 'Category not found' });

//     // Check if food item exists
//     const foodItem = await Food.findById(foodId);
//     if (!foodItem) return res.status(404).json({ message: 'Food item not found' });

//     // Add food to the category
//     category.foods.push(foodId);
//     await category.save();

//     res.status(200).json(category);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createCategory,
//   getCategories,
//   getCategoryById,
//   addFoodToCategory,
// };
const Category = require('../models/category');


const getCategoryById = async (req, res) => {
    const catId = req.params.id;
  
    let cat1;
    try {
       //cat1 = await Category.findById(catId).populate('foods').exec();
      cat1= await Category.findById(catId).populate({
        path: 'foodItems', // This refers to the `foods` array of ObjectIds
        model: 'Food_items', // Specify the model to populate from (Food)
    });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    try {
      
     // const createdcat = await cat1.save();
      res.status(201).json(cat1);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('foodItems');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getCategoryById,
  getCategories
};
