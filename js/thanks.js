import { loadHeaderFooter,getParam } from "./utils.mjs";

loadHeaderFooter()

document.addEventListener("DOMContentLoaded", function() {
    const firstName = getParam("firstName");
    const lastName = getParam("lastName");
    const email = getParam("email");
    const main = document.querySelector("#thanks");

    console.log("Main element:", main);
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    
    if (main && firstName && lastName && email) {
        const div = document.createElement("div");
        div.innerHTML = `
            <h2>Thank you ${firstName} ${lastName} for registering!</h2>
            <p>Your username is ${email}</p>
        `;
        main.appendChild(div);
    }
});