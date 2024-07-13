const axios = require('axios');

exports.handler = async function(event, context) {
    const apiKey = process.env.VITE_GOOGLE_PLACES_API_KEY;
    const address = event.queryStringParameters.address;
    const range = event.queryStringParameters.range;

    //const range = (rangeInput / 0.00062137).toFixed(0);

    if (!address || !range) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Address and range are required parameters' })
        };
    }

    try {
        // Geocode the address to get coordinates
        /*const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: address,
                key: apiKey
            }
        });

        if (geocodeResponse.data.status !== 'OK') {
            throw new Error('Error geocoding address');
        }

        const location = geocodeResponse.data.results[0].geometry.location;
        const coords = `${location.lat},${location.lng}`;*/
        const coords = address;

        // Fetch restaurants near the coordinates
        const placesResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: coords,
                radius: range,
                type: 'restaurant',
                key: apiKey
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(placesResponse.data.results)
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching restaurant data' })
        };
    }
};
