// src/App.js
import '@fortawesome/fontawesome-free/css/all.min.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import CategoriesPage from './components/CategoriesPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import FilterStallsPage from './components/FilterStallsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import StallDetailsPage from './components/StallDetailsPage'; 
import StallsPage from './components/StallsPage';
import CategoryDetailsPage from './components/CategoryDetailsPage';
import ReviewPage from './components/ReviewPage';
import FoodDetailPage from './components/FoodDetailPage';

const isLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true'; // Assuming 'true' is set when logged in
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/login" />;
};


const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/signup" element={<SignupPage />} />
    //     <Route path="/categories" element={<CategoriesPage />} />
    //     <Route path="/filter" element={<FilterStallsPage />} />
    //     <Route path="/category/:id" element={<CategoryDetailsPage />} /> {/* Dynamic Route */}
    //     <Route path="/stalls" element={<StallsPage />} />
    //     <Route path="/stall/:id" element={<StallDetailsPage />} />
    //     <Route path="/stall/:id" element={<ReviewPage />} />
    //     <Route path="/reviews" element={<ReviewPage />} /> {/* Add this */}
    //     <Route path="/about" element={<AboutPage />} />
    //     <Route path="/contact" element={<ContactPage />} />
    //     <Route path="/foods/:id" element={<FoodDetailPage/>} />

    //   </Routes>
    // </Router>

    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/categories" element={<ProtectedRoute element={<CategoriesPage />} />} />
        <Route path="/filter" element={<ProtectedRoute element={<FilterStallsPage />} />} />
        <Route path="/category/:id" element={<ProtectedRoute element={<CategoryDetailsPage />} />} />
        <Route path="/stalls" element={<ProtectedRoute element={<StallsPage />} />} />
        <Route path="/stall/:id" element={<ProtectedRoute element={<StallDetailsPage />} />} />
        <Route path="/reviews" element={<ProtectedRoute element={<ReviewPage />} />} />
        <Route path="/foods/:id" element={<ProtectedRoute element={<FoodDetailPage />} />} />
        <Route path="/contact" element={<ProtectedRoute element={<ContactPage />} />} />
        <Route path="/about" element={<ProtectedRoute element={<AboutPage />}/>} />

      </Routes>
    </Router>
  );
 
  
};

export default App;
