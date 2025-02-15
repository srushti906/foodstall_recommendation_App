// src/components/AboutPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './AboutPage.css'; // Import the CSS file

const AboutPage = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    navigate('/login'); // Redirect to login
  };
  return (
    <div className="about-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/">Foodie</a>
        </div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/categories">Categories</a>
          <a href="/stalls">Stall</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <Link to="/reviews" className="reviews-icon">
            <i className="fa fa-star" aria-hidden="true"></i> Reviews
          </Link>
          <Link to="/filter" className="filter-icon"> {/* Filter Icon Link */}
            <i className="fa fa-filter" aria-hidden="true"></i> Filter
          </Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>

        </div>
      </nav>

      {/* About Section */}
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to Foodie! We are passionate about food and dedicated to bringing you the best dining experience. Our mission is to connect food lovers with amazing dishes from around the world. 
          Whether you are looking for a quick snack or a full-course meal, we have something for everyone.
        </p>
        <p>
          Our team of culinary experts curates an extensive menu, ensuring quality and freshness in every bite. 
          Join us on this delicious journey and discover your new favorite dish today!
        </p>
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Foodie. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
