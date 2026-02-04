const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebar = document.querySelector(".sidebar");

hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".sidebar a").forEach(link => { 
    link.addEventListener("click", () => { 
        sidebar.classList.remove("open"); 
        document.body.classList.remove("menu-open"); }); 
    });


const circles = document.querySelectorAll(".color");

circles.forEach(circle => {
  circle.addEventListener("click", () => {
    const color = circle.getAttribute("data-color");

    navigator.clipboard.writeText(color);

    circle.classList.add("show-tooltip");

    setTimeout(() => {
      circle.classList.remove("show-tooltip");
    }, 1500);
  });
});

const accordions = document.querySelectorAll(".accordion-header");

accordions.forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    const arrow = header.querySelector(".arrow");

    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";

    arrow.style.transform = arrow.style.transform === "rotate(180deg)" 
      ? "rotate(0deg)" 
      : "rotate(180deg)";
  });
});
