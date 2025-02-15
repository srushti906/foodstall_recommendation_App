// import React from 'react';
// import { Link } from 'react-router-dom';

// import './CategoryDetailsPage.css'; // Import the CSS file
// import { useParams } from 'react-router-dom';

// // Example data for the food items in each category
// const categories = {
//   1: { 
//     name: 'Pizza', 
//     foodItems: [
//       { id: 1, name: 'Margherita Pizza', rating: 4.8, stall: 'Italian Stall', price: '₹300', image: '/images/margheritapizza.jpeg', description: 'Classic pizza with mozzarella and basil.' },
//       { id: 2, name: 'Pepperoni Pizza', rating: 4.7, stall: 'Pepperoni Palace', price: '₹350', image: '/images/pepperonipizza.jpeg', description: 'Spicy pepperoni with melted cheese.' }
//     ]
//   },
//   2: { 
//     name: 'Burgers', 
//     foodItems: [
//       { id: 1, name: 'Cheeseburger', rating: 4.5, stall: 'Burger Joint', price: '₹150', image: '/images/cheeseburger.jpeg', description: 'Classic cheeseburger with fries.' },
//       { id: 2, name: 'Veggie Burger', rating: 4.3, stall: 'Vegan Eats', price: '₹130', image: '/images/veggieburger.jpeg', description: 'Delicious plant-based veggie burger.' }
//     ]
//   },
//   3: { 
//     name: 'Momos', 
//     foodItems: [
//       { id: 1, name: 'Steamed Momos', rating: 4.8, stall: 'Himalayan Delights', price: '₹100', image: '/images/steamedMomos.jpeg', description: 'Soft and fresh steamed momos with a savory filling.' },
//       { id: 2, name: 'Fried Momos', rating: 4.7, stall: 'Momo Magic', price: '₹120', image: '/images/friedMomos.jpeg', description: 'Crispy fried momos with spicy dipping sauce.' },
//       { id: 3, name: 'Cheese Momos', rating: 4.9, stall: 'Cheese Delight', price: '₹150', image: '/images/cheeseMomos.jpeg', description: 'Delicious momos stuffed with creamy cheese filling.' }
//     ]
//   }
// };

// const CategoryDetailsPage = () => {
//   const { id } = useParams();
//   const category = categories[id];

//   if (!category) {
//     return <p>Category not found</p>;
//   }

//   return (
//     <div className="category-details-page">
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

//       {/* Category Header */}
//       <div className="category-header">
//         <h1>{category.name}</h1>
//       </div>

//       {/* Category Food Items */}
//       <div className="food-items-grid">
//         {category.foodItems.map(item => (
//           <div key={item.id} className="food-item-card">
//             <img src={item.image} alt={item.name} className="food-item-image" />
//             <div className="food-item-info">
//               <h3>{item.name}</h3>
//               <p>{item.description}</p>
//               <p>Rating: {item.rating} ⭐</p>
//               <p>Stall: {item.stall}</p>
//               <p>Price: {item.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       <footer>
//         <p>&copy; 2024 Foodie. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default CategoryDetailsPage;

//working


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom'; // Import Link for routing

// const CategoryDetailsPage = () => {
//   const { id } = useParams();
//   const [category, setCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch category data
//   const fetchCategory = async () => {
//     try {
//       // Fetch category from backend
//       const response = await axios.get(`/api/categories/${id}`);
//       const fetchedCategory = response.data;

//       // Fetch food item details concurrently
//       const foodItemRequests = fetchedCategory.foodItems.map(item =>
//         axios.get(`/api/foods/${item._id}`) // Fetch each food item by its ID
//       );

//       // Wait for all food item requests to complete
//       const foodItemResponses = await Promise.all(foodItemRequests);
//       const foodItems = foodItemResponses.map(res => res.data);

//       // No need to fetch stall details; foodItems already contain foodstall info
//       // Set the final category state with food items that include stall information
//       setCategory({ ...fetchedCategory, foodItems });
//     } catch (err) {
//       console.error('Error fetching category:', err);
//       setError('Failed to load category');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategory(); // Fetch data when component mounts
//   }, [id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!category) {
//     return <p>Category not found</p>;
//   }

//   return (
//     <div className="category-details-page">
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

//       <div className="category-header">
//         <h1>{category.name}</h1>
//       </div>

//       <div className="food-items-grid">
//         {category.foodItems.map(item => (
//           <div key={item._id} className="food-item-card">
//             <img src={item.imageUrl} alt={item.name} className="food-item-image" />
//             <div className="food-item-info">
//               <h3>{item.name}</h3>
//               <p>Rating: {item.rating} ⭐</p>
//               <p>Stall: {item.foodstall.name}</p> {/* Display food stall name */}
//               <p>Price: ₹{item.price}</p>
//               <p>{item.description}</p> {/* Display food item description */}
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

// export default CategoryDetailsPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link for routing
import { useNavigate } from 'react-router-dom';


const CategoryDetailsPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    navigate('/login'); // Redirect to login
  };
  // Fetch category data
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`/api/categories/${id}`);
      const fetchedCategory = response.data;

      // Fetch food item details concurrently
      const foodItemRequests = fetchedCategory.foodItems.map(item =>
        axios.get(`/api/foods/${item._id}`) // Fetch each food item by its ID
      );

      // Wait for all food item requests to complete
      const foodItemResponses = await Promise.all(foodItemRequests);
      const foodItems = foodItemResponses.map(res => res.data);

      setCategory({ ...fetchedCategory, foodItems });
    } catch (err) {
      console.error('Error fetching category:', err);
      setError('Failed to load category');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory(); // Fetch data when component mounts
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!category) {
    return <p>Category not found</p>;
  }

  return (
    <div className="category-details-page">
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

      <div className="category-header">
        <h1>{category.name}</h1>
      </div>

      <div className="food-items-grid">
        {category.foodItems.map(item => (
          <div key={item._id} className="food-item-card">
            <img src={item.imageUrl} alt={item.name} className="food-item-image" />
            <div className="food-item-info">
              <h3>{item.name}</h3>
              <p>Rating: {item.rating} ⭐</p>
              <p>Price: ₹{item.price}</p>
              <p>{item.description}</p> {/* Display food item description */}
              <Link to={`/foods/${item._id}`} className="btn-custom">View Details</Link>
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

export default CategoryDetailsPage;
