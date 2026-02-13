document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastmodified').textContent = ` ${document.lastModified}`;

const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();
    const navItems = document.querySelectorAll(".navigation ul li a");

    navItems.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.parentElement.classList.add("current");
        }
    });
});
