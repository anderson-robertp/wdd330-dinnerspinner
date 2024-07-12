async function fetchRestaurants(address, range) {
    try {
        const response = await fetch(`/.netlify/functions/fetch-restaurants?address=${encodeURIComponent(address)}&range=${range}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}