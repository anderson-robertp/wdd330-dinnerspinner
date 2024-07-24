import { displayRandomRestaurant } from "./js/externalServices.mjs";
import { loadHeaderFooter, setLocalStorage } from "./js/utils.mjs";
import { setPreferences } from "./js/prefer.mjs";
import { displayAlerts } from "./js/alert.mjs";

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
    displayRandomRestaurant(range, address, price, rating);
    const prefer = document.getElementById('smash-pass');
    prefer.style.display = "flex"

});

document.getElementById('smash').addEventListener('click', function(event){
    const restaurant = document.getElementById('restaurant-name').textContent;
    setPreferences("like",restaurant);
    displayAlerts("Added to you list of likes.");
});

document.getElementById('pass').addEventListener('click', function(event){
    const restaurant = document.getElementById('restaurant-name').textContent;
    setPreferences("dislike",restaurant);
    displayAlerts("Added to you list of dislikes.");
});

document.getElementById('reset').addEventListener('click', function(event){
    document.getElementById('address').value = '';
    slider.value = 10;
    document.querySelector('input[id="any-price"]:checked').value = "checked";
    document.querySelector('input[name="any-rating"]:checked').value = "checked";
    setLocalStorage("so-restaurants","");
});

loadHeaderFooter();
/*document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('app').innerHTML = `
        <button id="random-button">Pick a Random Restaurant</button>
        <div id="restaurant-info"></div>
    `;
});*/

