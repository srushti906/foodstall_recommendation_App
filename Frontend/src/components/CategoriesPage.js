// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Import Link for routing
// import './CategoriesPage.css'; // Import the CSS file

// const categories = [
//   { id: 1, name: 'Pizza', image: '/images/pizza.jpeg', description: 'Explore our delicious pizza options.' },
//   { id: 2, name: 'Burgers', image: '/images/burger.jpeg', description: 'Check out our juicy burgers.' },
//   { id: 3, name: 'Momos', image: '/images/momos.jpeg', description: 'Taste our authentic momos.' },
// ];

// const CategoriesPage = () => {
//   const [searchQuery, setSearchQuery] = useState(''); // State for managing search input

//   // Filter categories based on the search query
//   const filteredCategories = categories.filter(category =>
//     category.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="categories-page">
//       {/* Navigation Bar */}
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

//       {/* Search Bar */}
//       <div className="search-bar">
//         <input 
//           type="text" 
//           placeholder="Search for categories..." 
//           value={searchQuery} 
//           onChange={e => setSearchQuery(e.target.value)} // Update search query
//           className="search-input"
//         />
//       </div>

//       {/* Categories Grid */}
//       <div className="categories-grid">
//         {filteredCategories.length > 0 ? (
//           filteredCategories.map(category => (
//             <div key={category.id} className="category-card">
//               <img src={category.image} alt={category.name} />
//               <h3>{category.name}</h3>
//               <p>{category.description}</p>
//               {/* Use Link instead of anchor tag to navigate to Category Details */}
//               <Link to={`/category/${category.id}`} className="btn-custom">View More</Link>
//             </div>
//           ))
//         ) : (
//           <p>No categories found</p>
//         )}
//       </div>

//       {/* Footer */}
//       <footer>
//         <p>&copy; 2024 Foodie. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default CategoriesPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import axios from 'axios'; // Import Axios for API requests
import './CategoriesPage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';


const CategoriesPage = () => {
  const [categories, setCategories] = useState([]); // State for categories
  const [searchQuery, setSearchQuery] = useState(''); // State for managing search input
  const [loading, setLoading] = useState(true); // Loading state

    
      const navigate = useNavigate();

      const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // Clear login status
        navigate('/login'); // Redirect to login
      };
  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories'); // Adjust the endpoint if necessary
        setCategories(response.data); // Set fetched categories to state
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Data loaded
      }
    };

    fetchCategories();
  }, []);

  // Filter categories based on the search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Loading categories...</p>; // Show loading state until data is fetched
  }

  return (
    <div className="categories-page">
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

      {/* Search Bar */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for categories..." 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} // Update search query
          className="search-input"
        />
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <div key={category._id} className="category-card">
              <img src={category.imageUrl} alt={category.name} /> {/* Ensure the property name matches your backend */}
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              {/* Use Link instead of anchor tag to navigate to Category Details */}
              <Link to={`/category/${category._id}`} className="btn-custom">View More</Link>
            </div>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Foodie. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CategoriesPage;

