import { displayRandomRestaurant } from "./js/externalServices.mjs";
import { loadHeaderFooter } from "./js/utils.mjs";

let slider = document.getElementById("myRange");
let output = document.getElementById("range-display");
let range = 10;
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

document.getElementById('random-button').addEventListener('click', function(event){
    event.preventDefault();
    // Get Address
    const address = document.getElementById('address').value;
    // Get Range
    const range = slider.value;
    // Get Price
    const price = document.querySelector('input[name="price"]:checked').value;
    // Get Rating
    const rating = document.querySelector('input[name="rating"]:checked').value;
    // Display
    displayRandomRestaurant(range, address);
});

loadHeaderFooter();
/*document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('app').innerHTML = `
        <button id="random-button">Pick a Random Restaurant</button>
        <div id="restaurant-info"></div>
    `;
});*/

