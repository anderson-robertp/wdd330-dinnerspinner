export function displayAlerts (error) {
    const main = document.querySelector("main");
    let section = document.createElement("section");
    
    let p = document.createElement("p");
    p.textContent = `${error}`;

    const deleteButton = document.createElement('button');    
    deleteButton.textContent = '❌';
    p.append(deleteButton);
    deleteButton.addEventListener('click', function() {
        section.removeChild(p);
    });        

    section.append(p);

    main.prepend(section);
}