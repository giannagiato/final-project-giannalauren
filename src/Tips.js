import React, { useState } from 'react';
import axios from 'axios';

function Restaurants() {
  const [city, setCity] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // Adjust the query to search for restaurants in the specified city
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${city}&key=AIzaSyDiMzu2oQlbnbJCuMhA5Jami0mcXsZoi8s`;

    try {
      const response = await axios.get(url);
      // Assuming 'results' contains the list of restaurants
      setRestaurants(response.data.results.slice(0, 9)); // Show only the top 10 results
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    }
  };

  return (
    <div>
      <h1>Search for Restaurants</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="grid">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="card">
            <img src={restaurant.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=AIzaSyDiMzu2oQlbnbJCuMhA5Jami0mcXsZoi8s` : 'placeholder.jpg'} alt={restaurant.name} />
            <h3>{restaurant.name}</h3>
            <p>{restaurant.formatted_address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
