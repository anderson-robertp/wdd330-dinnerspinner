// Convert miles to meters
export function milesToMeters(miles) {
    // 1 mile = 1609.34 meters
    const meters = miles * 1609.34;
    console.log(`Meters: ${meters}`);
    return Math.round(meters); // Use Math.round to get an integer value
}

// Report errors to a specified element
export function reportError(error) {
    const ul = document.getElementById("error-report");
    if (!ul) {
        console.error('Error report element not found');
        return;
    }
    
    const li = document.createElement("li");
    li.textContent = error ? error : "Unknown error"; // Improved error message handling
    ul.appendChild(li);
}

// Filter by price point

// Filter by rating

export async function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true) {
    if (clear){
      parentElement.innerHtml = "";
    }
  
    const html = await templateFn();
  
    parentElement.insertAdjacentHTML(position, html);
    if (callback) {
      callback(data);
    }
  }

  export async function loadHeaderFooter() {
    const headerTemplateFn = loadTemplate("/partials/header.html");
    const footerTemplateFn = loadTemplate("/partials/footer.html");
    let mainHeader = document.querySelector("header");
    let mainFooter = document.querySelector("footer");
  
    await renderWithTemplate(headerTemplateFn, mainHeader);
    await renderWithTemplate(footerTemplateFn, mainFooter);
  }

  // retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  // save data to local storage
  export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function loadTemplate(path) {
    return async function() {
      const res = await fetch(path);
      if (res.ok) {
        const html = await res.text();
        return html;
      }
    };
  }

  // Get Parameter
  export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const term = urlParams.get(param) 
    return term;
  }

  export function displayRestaurant(element,restaurant) {
    const div = document.createElement("div");
    div.classList.add("rest-card");
    div.innerHTML = `
            <h2 id="restaurant-name">${restaurant.name}</h2>
            <p>${restaurant.vicinity}</p>
            <p>Rating: ${restaurant.rating}</p>
            <a href="https://www.google.com/maps/search/?api=1&query=${restaurant.name}&query_place_id=${restaurant.place_id}" target="_blank">View on Google Maps</a>`;
    element.appendChild(div);
  }