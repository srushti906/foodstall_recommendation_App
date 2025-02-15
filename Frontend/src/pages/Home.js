import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import RecommendedDishes from '../components/RecommendedDishes';

const Home = () => {
  const [dishes, setDishes] = useState([
    { id: 1, name: 'Pizza', description: 'Delicious cheese pizza', image: '/images/pizza.jpg', rating: 4.5 },
    { id: 2, name: 'Burger', description: 'Juicy beef burger', image: '/images/burger.jpg', rating: 4.2 },
    // Add more dishes as needed
  ]);

  const [filteredDishes, setFilteredDishes] = useState(dishes);

  const handleSearch = (query) => {
    const filtered = dishes.filter((dish) =>
      dish.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDishes(filtered);
  };

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      <RecommendedDishes dishes={filteredDishes} />
    </div>
  );
};

export default Home;
