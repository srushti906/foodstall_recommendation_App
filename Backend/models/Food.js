// backend/models/Food.js
const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  name: {
     type: String, required: true 
    },
  cuisine: {
     type: String, required: true
     },
  rating: { 
    type: Number, required: true, default: 0 
  },
  ingredients: {
    type: [String],  
    required: true,
  },
  price: {
     type: Number, required: true 
    },
  recommended: { 
    type: Boolean, default: false
   },
   foodstall: [{ type:mongoose.Schema.Types.ObjectId, ref: 'food_stalls',required: true} ],
   
  imageUrl: {
    type: String,
    required: false // Optional, set to true if required
  },
  description: { // New description field
    type: String,
    required: false // Optional, set to true if required
  }

});

const Food = mongoose.model('Food_items', foodSchema);

module.exports = Food;


 