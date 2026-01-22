 const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});

function updateText() {
  const title = document.getElementById('heroTitle');
  const subtitle = document.getElementById('heroSubtitle')
  if (window.innerWidth <= 600) {
    title.textContent = "Welcome to Jarrell";
    subtitle.textContent = "Resources, connections, and more"
  } else {
    title.textContent = "Grow Your Business in Jarrell"
    subtitle.textContent = "Resources, connections, and support for local business."
  }
}

updateText();
window.addEventListener("resize", updateText);