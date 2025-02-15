import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a separate CSS file for styling

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    navigate('/login'); // Redirect to login
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">FoodieApp</Link>
      </div>
      <div className="navbar-links">
        {/* Other navigation links */}
        <Link to="/filter-stalls" className="navbar-filter-icon">
          <i className="fas fa-filter"></i> {/* Font Awesome filter icon */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
