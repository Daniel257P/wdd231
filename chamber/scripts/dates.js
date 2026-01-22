document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastmodified').textContent = ` ${document.lastModified}`;


async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

        // Filter only Gold (3) and Silver (2)
        const qualified = data.companies.filter(company =>
        company.membership === "Gold" || company.membership === "Silver"
            );
        // Randomize the list
        const shuffled = qualified.sort(() => 0.5 - Math.random());

        // Pick 2 or 3 members
        const spotlightCount = Math.floor(Math.random() * 2) + 2; // gives 2 or 3
        const selected = shuffled.slice(0, spotlightCount);

        // Get the spotlight container
        const spotlightContainer = document.querySelector("#spotlights");

        selected.forEach(member => {
            const card = document.createElement("article");
            card.classList.add("spotlight-card");
            const name = document.createElement("h2");
            const contentDiv = document.createElement("div");
            const img = document.createElement("img");
            const textDiv = document.createElement("div");
            const phone = document.createElement("p");
            const address = document.createElement("p");
            const link = document.createElement("a");


            img.alt = member.name;
            contentDiv.classList.add("spotlight-content");
            img.src = member.image;
            name.textContent = member.name;
            textDiv.classList.add("spotlight-text");
            phone.textContent = `Phone: ${member.phone}`;
            address.textContent = `Address: ${member.address}`;
            link.href = member.website;
            link.target = "_blank";
            link.textContent = "Visit Website";

            textDiv.appendChild(phone);
            textDiv.appendChild(address);
            textDiv.appendChild(link);

            contentDiv.appendChild(img);
            contentDiv.appendChild(textDiv);

            card.appendChild(name);
            card.appendChild(contentDiv);
            
            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading spotlight members:", error);
    }
}

loadSpotlights();







