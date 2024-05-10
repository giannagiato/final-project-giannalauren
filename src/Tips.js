import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Attractions.css"; // Assuming you want to use the same CSS file

function Restaurants() {
  const [city, setCity] = useState("St. Louis"); // Set default city to St. Louis
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  // Function to fetch restaurants
  const fetchRestaurants = async () => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${city}&key=AIzaSyDiMzu2oQlbnbJCuMhA5Jami0mcXsZoi8s`;
    try {
      const response = await axios.get(url);
      setRestaurants(response.data.results.slice(0, 9)); // Show only the top 10 results
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchRestaurants(); // Call the fetch function on form submission as well
  };

  return (
    <div>
      <h1>Search for Restaurants</h1>
      <form onSubmit={handleSearch} className="form-style">
        <input
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-style"
        />
        <button type="submit" className="button-style">
          Search
        </button>
      </form>
      <div className="grid">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className="card"
            onClick={() => navigate(`/restaurants/${restaurant.place_id}`)}
          >
            <img
              src={
                restaurant.photos
                  ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=AIzaSyDiMzu2oQlbnbJCuMhA5Jami0mcXsZoi8s`
                  : "placeholder.jpg"
              }
              alt={restaurant.name}
            />
            <h3>{restaurant.name}</h3>
            <p>{restaurant.formatted_address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
