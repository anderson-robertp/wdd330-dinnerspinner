const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const coords = '40.7128,-74.0060'; // New York City coordinates
const radius = 5000; // 5 km radius
const type = 'restaurant';

export async function fetchRestaurants() {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&radius=${radius}&type=${type}&key=${apiKey}`);
    const data = await response.json();
    return data.results;
}

export function pickRandomRestaurant(restaurants) {
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    return restaurants[randomIndex];
}

export async function displayRandomRestaurant() {
    try {
        const restaurants = await fetchRestaurants();
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


