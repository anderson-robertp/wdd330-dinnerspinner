import { getLocalStorage, setLocalStorage, milesToMeters, reportError, displayRestaurant } from "./utils.mjs";
import { displayAlerts } from "./alert.mjs";

const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
//const type = 'restaurant'; // Fixed typo
//const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const baseURL = import.meta.env.VITE_SERVER_URL;

// Fetch restaurants based on range and location
async function fetchRestaurants(range, location, price, rating) {
    const currentUrl = window.location.hostname;
    console.log(`Current URL: ${currentUrl}`);
    const coords = await getCoordinates(location);
    const radius = milesToMeters(range);
    //console.log(`Coordinates: ${coords}`);
    //console.log(`Radius: ${radius}`);
    //console.log(`Received parameters: address=${coords}, range=${radius}, price=${price}, rating=${rating}`)
    
    try {
        //console.log("Googling restautants");
        const response = await fetch(`/.netlify/functions/fetch-restaurant?address=${coords}&range=${radius}&price=${price}&rating=${rating}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        displayAlerts(`Netlify Fetch: ${error}`);
        throw error;
    }
}


// Pick a random restaurant from the list
export function pickRandomRestaurant(restaurants) {
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    return restaurants[randomIndex];
}

// Display a randomly picked restaurant
export async function displayRandomRestaurant(range, location, price, rating) {
    const localStorage = getLocalStorage("so-restaurants");
    if (localStorage.length === 0) {
        try {
            console.log("Picking a restaurant from google.")
            const restaurants = await fetchRestaurants(range, location, price, rating);
            setLocalStorage("so-restaurants",restaurants)
            const randomRestaurant = pickRandomRestaurant(restaurants);
            const element = document.getElementById('restaurant-info');
            displayRestaurant(element,randomRestaurant);
            displayAlerts("Picked from Google.")
        } catch (error) {
            console.error('Error fetching restaurant data:', error);
            displayAlerts(`Random: ${error}`);
            document.getElementById('restaurant-info').innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
        }
    } else {
        console.log("Picking a restaurant form local storage");
        const element = document.getElementById('restaurant-info');
        const randomRestaurant =pickRandomRestaurant(localStorage);
        displayRestaurant(element, randomRestaurant);
        displayAlerts("Restaurant Picked from Local Storage");
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
    return await fetch(baseURL + "login", options).then(convertToJson);
  }

  async function convertToJson(res) {
    const jsonResponse = await res.json();
    
    if (res.ok) {
      return jsonResponse;
    } else {
      console.log("test " + jsonResponse);
      //throw { name: "servicesError", message: jsonResponse };
      displayAlerts(jsonResponse);
    }
  }