
const buttons = document.querySelectorAll(".display-method button");
const directory = document.getElementById("directory");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        let list = button.innerText === "List";
        directory.classList.toggle("directory-list", list);
        directory.classList.toggle("directory-grid", !list);
    });
});

function displayItem(item) {
    const div = document.createElement("div");
    div.classList.add("card");

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image");

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;

    imageDiv.appendChild(img);

    const infoDiv = document.createElement("div");

    const h2 = document.createElement("h2");
    h2.innerText = item.name;

    const addressP = document.createElement("p");
    addressP.innerText = item.address;

    const phoneP = document.createElement("p");
    phoneP.innerText = item.phone;

    const websiteP = document.createElement("a");
    websiteP.innerText = item.website;
    websiteP.href = item.website;

    infoDiv.appendChild(h2);
    infoDiv.appendChild(addressP);
    infoDiv.appendChild(phoneP);
    infoDiv.appendChild(websiteP);

    div.appendChild(imageDiv);
    div.appendChild(infoDiv);
    
    directory.appendChild(div);
}

fetch("data/members.json").then(async result => {
    const json = await result.json();
    json.companies.forEach(displayItem);
});
