
const buttons = document.querySelectorAll(".display-method button");
const directory = document.getElementById("directory");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");

        const list = button.innerText === "List";

        directory.classList.toggle("directory-list", list);
        directory.classList.toggle("directory-grid", !list);

        document.querySelector(".display-method")
                .classList.toggle("list-active", list);
    });
});


function displayItem(companies) {
    const container = document.createElement("div");
    const imageContainer = document.createElement("div");
    const img = document.createElement("img");
    const infocontainer = document.createElement("div");
    const h2 = document.createElement("h2");
    const addressP = document.createElement("p");
    const phoneP = document.createElement("p");
    const websiteP = document.createElement("a");


    container.classList.add("card");
    imageContainer.classList.add("images");
    img.src = companies.image;
    img.alt = companies.name;
    img.loading = "lazy";
    img.width = 340;
    img.height = 180;
    h2.innerText = companies.name;
    addressP.innerText = companies.address;
    phoneP.innerText = companies.phone;
    websiteP.innerText = "Visit Website";
    websiteP.href = companies.website;


    imageContainer.appendChild(img);
    infocontainer.appendChild(h2);
    infocontainer.appendChild(addressP);
    infocontainer.appendChild(phoneP);
    infocontainer.appendChild(websiteP);
    container.appendChild(imageContainer);
    container.appendChild(infocontainer);
    directory.appendChild(container);
}

fetch("data/members.json").then(async result => {
    const json = await result.json();
    json.companies.forEach(displayItem);
});
