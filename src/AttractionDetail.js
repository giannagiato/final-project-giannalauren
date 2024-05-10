import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './attractionDetail.css'; // Importing the CSS file
import './Attractions.css'; 

function AttractionDetail() {
  const { id } = useParams(); // `id` here is the place_id from Google Places
  const [attraction, setAttraction] = useState(null);

  useEffect(() => {
    const fetchAttraction = async () => {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,formatted_address,formatted_phone_number,photo,reviews,rating,website,url&key=AIzaSyDiMzu2oQlbnbJCuMhA5Jami0mcXsZoi8s`;
      try {
        const response = await axios.get(url);
        setAttraction(response.data.result); // Assuming 'result' contains the detailed information
      } catch (error) {
        console.error("Failed to fetch attraction details:", error);
      }
    };

    fetchAttraction();
  }, [id]);

  if (!attraction) return <div>Loading...</div>;

  return (
    <div className="attraction-detail-container">
      <img
        src={
          attraction.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${attraction.photos[0].photo_reference}&key=AIzaSyDiMzu2oQlbnbJCuMhA5Jami0mcXsZoi8s`
            : "placeholder.jpg"
        }
        alt={attraction.name}
      />
      <div className="attraction-details">
        <h1>{attraction.name}</h1>
        <p>{attraction.formatted_address}</p>
        <p>{attraction.formatted_phone_number}</p>
        {attraction.rating && <p>Rating: {attraction.rating} / 5</p>}
        {attraction.website && (
          <p>
            <a
              href={attraction.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </p>
        )}
        {attraction.url && (
          <p>
            <a href={attraction.url} target="_blank" rel="noopener noreferrer">
              More Info
            </a>
          </p>
        )}
      </div>
      <h3>Reviews:</h3>
      {attraction.reviews ? (
        <ul>
          {attraction.reviews.slice(0, 3).map((review, index) => (
            <li key={index}>
              <p>
                <strong>{review.author_name}</strong>: {review.text}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default AttractionDetail;
