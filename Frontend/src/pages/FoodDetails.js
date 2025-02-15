import React from 'react';
import { useParams } from 'react-router-dom';

const FoodDetails = () => {
  const { id } = useParams();
  // Here you would fetch the specific food item based on the ID from your API

  return (
    <div className="food-details">
      <h1>Food Details for {id}</h1>
      {/* Display food details */}
    </div>
  );
};

export default FoodDetails;
