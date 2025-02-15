// backend/models/Food.js
const mongoose = require('mongoose');

const recSchema = mongoose.Schema({
  // user_id: { type: String, required: true },
  // food_item_id:{type: String, required: true},
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },  // Reference to the user
  food_item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Food_items', required: true },  // Reference to the recommended food
  score: { type: Number, required: true, default: 0 },
  reason:{type: String, required:false},
  
});

const rec = mongoose.model('recommendations', recSchema);

module.exports = rec;
