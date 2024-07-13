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
