const levelInfo = [
    {
        title: "Gold Membership",
        price: "$750 / year",
        benefits: [
            "Premium directory listing with priority placement",
            "Featured spotlight on the Chamber homepage",
            "Complimentary booth at annual Chamber Expo",
            "Exclusive leadership roundtable access",
            "Priority sponsorship opportunities",
            "Unlimited ribbon‑cutting ceremonies",
            "Enhanced social media promotion (4 posts/year)",
            "Free admission to all networking events"
        ]
    },
    {
        title: "Silver Membership",
        price: "$450 / year",
        benefits: [
            "Enhanced directory listing with logo",
            "Invitations to all networking events",
            "Two complimentary event tickets per quarter",
            "Discounted booth pricing at Chamber Expo",
            "Social media welcome announcement",
            "Access to Chamber business workshops",
            "Member‑to‑member discount program",
            "Monthly newsletter feature"
        ]
    },
    {
        title: "Bronze Membership",
        price: "$250 / year",
        benefits: [
            "Standard directory listing",
            "Access to monthly networking mixers",
            "Discounted pricing for Chamber events",
            "Inclusion in the Chamber newsletter",
            "Eligibility for ribbon‑cutting ceremony",
            "Access to community business resources",
            "Member‑only email updates"
        ]
    },
    {
        title: "Non‑Profit Membership",
        price: "$0 / year",
        benefits: [
            "Basic directory listing",
            "Invitations to member networking events",
            "Monthly Chamber newsletter mention",
            "Access to community resource announcements",
            "Discounted event participation for staff",
            "Eligibility for community partnership programs",
            "Promotion during volunteer initiatives"
        ]
    }
];
document.addEventListener("DOMContentLoaded", () => {
    const now = new Date();
    document.querySelector("#timestamp").value = now.toISOString();
});

function showLevelModal(index) {
    const modal = document.querySelector("#level-details");
    const title = document.querySelector("#level-title");
    const text = document.querySelector("#level-text");

    const level = levelInfo[index];
    const benefitsHTML = level.benefits .map(b => `<li>${b}</li>`) .join("");
    title.textContent = level.title; text.innerHTML = ` 
    <p><strong>Price:</strong> ${level.price}</p> <h4>Benefits:</h4> <ul>${benefitsHTML}</ul> `;
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
            <button class="learn-btn" data-level="${i}">View benefits</button>
        `;

        container.appendChild(box);
    }

    joinLevel.appendChild(container);
}


displayMlevel(mlevel);

