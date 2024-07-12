import { displayRandomRestaurant } from "./js/externalServices.mjs";

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
    const address = document.getElementById('address').value;
    const range = slider.value;
    displayRandomRestaurant(range, address);
});

/*document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('app').innerHTML = `
        <button id="random-button">Pick a Random Restaurant</button>
        <div id="restaurant-info"></div>
    `;
});*/

