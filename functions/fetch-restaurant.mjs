import fetch from 'node-fetch';

exports.handler = async function(event, context) {
    const apiKey = process.env.VITE_GOOGLE_PLACES_API_KEY;
    const coords = event.queryStringParameters.address;
    const range = event.queryStringParameters.range;
    const price = event.queryStringParameters.price;
    const rating = event.queryStringParameters.rating;

    //const range = (rangeInput / 0.00062137).toFixed(0);
    console.log(`Received parameters: address=${coords}, range=${range}, price=${price}, rating=${rating}`);

    if (!coords || !range) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Address and range are required parameters' })
        };
    }

    try {
        let googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&radius=${range}&type=restaurant&opennow=true&key=${apiKey}`;
        if (price !== 'any') {
            googlePlacesUrl += `&minprice=${price}&maxprice=${price}`;
        }

        console.log(`Google Places URL: ${googlePlacesUrl}`);

        const response = await fetch(googlePlacesUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        
        // Filter results by rating if provided
        if (rating !== 'any') {
            data.results = data.results.filter(place => place.rating >= rating);
        }

        console.log(`Fetched ${data.results.length} places`);

        return {
            statusCode: 200,
            body: JSON.stringify(data.results),
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        /* // Fetch restaurants near the coordinates
        const placesResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: coords,
                radius: range,
                type: 'restaurant',
                key: apiKey
                // add "opening_hours":{"open_now":true},
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
            body: JSON.stringify({ error: 'Error fetching restaurant data' })*/
        };
    }
};
