// Miles to kilometers
export function milesToMeters(miles) {
    const meters = (miles / 0.00062137);
    console.log(`Meters: ${meters}`);
    return meters.toFixed(0);
}
// Error Reporting

export function reportError(error) {
    const ul = document.getElementById("error-report");
    const li = document.createElement("li");
    li.textContent = `${error}`;
    ul.appendChild(li);
}