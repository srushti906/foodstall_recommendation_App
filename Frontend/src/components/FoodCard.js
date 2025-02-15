// src/components/FoodCard.js
import React from 'react';
import './FoodCard.css';

const FoodCard = ({ name, rating, image, description }) => {
  return (
    <div className="food-grid-item">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Rating: {rating} ★</p>
    </div>
  );
};

export default FoodCard;
