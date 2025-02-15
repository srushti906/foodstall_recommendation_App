// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './HomePage.css'; // Import the CSS file

// const foodItems = [
//   { id: 1, name: 'Pizza', rating: 4.5, image: '/images/pizza.jpeg', description: 'Delicious pizza with cheesy topping.' },
//   { id: 2, name: 'Burger', rating: 4.0, image: '/images/burger.jpeg', description: 'Juicy burger with a crispy patty.' },
//   { id: 3, name: 'Momos', rating: 4.8, image: '/images/momos.jpeg', description: 'Fresh momos with quality ingredients.' },
// ];

// const foodStalls = [
//   { id: 1, name: 'The Italian Corner', description: 'Specializing in pizzas and pastas with authentic flavors.', rating: 4.7 },
//   { id: 2, name: 'Burger Hut', description: 'Known for the best grilled burgers in town.', rating: 4.6 },
//   { id: 3, name: 'Asian Delights', description: 'Serving a variety of Asian cuisines including fresh momos and sushi.', rating: 4.8 },
// ];

// const recommendedStalls = foodStalls.filter(stall => stall.rating >= 4.7);

// const HomePage = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % foodItems.length);
//     }, 3000); // Change image every 3 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="homepage">
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

//       {/* Image Slider */}
//       <div className="slider">
//         <div className="slider-content">
//           <img src={foodItems[currentIndex].image} alt={foodItems[currentIndex].name} />
//           <div className="slider-info">
//             <h3>{foodItems[currentIndex].name}</h3>
//             <p>{foodItems[currentIndex].description}</p>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <section className="features-section">
//         <h2>Our Special Features</h2>
//         <div className="features-grid">
//           {foodStalls.map((stall) => (
//             <div key={stall.id} className="feature-item">
//               <h3>{stall.name}</h3>
//               <p>{stall.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Recommended Food Stalls Section */}
//       <section className="recommended-section">
//         <h2>Recommended Food Stalls</h2>
//         <div className="recommended-grid">
//           {recommendedStalls.map((stall) => (
//             <div key={stall.id} className="recommended-item">
//               <h3>{stall.name}</h3>
//               <p>Rating: {stall.rating}</p>
//               <p>{stall.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer>
//         <p>&copy; 2024 Foodie. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };




// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './HomePage.css'; // Import the CSS file
// import { useNavigate } from 'react-router-dom';


// const HomePage = () => {
//   const [foodItems, setFoodItems] = useState([]);
//   const [foodStalls, setFoodStalls] = useState([]);
//   const [recommendedStalls, setRecommendedStalls] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
  
  
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn'); // Clear login status
//     navigate('/login'); // Redirect to login
//   };
//   // Fetch food items and food stalls from the backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("Fetching data...");

//         // Fetch food items
//         const foodResponse = await fetch('/api/foods/recommended');
//         const foodData = await foodResponse.json();
//         const updatedItems = foodData.map(item => ({
//           ...item,
//           imageUrl: item.imageUrl.replace(/\\/g, '/'), // Normalize URL by replacing backslashes
//         }));

//         console.log('Food items fetched:', updatedItems); // Log the fetched items
//         setFoodItems(updatedItems);

//         // Fetch food stalls
//         const stallResponse = await fetch('/api/foodstall');
//         const stallData = await stallResponse.json();
//         setFoodStalls(stallData);
//         setRecommendedStalls(stallData.filter(stall => stall.rating >= 4.7));

//         setLoading(false); // Data loaded
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Image slider effect
//   useEffect(() => {
//     if (foodItems.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % foodItems.length);
//       }, 3000); // Change image every 3 seconds

//       return () => clearInterval(interval);
//     }
//   }, [foodItems]);

//   // Ensure index is within bounds
//   const currentFoodItem = foodItems.length > 0 ? foodItems[currentIndex % foodItems.length] : null;

//   if (loading) {
//     return <p>Loading...</p>; // Show loading state until data is fetched
//   }

//   return (
//     <div className="homepage">
//       {/* Navigation Bar */}
//       <nav className="navbar">
//         <div className="navbar-brand">
//           <a href="/">Foodie</a>
//         </div>
//         <div className="navbar-links">
//           <a href="/">Home</a>
//           <a href="/categories">Categories</a>
//           <a href="/menu">Menu</a>
//           <a href="/stalls">Stall</a>
//           <a href="/about">About</a>
//           <a href="/contact">Contact</a>
//           <Link to="/reviews" className="reviews-icon">
//             <i className="fa fa-star" aria-hidden="true"></i> Reviews
//           </Link>
//           <Link to="/filter" className="filter-icon">
//             <i className="fa fa-filter" aria-hidden="true"></i> Filter
//           </Link>
//         </div>
//       </nav>

//       {/* Image Slider */}
//       <div className="slider">
//         <div className="slider-content">
//           {currentFoodItem && (
//             <>
//               <img src={currentFoodItem.imageUrl} alt={currentFoodItem.name} />
//               <div className="slider-info">
//                 <h3>{currentFoodItem.name}</h3>
//                 <p>{currentFoodItem.description}</p>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Features Section */}
//       <section className="features-section">
//         <h2>Our Special Features</h2>
//         <div className="features-grid">
//           {foodStalls.map((stall) => (
//             <div key={stall._id} className="feature-item">
//               <h3>{stall.name}</h3>
//               <p>{stall.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Recommended Food Stalls Section */}
//       <section className="recommended-section">
//         <h2>Recommended Food Stalls</h2>
//         <div className="recommended-grid">
//           {recommendedStalls.map((stall) => (
//             <div key={stall._id} className="recommended-item">
//               <h3>{stall.name}</h3>
//               <p>Rating: {stall.rating}</p>
//               <p>{stall.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer>
//         <p>&copy; 2024 Foodie. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  const [foodItems, setFoodItems] = useState([]); // For common recommended food items
  const [foodStalls, setFoodStalls] = useState([]); // For food stalls
  const [recommendedStalls, setRecommendedStalls] = useState([]); // For recommended food stalls
  const [recommendedFeatures, setRecommendedFeatures] = useState([]); // Combined user-specific and common recommended features
  const [currentIndex, setCurrentIndex] = useState(0); // For image slider
  const [loading, setLoading] = useState(true); // Loading state

  const navigate = useNavigate();
  
  // Get the logged-in user's ID from local storage
  const userId = localStorage.getItem('user');

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    localStorage.removeItem('user_id'); // Clear user ID
    navigate('/login'); // Redirect to login
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        navigate('/login'); // Redirect to login if not logged in
        return;
      }

      try {
        console.log("Fetching data...");

        // Fetch common recommended food items
        const foodResponse = await fetch('/api/foods/recommended');
        const foodData = await foodResponse.json();
        const updatedItems = foodData.map(item => ({
          ...item,
          imageUrl: item.imageUrl.replace(/\\/g, '/'), // Normalize URL by replacing backslashes
        }));

        console.log('Common recommended food items fetched:', updatedItems); // Log the fetched items
        setFoodItems(updatedItems);

        // Fetch food stalls
        const stallResponse = await fetch('/api/foodstall');
        const stallData = await stallResponse.json();
        setFoodStalls(stallData);
        setRecommendedStalls(stallData.filter(stall => stall.rating >= 4.7)); // Recommended based on rating

        // Fetch user-specific recommendations based on the logged-in user
        const recommendationsResponse = await fetch(`/api/recommendation?user_id=${userId}`);
        const recommendationsData = await recommendationsResponse.json();
        console.log("here");
        console.log(recommendationsData);
        // Fetch food items related to user-specific recommendations
        const fetchedRecommendations = await Promise.all(
          recommendationsData.map(async (recommendation) => {
            const foodResponse = await fetch(`/api/foods/${recommendation.food_item_id}`);
           
            const foodItem = await foodResponse.json();
            console.log(foodItem);
            return {
              ...foodItem,
              score: recommendation.score,
              reason: recommendation.reason,
            };
          })
        );

        // Combine user-specific and common recommendations
        const combinedRecommendations = updatedItems.map(item => {
          const userRecommendation = fetchedRecommendations.find(rec => rec._id === item._id);
          return {
            ...item,
            // Use user score if available, otherwise fallback to common rating
            rating: userRecommendation ? userRecommendation.score : item.rating,
            reason: userRecommendation ? userRecommendation.reason : null,
          };
        });

        setRecommendedFeatures(combinedRecommendations);
        console.log('Recommended Features:', recommendedFeatures); // Add this line

        setLoading(false); // Data loaded
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, navigate]);

  // Image slider effect
  useEffect(() => {
    if (foodItems.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % foodItems.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [foodItems]);

  // Ensure index is within bounds
  const currentFoodItem = foodItems.length > 0 ? foodItems[currentIndex % foodItems.length] : null;

  if (loading) {
    return <p>Loading...</p>; // Show loading state until data is fetched
  }

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/">Foodie</a>
        </div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/categories">Categories</a>
          <a href="/menu">Menu</a>
          <a href="/stalls">Stalls</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <Link to="/reviews" className="reviews-icon">
            <i className="fa fa-star" aria-hidden="true"></i> Reviews
          </Link>
          <Link to="/filter" className="filter-icon">
            <i className="fa fa-filter" aria-hidden="true"></i> Filter
          </Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </nav>

      {/* Image Slider */}
      <div className="slider">
        <div className="slider-content">
          {currentFoodItem && (
            <>
              <img src={currentFoodItem.imageUrl} alt={currentFoodItem.name} />
              <div className="slider-info">
                <h3>{currentFoodItem.name}</h3>
                <p>{currentFoodItem.description}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <h2>Our Special Features</h2>
        <div className="features-grid">
          {recommendedFeatures.map((feature) => (
            <div key={feature._id} className="feature-item">
              <h3>{feature.name}</h3>
              <p>Rating: {feature.rating}</p>
              <p>{feature.description}</p>
              
              {/* Display reason if available */}
              {/* {feature.reason && <p>Reason: {feature.reason}</p>} */}
            </div>
          ))}
          
        </div>
      </section>

      {/* Recommended Food Stalls Section */}
      <section className="recommended-section">
        <h2>Recommended Food Stalls</h2>
        <div className="recommended-grid">
          {recommendedStalls.map((stall) => (
            <div key={stall._id} className="recommended-item">
              <h3>{stall.name}</h3>
              <p>Rating: {stall.rating}</p>
              <p>{stall.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Foodie. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
