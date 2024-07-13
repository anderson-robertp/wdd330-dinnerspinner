import { milesToMeters, reportError } from "./utils.mjs";

const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const type = 'restaurant'; // Fixed typo
const corsProxy = 'https://cors-anywhere.herokuapp.com/';

// Fetch restaurants based on range and location
async function fetchRestaurants(range, location) {
    const currentUrl = window.location.hostname;
    console.log(`Current URL: ${currentUrl}`);
    const coords = await getCoordinates(location);
    const radius = milesToMeters(range);
    console.log(`Coordinates: ${coords}`);
    console.log(`Radius: ${radius}`);

    if (currentUrl === "localhost") {
        const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&radius=${radius}&type=${type}&key=${apiKey}`;
        console.log(`Google Places URL: ${googlePlacesUrl}`);
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
            reportError(`Fetch Restaurant: ${error}`);
            throw error;
        }
    } else {
        try {
            const response = await fetch(`/.netlify/functions/fetch-restaurant?address=${coords}&range=${radius}`);
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