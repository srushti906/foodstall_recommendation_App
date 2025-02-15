const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    preferences: {
      type: [String],  
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



const User = mongoose.model('Users', userSchema);

module.exports = User;
