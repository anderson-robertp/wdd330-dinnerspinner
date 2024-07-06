import { displayRandomRestaurant } from "./js/externalServices.mjs";

document.getElementById('random-button').addEventListener('click', displayRandomRestaurant);

/*document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('app').innerHTML = `
        <button id="random-button">Pick a Random Restaurant</button>
        <div id="restaurant-info"></div>
    `;
});*/