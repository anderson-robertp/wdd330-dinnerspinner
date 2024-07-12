import { milesToMeters } from "./utils.mjs";

const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
//const coords = '40.7128,-74.0060'; // New York City coordinates for testing
//const radius = 5000; // 5 km radius for testing
const type = 'restaurant';
const corsProxy = 'https://cors-anywhere.herokuapp.com/';


async function fetchRestaurants(range , location) {
    const currentUrl = window.location.hostname;
    console.log(currentUrl);
    const coords = getCoordinates(location);
    console.log(`CoOrds: ${coords}`);
    const radius = milesToMeters(range);
    console.log(`Radius: ${radius}`)
    const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&radius=${radius}&type=${type}&key=${apiKey}`;
    console.log(googlePlacesUrl)
    const apiUrl = `${corsProxy}${googlePlacesUrl}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export function pickRandomRestaurant(restaurants) {
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    return restaurants[randomIndex];
}

export async function displayRandomRestaurant(range, location) {
    try {
        const restaurants = await fetchRestaurants(range, location);
        const randomRestaurant = pickRandomRestaurant(restaurants);
        document.getElementById('restaurant-info').innerHTML = `
            <h2>${randomRestaurant.name}</h2>
            <p>${randomRestaurant.vicinity}</p>
            <p>Rating: ${randomRestaurant.rating}</p>
            <a href="https://www.google.com/maps/search/?api=1&query=${randomRestaurant.name}&query_place_id=${randomRestaurant.place_id}" target="_blank">View on Google Maps</a>
        `;
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        document.getElementById('restaurant-info').innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
    }
}

// Convert Address to coordinates
export async function getCoordinates(address) {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            const coords = `${location.lat},${location.lng}`;
            return coords
            console.log(coords);
        } else {
            document.getElementById('result').textContent = `Error: ${data.status}`;
        }
    } catch (error) {
        console.error('Error fetching the coordinates:', error);
        document.getElementById('result').textContent = 'Error fetching the coordinates';
    }
    return coords;
}