// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './StallsPage.css'; // Import the CSS file

// const stalls = [
//   { id: 1, name: 'Himalayan Delights', image: '/images/himalayanDelights.jpg', description: 'Authentic Nepalese food with a focus on momos.' },
//   { id: 2, name: 'Momo Magic', image: '/images/momoMagic.jpg', description: 'Specializing in crispy and steamed momos.' },
//   { id: 3, name: 'Cheese Delight', image: '/images/cheeseDelight.jpg', description: 'Famous for its cheese-filled dishes.' },
// ];

// const StallsPage = () => {
//   // State to keep track of favorite stalls
//   const [favorites, setFavorites] = useState([]);

//   // Function to toggle favorite
//   const toggleFavorite = (stallId) => {
//     if (favorites.includes(stallId)) {
//       setFavorites(favorites.filter((id) => id !== stallId));
//     } else {
//       setFavorites([...favorites, stallId]);
//     }
//   };

//   return (
//     <div className="stalls-page">
//       <nav className="navbar">
//         <div className="navbar-brand">
//           <Link to="/">Foodie</Link>
//         </div>
//         <div className="navbar-links">
//           <Link to="/">Home</Link>
//           <Link to="/categories">Categories</Link>
//           <Link to="/stalls">Stall</Link>
//           <Link to="/about">About</Link>
//           <Link to="/contact">Contact</Link>
//           <Link to="/reviews" className="reviews-icon">
//             <i className="fa fa-star" aria-hidden="true"></i> Reviews
//           </Link>
//           <Link to="/filter" className="filter-icon"> {/* Filter Icon Link */}
//             <i className="fa fa-filter" aria-hidden="true"></i> Filter
//           </Link>
//           </div>
//       </nav>

//       <div className="stalls-header">
//         <h1>Our Stalls</h1>
//         <p>Explore the best stalls with delightful foods.</p>
//       </div>

//       <div className="stalls-grid">
//         {stalls.map(stall => (
//           <div key={stall.id} className="stall-card">
//             <div className="favorite-icon" onClick={() => toggleFavorite(stall.id)}>
//               {/* Font Awesome heart icon */}
//               <i className={`fa${favorites.includes(stall.id) ? 's' : 'r'} fa-heart`}></i>
//             </div>
//             <img src={stall.image} alt={stall.name} className="stall-image" />
//             <div className="stall-info">
//               <h3>{stall.name}</h3>
//               <p>{stall.description}</p>
//               <Link to={`/stall/${stall.id}`} className="btn-custom">View Details</Link>
//             </div>
//           </div>
//         ))}
//       </div>

//       <footer>
//         <p>&copy; 2024 Foodie. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default StallsPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StallsPage.css'; // Import the CSS file
import axios from 'axios'; // Import axios for making API requests
import { useNavigate } from 'react-router-dom';


const StallsPage = () => {
  const [stalls, setStalls] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    navigate('/login'); // Redirect to login
  };
  // Fetch stalls data from the backend
  useEffect(() => {
    const fetchStalls = async () => {
      try {
        const response = await axios.get('/api/foodstall'); // Adjust the endpoint as needed
        setStalls(response.data);
      } catch (error) {
        console.error('Error fetching stalls data:', error);
      }
    };

    fetchStalls();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to toggle favorite
  const toggleFavorite = (stallId) => {
    if (favorites.includes(stallId)) {
      setFavorites(favorites.filter((id) => id !== stallId));
    } else {
      setFavorites([...favorites, stallId]);
    }
  };

  return (
    <div className="stalls-page">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Foodie</Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/stalls">Stall</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/reviews" className="reviews-icon">
            <i className="fa fa-star" aria-hidden="true"></i> Reviews
          </Link>
          <Link to="/filter" className="filter-icon">
            <i className="fa fa-filter" aria-hidden="true"></i> Filter
          </Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>

        </div>
      </nav>

      <div className="stalls-header">
        <h1>Our Stalls</h1>
        <p>Explore the best stalls with delightful foods.</p>
      </div>

      <div className="stalls-grid">
        {stalls.map(stall => (
          <div key={stall._id} className="stall-card">
            <div className="favorite-icon" onClick={() => toggleFavorite(stall._id)}>
              {/* Font Awesome heart icon */}
              <i className={`fa${favorites.includes(stall._id) ? 's' : 'r'} fa-heart`}></i>
            </div>
            <img src={stall.imageUrl} alt={stall.name} className="stall-image" />
            <div className="stall-info">
              <h3>{stall.name}</h3>
              <p>{stall.description}</p>
              <Link to={`/stall/${stall._id}`} className="btn-custom">View Details</Link>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <p>&copy; 2024 Foodie. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StallsPage;
