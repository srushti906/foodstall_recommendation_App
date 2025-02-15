const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure each category is unique (e.g., "Pizza", "Burgers")
  },
  foodItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food_items', // Reference the Food model
    },
  ],
  imageUrl: {
    type: String, 
    required: true // Image URL is required now
  }
});

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;
