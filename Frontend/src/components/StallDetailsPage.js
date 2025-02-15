// import React from 'react';
// import { Link } from 'react-router-dom';

// import { useParams } from 'react-router-dom';
// import './StallDetailsPage.css'; // Import the CSS file

// // Example data for stalls
// const stalls = {
//   1: {
//     name: 'Himalayan Delights',
//     cuisine: 'Nepalese',
//     location: 'Downtown Street',
//     rating: 4.8,
//     reviews: [
//       'The best momos I’ve ever had!',
//       'Loved the spicy sauce, a perfect match for the momos.',
//     ],
//     image: '/images/icecream.jpeg',
//     description: 'Authentic Nepalese food with a focus on momos.',
//   },
//   2: {
//     name: 'Momo Magic',
//     cuisine: 'Chinese',
//     location: 'Main City Mall',
//     rating: 4.7,
//     reviews: [
//       'Crispy and tasty momos, perfect with their sauces.',
//       'A nice spot for quick bites!',
//     ],
//     image: '/images/momos.jpeg',
//     description: 'Specializing in crispy and steamed momos.',
//   },
//   3: {
//     name: 'Cheese Delight',
//     cuisine: 'Italian',
//     location: 'City Food Plaza',
//     rating: 4.9,
//     reviews: [
//       'Cheesy and delicious, highly recommend!',
//       'Everything on the menu is packed with cheese and flavor.',
//     ],
//     image: '/images/chocolatecake.jpeg',
//     description: 'Famous for its cheese-filled dishes.',
//   }
// };

// const StallDetailsPage = () => {
//   const { id } = useParams();
//   const stall = stalls[id];

//   if (!stall) {
//     return <p>Stall not found</p>;
//   }

//   return (
//     <div className="stall-details-page">
//       <nav className="navbar">
//         <div className="navbar-brand">
//           <a href="/">Foodie</a>
//         </div>
//         <div className="navbar-links">
//           <a href="/">Home</a>
//           <a href="/categories">Categories</a>
//           <a href="/stalls">Stall</a>
//           <a href="/about">About</a>
//           <a href="/contact">Contact</a>
//           <Link to="/reviews" className="reviews-icon">
//             <i className="fa fa-star" aria-hidden="true"></i> Reviews
//           </Link>
//           <Link to="/filter" className="filter-icon"> {/* Filter Icon Link */}
//             <i className="fa fa-filter" aria-hidden="true"></i> Filter
//           </Link>
//         </div>
//       </nav>

//       <div className="stall-header">
//         <h1>{stall.name}</h1>
//       </div>

//       <div className="stall-details-grid">
//         <img src={stall.image} alt={stall.name} className="stall-image" />
//         <div className="stall-info">
//           <p><strong>Cuisine:</strong> {stall.cuisine}</p>
//           <p><strong>Location:</strong> {stall.location}</p>
//           <p><strong>Rating:</strong> {stall.rating} ⭐</p>
//           <p>{stall.description}</p>
//           <h3>Reviews:</h3>
//           <ul>
//             {stall.reviews.map((review, index) => (
//               <li key={index}>{review}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <footer>
//         <p>&copy; 2024 Foodie. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default StallDetailsPage;

//working

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import './StallDetailsPage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';


const StallDetailsPage = () => {
  const { id } = useParams();
  const [stall, setStall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    navigate('/login'); // Redirect to login
  };
  // Fetch stall details from the backend
  useEffect(() => {
    const fetchStall = async () => {
      try {
        const response = await axios.get(`/api/foodstall/${id}`); // Adjust the endpoint as needed
        console.log(response.data); 
        setStall(response.data.foodstall1);
      } catch (err) {
        setError('Error fetching stall data');
      } finally {
        setLoading(false);
      }
    };

    fetchStall();
  }, [id]);

  useEffect(() => {
    console.log(stall); // Log stall to see if it's updated correctly
  }, [stall]);
  // Loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!stall) return <p>Stall not found</p>;

  return (
    <div className="stall-details-page">
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
          <Link to="/filter" className="filter-icon"> {/* Filter Icon Link */}
            <i className="fa fa-filter" aria-hidden="true"></i> Filter
          </Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>

        </div>
      </nav>

      <div className="stall-header">
        <h1>{stall.name}</h1>
      </div>

      <div className="stall-details-grid">
        <img src={stall.imageUrl} alt={stall.name} className="stall-image" /> {/* Use imageUrl from the schema */}
        <div className="stall-info">
          <p><strong>Cuisine:</strong> {stall.cuisine}</p>
          <p><strong>Location:</strong> {stall.location}</p>
          <p><strong>Rating:</strong> {stall.rating} ⭐</p>
          <p>{stall.description}</p>
          <h3>Contact Number:</h3>
          <p>{stall.contact_number}</p> {/* Display the contact number */}
          <h3>Open:</h3>
          <p>{stall.is_open ? 'Yes' : 'No'}</p> {/* Display if the stall is open */}
        </div>

        <h3>Menu:</h3>
          {stall.foodIds && stall.foodIds.length > 0 ? (
            <ul>
              {stall.foodIds.map(food => (
                <li key={food._id}>
                  {food.name} {/* Display food name */}
                  <Link to={`/foods/${food._id}`} className="food-detail-button">
                    View Details
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No food items available.</p>
          )}
      </div>

      <footer>
        <p>&copy; 2024 Foodie. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StallDetailsPage;
