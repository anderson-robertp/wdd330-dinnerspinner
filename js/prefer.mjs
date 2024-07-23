import { getLocalStorage, setLocalStorage, displayRestaurant } from "./utils.mjs";

export function setPreferences(type, restaurant){
    const query = "so-" + type;
    let list = getLocalStorage(query) || [];
    list.append(restaurant);
    setLocalStorage(query, list);
}

export function displayPreferences(type) {
    const query = "so-" + type;
    let list = getLocalStorage(query) || [];
    const element = document.getElementById(type);
    list.forEach(i => {
        displayRestaurant(element,i);
    });
}