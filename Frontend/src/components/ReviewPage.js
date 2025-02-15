// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Import Link for routing
// import './ReviewPage.css'; // Import the CSS file for styling

// // Sample stall data (you can fetch this from an API in a real-world scenario)
// const stall = {
//   id: 1,
//   name: 'Himalayan Delights',
//   image: '/images/himalayanDelights.jpg',
//   description: 'Authentic Nepalese food with a focus on momos.',
// };

// // Sample reviews (you can fetch these from a database)
// const initialReviews = [
//   { id: 1, name: 'John Doe', rating: 4.5, comment: 'Delicious momos, will definitely come again!' },
//   { id: 2, name: 'Jane Smith', rating: 5, comment: 'The best Nepali food in town.' },
// ];

// const ReviewPage = () => {
//   const [reviews, setReviews] = useState(initialReviews);
//   const [newReview, setNewReview] = useState({
//     name: '',
//     rating: '',
//     comment: '',
//   });

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Add the new review to the list
//     const updatedReviews = [
//       ...reviews,
//       { ...newReview, id: reviews.length + 1, rating: parseFloat(newReview.rating) },
//     ];

//     setReviews(updatedReviews);
//     setNewReview({ name: '', rating: '', comment: '' });
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewReview({ ...newReview, [name]: value });
//   };

//   return (
//     <div className="review-page">
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

//       {/* Stall Information */}
//       <div className="stall-info">
//         <img src={stall.image} alt={stall.name} className="stall-image" />
//         <h1>{stall.name}</h1>
//         <p>{stall.description}</p>
//       </div>

//       {/* Review Form */}
//       <div className="review-form">
//         <h2>Leave a Review</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Name</label>
//             <input
//               type="text"
//               name="name"
//               value={newReview.name}
//               onChange={handleChange}
//               required
//               placeholder="Enter your name"
//             />
//           </div>
//           <div className="form-group">
//             <label>Rating</label>
//             <input
//               type="number"
//               name="rating"
//               value={newReview.rating}
//               onChange={handleChange}
//               required
//               min="1"
//               max="5"
//               step="0.1"
//               placeholder="Rate out of 5"
//             />
//           </div>
//           <div className="form-group">
//             <label>Review</label>
//             <textarea
//               name="comment"
//               value={newReview.comment}
//               onChange={handleChange}
//               required
//               placeholder="Enter your review"
//             />
//           </div>
//           <button type="submit" className="btn-custom">Submit Review</button>
//         </form>
//       </div>

//       {/* Display Reviews */}
//       <div className="reviews-list">
//         <h2>Reviews</h2>
//         {reviews.length > 0 ? (
//           reviews.map((review) => (
//             <div key={review.id} className="review-item">
//               <h3>{review.name}</h3>
//               <p>Rating: {review.rating} / 5</p>
//               <p>{review.comment}</p>
//             </div>
//           ))
//         ) : (
//           <p>No reviews yet. Be the first to leave a review!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReviewPage;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './ReviewPage.css'; 
import axios from 'axios'; 
import { useUser } from './UserContext'; 
import { useNavigate } from 'react-router-dom';

const ReviewPage = () => {
  const navigate = useNavigate();
  const { user } = useUser(); 
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    username: '',
    foodItemId: '',
    foodstallId: '',
    rating: '',
    reviewText: '',
  });
  const [foodItems, setFoodItems] = useState([]); 
  const [foodstalls, setFoodstalls] = useState([]); 
  const [userId, setUserId] = useState(null); 

  // Fetch data on mount
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('/api/foods');
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items', error);
      }
    };

    const fetchFoodStalls = async () => {
      try {
        const response = await axios.get('/api/foodstall');
        setFoodstalls(response.data);
      } catch (error) {
        console.error('Error fetching food stalls', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/review');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews', error);
      }
    };

    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserId(userData._id);
    }

    fetchFoodItems();
    fetchFoodStalls();
    fetchReviews();
  }, []);

  // Handle review deletion
  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`/api/review/${reviewId}`); // Send DELETE request
      setReviews(reviews.filter(review => review._id !== reviewId)); // Update state after deletion
    } catch (error) {
      console.error('Error deleting review', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        food_item_id: newReview.foodItemId,
        user_id: userId,
        rating: parseFloat(newReview.rating),
        review_text: newReview.reviewText,
        date: new Date(),
        foodstall: newReview.foodstallId,
      };

      await axios.post('/api/review', reviewData); 
      setReviews([...reviews, reviewData]); 
      setNewReview({ username: '', foodItemId: '', foodstallId: '', rating: '', reviewText: '' }); 
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  return (
    <div className="review-page">
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
          <button onClick={() => localStorage.removeItem('isLoggedIn') && navigate('/login')} className="logout-button">
            Logout
          </button>
        </div>
      </nav>

      <div className="stall-info">
        <h1>Leave a Review</h1>
      </div>

      <div className="review-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={newReview.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label>Food Item</label>
            <select
              name="foodItemId"
              value={newReview.foodItemId}
              onChange={handleChange}
              required
            >
              <option value="">Select food item</option>
              {foodItems.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Food Stall</label>
            <select
              name="foodstallId"
              value={newReview.foodstallId}
              onChange={handleChange}
              required
            >
              <option value="">Select food stall</option>
              {foodstalls.map((stall) => (
                <option key={stall._id} value={stall._id}>
                  {stall.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Rating</label>
            <input
              type="number"
              name="rating"
              value={newReview.rating}
              onChange={handleChange}
              required
              min="1"
              max="5"
              step="0.1"
              placeholder="Rate out of 5"
            />
          </div>
          <div className="form-group">
            <label>Review</label>
            <textarea
              name="reviewText"
              value={newReview.reviewText}
              onChange={handleChange}
              required
              placeholder="Enter your review"
            />
          </div>
          <button type="submit" className="btn-custom">Submit Review</button>
        </form>
      </div>

      <div className="reviews-list">
        <h2>Your Reviews</h2>
        {reviews.length > 0 ? (
          reviews
            .filter(review => review.user_id === userId) 
            .map((review) => {
              const foodItem = foodItems.find(item => item._id === review.food_item_id);
              const foodstall = foodstalls.find(stall => stall._id === review.foodstall);

              return (
                <div key={review._id} className="review-item">
                  <p>Rating: {review.rating} / 5</p>
                  <p>Food: {foodItem ? foodItem.name : 'Unknown Food'}</p>
                  <p>Food Stall: {foodstall ? foodstall.name : 'Unknown Stall'}</p>
                  <p>{review.review_text}</p>
                  <button onClick={() => handleDelete(review._id)} className="btn-delete">Delete Review</button> 
                </div>
              );
            })
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
