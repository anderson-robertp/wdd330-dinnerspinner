export async function popUp(h,m) {
    // h=heading m=message
    const popup = document.getElementById('popup');
    const header = document.getElementById('popup-header');
    const message = document.getElementById('popup-message');
    const closeBtn = document.querySelector('.popup .close');

    header.textContent = `${h}`

    message.textContent = `${m}`

    function showPopup() {
        popup.style.display = 'flex';
    }

    function closePopup() {
        popup.style.display = 'none';
    }

    closeBtn.addEventListener('click', closePopup);
}