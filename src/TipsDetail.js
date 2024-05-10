import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RestaurantDetail() {
  const { id } = useParams();  // `id` here is the place_id from Google Places
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,formatted_address,formatted_phone_number,photo,reviews,rating,website,url&key=AIzaSyDiMzu2oQlbnbJCuMhA5Jami0mcXsZoi8s`;
      try {
        const response = await axios.get(url);
        setRestaurant(response.data.result);  // Assuming 'result' contains the detailed information
      } catch (error) {
        console.error('Failed to fetch restaurant details:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <img src={restaurant.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=AIzaSyDiMzu2oQlbnbJCuMhA5Jami0mcXsZoi8s` : 'placeholder.jpg'} alt={restaurant.name} />
      <p>{restaurant.formatted_address}</p>
      <p>{restaurant.formatted_phone_number}</p>
      {restaurant.rating && <p>Rating: {restaurant.rating} / 5</p>}
      {restaurant.website && <p><a href={restaurant.website} target="_blank" rel="noopener noreferrer">Website</a></p>}
      {restaurant.url && <p><a href={restaurant.url} target="_blank" rel="noopener noreferrer">More Info</a></p>}
      <h3>Reviews:</h3>
      {restaurant.reviews ? (
        <ul>
          {restaurant.reviews.slice(0, 3).map((review, index) => (
            <li key={index}>
              <p><strong>{review.author_name}</strong>: {review.text}</p>
            </li>
          ))}
        </ul>
      ) : <p>No reviews available.</p>}
    </div>
  );
}

export default RestaurantDetail;
