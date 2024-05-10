import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Attractions.css"; // Importing the CSS file

function Attractions() {
  const [city, setCity] = useState("St. Louis"); // Default city
  const [attractions, setAttractions] = useState([]);
  const navigate = useNavigate();

  // This function fetches data from the API
  const fetchAttractions = async () => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist+attractions+in+${city}&key=AIzaSyDiMzu2oQlbnbJCuMhA5Jami0mcXsZoi8s`;
    try {
      const response = await axios.get(url);
      setAttractions(response.data.results.slice(0, 9)); // Assuming 'results' contains the attractions
    } catch (error) {
      console.error("Failed to fetch attractions:", error);
    }
  };

  // useEffect to call fetchAttractions when the component mounts
  useEffect(() => {
    fetchAttractions();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchAttractions(); // Call the same function used in useEffect
  };

  return (
    <div>
      <h1>Search for Tourist Attractions</h1>
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
        {attractions.map((attraction, index) => (
          <div
            key={index}
            className="card"
            onClick={() => navigate(`/attraction/${attraction.place_id}`)}
          >
            <img
              src={
                attraction.photos
                  ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${attraction.photos[0].photo_reference}&key=AIzaSyDiMzu2oQlbnbJCuMhA5Jami0mcXsZoi8s`
                  : "placeholder.jpg"
              }
              alt={attraction.name}
            />
            <h3>{attraction.name}</h3>
            <p>{attraction.formatted_address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attractions;
