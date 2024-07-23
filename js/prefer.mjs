import { getLocalStorage, setLocalStorage, displayRestaurant } from "./utils.mjs";

export function setPreferences(type, restaurant) {
    const query = "so-" + type;
    let list = getLocalStorage(query) || [];
    list.push(restaurant); // 
    setLocalStorage(query, list); // Update local storage
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