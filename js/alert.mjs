export function displayAlerts(message) {
    const main = document.querySelector("main");

    // Create alert section
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert");

    // Create alert message
    const alertMessage = document.createElement("p");
    alertMessage.textContent = message;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';

    // Add event listener to delete button
    deleteButton.addEventListener('click', () => {
        main.removeChild(alertSection);
    });

    // Append button to message, and message to section
    alertMessage.append(deleteButton);
    alertSection.append(alertMessage);

    // Append alert to main section
    main.prepend(alertSection);

    // Remove the alert after 5 seconds
    setTimeout(() => {
        if (alertSection.parentNode === main) {
            main.removeChild(alertSection);
        }
    }, 5000);
}