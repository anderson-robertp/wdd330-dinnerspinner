import { getLocalStorage, setLocalStorage, displayRestaurant } from "./utils.mjs";

export function setPreferences(type, restaurant) {
    const query = "so-" + type;
    let list = getLocalStorage(query) || [];
    const restaurants = getLocalStorage("so-restaurants");
    let filtered = restaurants.filter(element => {
        return element.name == restaurant
    })
    for (let index = 0; index < filtered.length; index++) {
        const element = filtered[index];
        list.push(element);
    } // 
    setLocalStorage(query,list); // Update local storage
}

export function displayPreferences(type) {
    const query = "so-" + type;
    let list = getLocalStorage(query) || [];
    const element = document.getElementById(type);

    if (element) { // Check if element exists
        list.forEach(restaurant => {
            displayRestaurant(element, restaurant); // 
        });
    } else {
        console.error(`Element with id "${type}" not found.`);
        
    }
}