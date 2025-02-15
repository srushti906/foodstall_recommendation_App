// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const foodRoutes = require('./routes/foodRoutes');
const userRoutes = require('./routes/userRoutes');
const foodstallRoutes = require('./routes/FoodstallRoutes');
const recommendationRoutes = require('./routes/RecommendationRoutes');
const reviewRoutes = require('./routes/ReviewsRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');

require('dotenv').config();

connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/foods', foodRoutes);
app.use('/api/users', userRoutes);
app.use('/api/foodstall', foodstallRoutes);
app.use('/api/recommendation', recommendationRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/categories',CategoryRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
