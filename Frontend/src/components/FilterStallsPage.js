// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Import Link for routing
// import './FilterStallsPage.css';

// const stallData = [
//   { id: "66c580b4bf2ad056d46b94b2", name: 'Stall 1', cuisine: 'Italian', price: 'Low', rating: 4.5, image: '/images/stall1.jpg' },
//   { id: 2, name: 'Stall 2', cuisine: 'Chinese', price: 'Medium', rating: 4.2, image: '/images/stall2.jpg' },
//   { id: 3, name: 'Stall 3', cuisine: 'Mexican', price: 'High', rating: 4.7, image: '/images/stall3.jpg' },
//   { id: 4, name: 'Stall 4', cuisine: 'Indian', price: 'Medium', rating: 4.1, image: '/images/stall4.jpg' },
//   { id: 5, name: 'Stall 5', cuisine: 'Italian', price: 'High', rating: 4.8, image: '/images/stall5.jpg' },
//   // Add more stall objects here...
// ];

// const FilterStallsPage = () => {
//   const [cuisineFilter, setCuisineFilter] = useState('All');
//   const [priceFilter, setPriceFilter] = useState('All');
//   const [ratingFilter, setRatingFilter] = useState('All');

//   const filterStalls = () => {
//     return stallData.filter(stall => {
//       const cuisineMatch = cuisineFilter === 'All' || stall.cuisine === cuisineFilter;
//       const priceMatch = priceFilter === 'All' || stall.price === priceFilter;
//       const ratingMatch = ratingFilter === 'All' || stall.rating >= parseFloat(ratingFilter);

//       return cuisineMatch && priceMatch && ratingMatch;
//     });
//   };

//   const filteredStalls = filterStalls();

//   return (
//     <div className="filter-page">
//       {/* Navigation Bar */}
//       <nav className="navbar">
//         <div className="navbar-brand">
//           <a href="/">Foodie</a>
//         </div>
//         <div className="navbar-links">
//           <Link to="/">Home</Link>
//           <Link to="/categories">Categories</Link>
//           <Link to="/stalls">Stalls</Link>
//           <Link to="/about">About</Link>
//           <Link to="/contact">Contact</Link>
//           <Link to="/reviews" className="reviews-icon">
//             <i className="fa fa-star" aria-hidden="true"></i> Reviews
//           </Link>
//           <Link to="/filter" className="filter-icon">
//             <i className="fa fa-filter" aria-hidden="true"></i> Filter
//           </Link>
//         </div>
//       </nav>

//       <h1>Search Results for Stalls</h1>
//       <p>Showing {filteredStalls.length} results</p>

//       <div className="filters">
//         <div>
//           <label htmlFor="cuisine">Cuisine:</label>
//           <select id="cuisine" value={cuisineFilter} onChange={(e) => setCuisineFilter(e.target.value)}>
//             <option value="All">All</option>
//             <option value="Italian">Italian</option>
//             <option value="Chinese">Chinese</option>
//             <option value="Mexican">Mexican</option>
//             <option value="Indian">Indian</option>
//             {/* Add more options if needed */}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="price">Price:</label>
//           <select id="price" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
//             <option value="All">All</option>
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="rating">Rating:</label>
//           <select id="rating" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
//             <option value="All">All</option>
//             <option value="4">4 & above</option>
//             <option value="4.5">4.5 & above</option>
//             <option value="5">5 & above</option>
//           </select>
//         </div>
//       </div>

//       <div className="stall-list">
//         {filteredStalls.map((stall) => (
//           <div key={stall.id} className="stall-card">
//             <img src={stall.image} alt={stall.name} className="stall-image" />
//             <h3>{stall.name}</h3>
//             <p>{stall.cuisine}, {stall.price} Price</p>
//             <p>Rating: {stall.rating}/5</p>
//             <button className="view-menu-btn">
//               <Link to={`/stall/${stall.id}`} className="view-menu-link">View Details</Link>
//             </button>
//           </div>
//         ))}
//       </div>
//        {/* Footer */}
//        <footer>
//         <p>&copy; 2024 Foodie. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default FilterStallsPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import axios from 'axios'; // Import axios for making HTTP requests
import './FilterStallsPage.css';
import { useNavigate } from 'react-router-dom';



const FilterStallsPage = () => {
  const [stalls, setStalls] = useState([]); // State for storing stall data
  const [cuisineFilter, setCuisineFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('isLoggedIn'); // Clear login status
  navigate('/login'); // Redirect to login
};
  // Fetch stalls from backend
  useEffect(() => {
    const fetchStalls = async () => {
      try {
        const response = await axios.get('/api/foodstall'); // Adjust the endpoint as needed
        setStalls(response.data); // Assuming response.data is an array of stall objects
      } catch (error) {
        console.error('Error fetching stalls', error);
      }
    };

    fetchStalls();
  }, []);

  const filterStalls = () => {
    return stalls.filter(stall => {
      const cuisineMatch = cuisineFilter === 'All' || stall.cuisine === cuisineFilter;
      const priceMatch = priceFilter === 'All' || stall.price === priceFilter;
      const ratingMatch = ratingFilter === 'All' || stall.rating >= parseFloat(ratingFilter);

      return cuisineMatch && priceMatch && ratingMatch;
    });
  };

  const filteredStalls = filterStalls();

  return (
    <div className="filter-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/">Foodie</a>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/stalls">Stalls</Link>
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

      <h1>Search Results for Stalls</h1>
      <p>Showing {filteredStalls.length} results</p>

      <div className="filters">
        <div>
          <label htmlFor="cuisine">Cuisine:</label>
          <select id="cuisine" value={cuisineFilter} onChange={(e) => setCuisineFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
            <option value="Japanese">Japanese</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="American">American</option>
            <option value="Coffee & Snacks">Coffee & Snacks</option>
            <option value="Desserts">Desserts</option>
            {/* Add more options if needed */}
          </select>
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <select id="price" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="rating">Rating:</label>
          <select id="rating" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="4">4 & above</option>
            <option value="4.5">4.5 & above</option>
            <option value="5">5 & above</option>
          </select>
        </div>
      </div>

      <div className="stall-list">
        {filteredStalls.map((stall) => (
          <div key={stall.id} className="stall-card">
            <img src={stall.imageUrl} alt={stall.name} className="stall-image" />
            <h3>{stall.name}</h3>
            <p>{stall.cuisine}, {stall.price} Price</p>
            <p>Rating: {stall.rating}/5</p>
            <button className="view-menu-btn">
              <Link to={`/stall/${stall._id}`} className="view-menu-link">View Details</Link>
            </button>
          </div>
        ))}
      </div>
       {/* Footer */}
       <footer>
        <p>&copy; 2024 Foodie. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FilterStallsPage;
