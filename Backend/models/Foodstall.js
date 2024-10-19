// backend/models/Food.js
const mongoose = require('mongoose');

const foodstallSchema = mongoose.Schema({
 
  name: { type: String, required: true },
  location:{type: String, required: true},
  cuisine: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  is_open: { type: Boolean, required: true },
  contact_number: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: {
    type: String,
    required: false // Optional, set to true if required
  },
  description: { // Add this line to include description
    type: String,
    required: false // Optional, set to true if required
  },
  foodIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food_items' }]
});

const Foodstall = mongoose.model('food_stalls', foodstallSchema);

module.exports = Foodstall;
