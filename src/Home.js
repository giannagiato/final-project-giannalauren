import React from 'react';
import './home.css';

//Travel images
async function fetchTravelImages() {
  const accessKey = "ROecJVFlyVv9hK6IyuRQ_ZQYD1srp8mPhNvyCD6Oesk";
  const response = await fetch(`https://api.unsplash.com/search/photos?query=travel&client_id=${accessKey}`);
  const data = await response.json();
  return data.results;
}

async function displayTravelImages() {
  const travelImages = await fetchTravelImages();
  const travelImagesContainer = document.getElementById('travelImages');

  travelImages.forEach((image) => {
      const img = document.createElement('img');
      img.src = image.urls.regular;
      img.alt = image.alt_description;
      travelImagesContainer.appendChild(img);
  });
}

displayTravelImages();

//STL images
async function fetchStLouisImages() {
  const accessKey = "ROecJVFlyVv9hK6IyuRQ_ZQYD1srp8mPhNvyCD6Oesk";
  const response = await fetch(`https://api.unsplash.com/search/photos?query=st+louis&client_id=${accessKey}`);
  const data = await response.json();
  return data.results;
}

async function displayStLouisImages() {
  const stLouisImages = await fetchStLouisImages();
  const stLouisImagesContainer = document.getElementById('stLouisImages');

  stLouisImages.forEach((image) => {
      const img = document.createElement('img');
      img.src = image.urls.regular;
      img.alt = image.alt_description;
      stLouisImagesContainer.appendChild(img);
  });
}

displayStLouisImages();

function Home() {
  return (
    <div className='main'>

    <h1>Welcome to Tourist Guide</h1>
    <div id="travelImages" className="image-gallery"></div>
    <h2>About</h2>
    <p>At Tourist Guide, we are passionate about travel and exploration. Our mission is to help you make the most of your travels by suggesting attractions and restaurants and providing detailed information on their contact, rating, address, price, etc. We aim to be your ultimate travel companion.</p>
    <h2>How to Use This Site</h2>
    <p>Begin your adventure by navigating to "Attractions" or "Restaurants." In the search bar, enter a place -- a city, region, or country -- and we will provide you with a list of must-see attractions and hidden gems waiting to be discovered. Whether you're a history buff, a foodie, or an outdoor enthusiast, Tourist Guide has something for everyone!</p>
    <h2>Travel Tips</h2>
    <ul>
        <li><strong>Pack Light:</strong> Only bring the essentials to avoid carrying heavy luggage.</li>
        <li><strong>Research Local Customs:</strong> Learn about the local culture and customs to show respect while traveling.</li>
        <li><strong>Stay Hydrated:</strong> Drink plenty of water, especially in hot climates, to stay healthy.</li>
        <li><strong>Use Local Transportation:</strong> Explore the area like a local by using public transportation.</li>
        <li><strong>Stay Safe:</strong> Be aware of your surroundings and take precautions to ensure your safety.</li>
        <li><strong>Learn Basic Phrases:</strong> Learn a few basic phrases in the local language to communicate with locals.</li>
        <li><strong>Keep Important Documents Safe:</strong> Store your passport, tickets, and other important documents in a secure place.</li>
        <li><strong>Respect the Environment:</strong> Leave no trace and respect the environment and wildlife.</li>
        <li><strong>Stay Connected:</strong> Keep your loved ones informed about your whereabouts and stay connected with them.</li>
        <li><strong>Enjoy the Moment:</strong> Take time to relax and enjoy the experience, rather than rushing from one place to another.</li>
    </ul>
    <h2>Featured Destination: St. Louis, MO</h2>
    <div id="stLouisImages" className="image-gallery"></div>
            <h3>Attractions</h3>
            <p>St. Louis offers a variety of attractions for visitors to explore. The iconic Gateway Arch is a must-see, offering breathtaking views of the city from its observation deck. For nature lovers, the St. Louis Zoo is a top destination, known for its conservation efforts and wide array of animal exhibits. Another unique attraction is the City Museum, a surreal playground featuring caves, slides, and architectural marvels, making it fun for all ages.</p>
            <h3>Restaurants</h3>
            <p>When it comes to dining, St. Louis has a diverse culinary scene to satisfy every palate. For a taste of the city's famous barbecue, head to Pappy's Smokehouse or Bogart's Smokehouse. For a more upscale experience, try Sidney Street Cafe, known for its innovative cuisine and elegant ambiance. For those seeking international flavors, St. Louis offers a variety of options, from Italian at Charlie Gitto's to Mexican at Mission Taco Joint. Whether you're looking for a casual meal or a fine dining experience, St. Louis has something for everyone.</p>
  </div>

  );
}

export default Home;

document.addEventListener('DOMContentLoaded', () => {
  displayStLouisImages();
  displayTravelImages();
});