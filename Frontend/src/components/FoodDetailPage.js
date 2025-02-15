
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import './FoodDetailPage.css';
// import { useNavigate } from 'react-router-dom';


// const FoodDetailPage = () => {
//   const { id } = useParams();
//   const [food, setFood] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn'); // Clear login status
//     navigate('/login'); // Redirect to login
//   };
//   const fetchFoodDetails = async () => {
//     try {
//       const response = await axios.get(`/api/foods/${id}`); // Adjust the endpoint as needed
//       setFood(response.data);
//     } catch (err) {
//       setError('Failed to load food details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFoodDetails();
//   }, [id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!food) {
//     return <p>Food not found</p>;
//   }

//   return (
//     <div className="food-detail-page">
//       <nav className="navbar">
//         <div className="navbar-brand">
//           <Link to="/">Foodie</Link>
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
//           <button onClick={handleLogout} className="logout-button">Logout</button>
//         </div>
//       </nav>

//       <div className="food-detail-header">
//         <h1>{food.name}</h1>
//         <p><strong>Cuisine:</strong> {food.cuisine}</p>
//         <p><strong>Rating:</strong> {food.rating} ⭐</p>
//         <img src={food.imageUrl} alt={food.name} className="food-detail-image" />
//       </div>

//       <div className="food-detail-info">
//         <h2>Description</h2>
//         <p>{food.description}</p>

//         <h2>Price: ₹{food.price}</h2>

//         <h2>Ingredients:</h2>
//         <ul>
//           {food.ingredients.map((ingredient, index) => (
//             <li key={index}>{ingredient}</li>
//           ))}
//         </ul>

//         <h2>Food Stalls:</h2>
//         {food.foodstall && food.foodstall.length > 0 ? (
//           <ul>
//             {food.foodstall.map((stall, index) => (
//               <li key={index}>
//                 <p><strong>{stall.name}</strong> - {stall.description}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No food stalls available</p>
//         )}
//       </div>

//       <footer>
//         <p>&copy; 2024 Foodie. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default FoodDetailPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './FoodDetailPage.css';
import { useNavigate } from 'react-router-dom';

const FoodDetailPage = () => {
  const { id } = useParams(); // food item id
  const [food, setFood] = useState(null);
  const [reviews, setReviews] = useState([]); // State for reviews
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    navigate('/login'); // Redirect to login
  };

  const fetchFoodDetails = async () => {
    try {
      const response = await axios.get(`/api/foods/${id}`); // Fetch food details
      setFood(response.data);
    } catch (err) {
      setError('Failed to load food details');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/review/${id}`); // Fetch reviews for the food item
      setReviews(response.data);
    } catch (err) {
      setError('Failed to load reviews');
    }
  };

  useEffect(() => {
    fetchFoodDetails();
    fetchReviews(); // Fetch reviews on page load
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!food) {
    return <p>Food not found</p>;
  }

  return (
    <div className="food-detail-page">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Foodie</Link>
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

      <div className="food-detail-header">
        <h1>{food.name}</h1>
        <p><strong>Cuisine:</strong> {food.cuisine}</p>
        <p><strong>Rating:</strong> {food.rating} ⭐</p>
        <img src={food.imageUrl} alt={food.name} className="food-detail-image" />
      </div>

      <div className="food-detail-info">
        <h2>Description</h2>
        <p>{food.description}</p>

        <h2>Price: ₹{food.price}</h2>

        <h2>Ingredients:</h2>
        <ul>
          {food.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h2>Food Stalls:</h2>
        {food.foodstall && food.foodstall.length > 0 ? (
          <ul>
            {food.foodstall.map((stall, index) => (
              <li key={index}>
                <p><strong>{stall.name}</strong> - {stall.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No food stalls available</p>
        )}

        {/* Display reviews */}
        <h2>Reviews:</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review._id}>
                <p><strong>User:</strong> {review.user_id.username}</p> {/* Assuming `user` object contains `name` */}
                <p><strong>Foodstall:</strong> {review.foodstall.name}</p> {/* Assuming `foodstall` object contains `name` */}
                <p><strong>Rating:</strong> {review.rating} ⭐</p>
                <p>{review.review_text}</p>
                <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available</p>
        )}
      </div>

      <footer>
        <p>&copy; 2024 Foodie. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FoodDetailPage;
