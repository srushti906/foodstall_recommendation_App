// backend/models/Food.js
const mongoose = require('mongoose');

const revSchema = mongoose.Schema({
  //food_item_id: { type: String, required: true },
  //user_id: { type: String, required: true },
  food_item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Food_items', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },  // Reference to the User model
  rating: { type: Number, required: true, default: 0 },
  review_text: { type: String, required:false },
  date: { type:String, required:true },
  foodstall: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'food_stalls',  // Reference to the FoodStalls model
    required: true 
  },  
});

const rev = mongoose.model('reviews', revSchema);

module.exports = rev;
