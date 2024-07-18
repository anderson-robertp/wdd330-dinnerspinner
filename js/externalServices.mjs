import { milesToMeters, reportError } from "./utils.mjs";

const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const type = 'restaurant'; // Fixed typo
const corsProxy = 'https://cors-anywhere.herokuapp.com/';

// Fetch restaurants based on range and location
async function fetchRestaurants(range, location, price, rating) {
    const currentUrl = window.location.hostname;
    console.log(`Current URL: ${currentUrl}`);
    const coords = await getCoordinates(location);
    const radius = milesToMeters(range);
    //console.log(`Coordinates: ${coords}`);
    //console.log(`Radius: ${radius}`);
    console.log(`Received parameters: address=${coords}, range=${radius}, price=${price}, rating=${rating}`);

    if (currentUrl === "notlocalhost") {
        const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&radius=${radius}&type=${type}&key=${apiKey}&opennow=true`;
        console.log(`Google Places URL: ${googlePlacesUrl}`);
        const priceParam = price !== 'any' ? `&minprice=${price}&maxprice=${price}` : '';
        const apiUrl = `${corsProxy}${googlePlacesUrl}${priceParam}`;

        console.log(`${apiUrl}`);

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

             // Filter results by rating if provided
             if (rating !== 'any') {
                data.results = data.results.filter(place => place.rating >= rating);
            }
            console.log(`Fetched ${data.results.length} places`);
            return data.results;
        } catch (error) {
            console.error('Error fetching data:', error);
            reportError(`Fetch Restaurant: ${error}`);
            throw error;
        }
    } else {
        try {
            const response = await fetch(`/.netlify/functions/fetch-restaurant?address=${coords}&range=${radius}&price=${price}&rating=${rating}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            reportError(`Netlify Fetch: ${error}`);
            throw error;
        }
    }
}

// Pick a random restaurant from the list
export function pickRandomRestaurant(restaurants) {
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    return restaurants[randomIndex];
}

// Display a randomly picked restaurant
export async function displayRandomRestaurant(range, location, price, rating) {
    try {
        const restaurants = await fetchRestaurants(range, location, price, rating);
        const randomRestaurant = pickRandomRestaurant(restaurants);
        document.getElementById('restaurant-info').innerHTML = `
            <h2>${randomRestaurant.name}</h2>
            <p>${randomRestaurant.vicinity}</p>
            <p>Rating: ${randomRestaurant.rating}</p>
            <a href="https://www.google.com/maps/search/?api=1&query=${randomRestaurant.name}&query_place_id=${randomRestaurant.place_id}" target="_blank">View on Google Maps</a>
        `;
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        reportError(`Random: ${error}`);
        document.getElementById('restaurant-info').innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
    }
}

// Convert address to coordinates
export async function getCoordinates(address) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            const coords = `${location.lat},${location.lng}`;
            console.log(`Coordinates: ${coords}`);
            return coords;
        } else {
            console.error(`Error: ${data.status}`);
            document.getElementById('result').textContent = `Error: ${data.status}`;
        }
    } catch (error) {
        console.error('Error fetching the coordinates:', error);
        reportError(`Coordinates: ${error}`);
    }
    return null; // Ensure a return value in case of error
}

// Login request
export async function loginRequest(creds) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    };
    return await fetch(baseURL + "/login", options).then(convertToJson);
  }