const levelInfo = [
    {
        title: "Gold Membership",
        text: "Access to premium benefits, top-tier visibility, and exclusive Chamber events."
    },
    {
        title: "Silver Membership",
        text: "Great value membership with solid benefits and networking opportunities."
    },
    {
        title: "Bronze Membership",
        text: "Entry-level membership ideal for small businesses and startups."
    },
    {
        title: "Non‑Profit Membership",
        text: "Special membership tier for community organizations and non-profits."
    }
];

function showLevelModal(index) {
    const modal = document.querySelector("#level-details");
    const title = document.querySelector("#level-title");
    const text = document.querySelector("#level-text");

    title.textContent = levelInfo[index].title;
    text.textContent = levelInfo[index].text;

    modal.showModal();
}

document.querySelector("#level-close").addEventListener("click", () => {
    document.querySelector("#level-details").close();
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("learn-btn")) {
        const index = e.target.dataset.level;
        showLevelModal(index);
    }
});



function displayMlevel(mlevel){
    const joinLevel = document.querySelector('#mlevel'); 
    joinLevel.innerHTML = "";  

    const container = document.createElement("div");
    container.classList.add("card-level");

    const levels = [
        "Gold Membership",
        "Silver Membership",
        "Bronze Membership",
        "Non‑Profit Membership"
    ];

    for (let i = 0; i < levels.length; i++) {
        const box = document.createElement("div");
        box.classList.add("level-box");

        box.innerHTML = `
            <h3 class="level-title">${levels[i]}</h3>
            <button class="learn-btn" data-level="${i}">
                Learn More
            </button>
        `;

        container.appendChild(box);
    }

    joinLevel.appendChild(container);
}


displayMlevel(mlevel);

