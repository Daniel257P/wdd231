document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastmodified').textContent = ` ${document.lastModified}`;

const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});
