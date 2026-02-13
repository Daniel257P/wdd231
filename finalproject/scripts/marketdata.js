import { depinProjects } from "../data/content.mjs";

const mainContainer = document.querySelector("#market-sectors");

async function loadMarketData() {
    try {
        const ids = depinProjects.map(p => p.id).join(",");
        const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`;

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("CoinGecko request failed");

        const marketData = await response.json();

        const combined = depinProjects.map(project => {
            const cg = marketData.find(m => m.id === project.id);

            return {
                ...project,
                market_cap: cg?.market_cap ?? 0,
                price: cg?.current_price ?? 0,
                image: cg?.image ?? ""
            };
        });

        const grouped = groupBySector(combined);
        renderSectors(grouped);

    } catch (error) {
        console.error("Error loading market data:", error);
        mainContainer.innerHTML = "<p>Error loading market data.</p>";
    }
}

function groupBySector(projects) {
    const sectors = {};

    projects.forEach(p => {
        if (!sectors[p.category]) {
            sectors[p.category] = {
                category: p.category,
                description: getSectorDescription(p.category),
                totalMarketCap: 0,
                projects: []
            };
        }

        sectors[p.category].projects.push(p);
        sectors[p.category].totalMarketCap += p.market_cap;
    });

    return sectors;
}

function getSectorDescription(category) {
    const descriptions = {
        Wireless: "Projects building decentralized wireless networks powered by community hardware.",
        Compute: "Networks providing decentralized GPU or CPU compute resources.",
        Storage: "Decentralized storage networks offering secure and distributed data storage.",
        IoT: "Projects connecting IoT devices through decentralized protocols.",
        Mobility: "Networks focused on vehicle data, mapping, and mobility infrastructure."
    };

    return descriptions[category] || "Decentralized infrastructure sector.";
}

function renderSectors(sectors) {
    mainContainer.innerHTML = Object.values(sectors)
        .map(sector => `
            <section class="sector-card">
                <h2>${sector.category}</h2>
                <p class="sector-description">${sector.description}</p>

                <p class="sector-marketcap">
                    <strong>Total Market Cap:</strong> $${sector.totalMarketCap.toLocaleString()}
                </p>

                <div class="sector-projects">
                    ${sector.projects.map(p => `
                        <div class="project-item" data-id="${p.id}">
                            <img src="${p.image}" alt="${p.name} 
                            width="40"
                            height="40" 
                            referrerpolicy="no-referrer" 
                            logo" loading="lazy">
                            <div>
                                <h3>${p.name}</h3>
                                <p><strong>Market Cap:</strong> $${p.market_cap.toLocaleString()}</p>
                                <p>${p.description}</p>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </section>
        `)
        .join("");

    attachProjectItemEvents();
}

function attachProjectItemEvents() {
    const items = document.querySelectorAll(".project-item");

    items.forEach(item => {
        item.addEventListener("click", () => {
            const id = item.dataset.id;
            openProjectModal(id);
        });
    });
}

async function openProjectModal(id) {
    const modal = document.querySelector("#project-modal");
    const modalBody = document.querySelector("#modal-body");

    modal.style.display = "flex";

    try {
        const url = `https://api.coingecko.com/api/v3/coins/${id}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("CoinGecko extended info failed");

        const data = await response.json();

        modalBody.innerHTML = `
            <div class="modal-header">
                <img src="${data.image.large}" alt="${data.name} logo">
                <h2>${data.name}</h2>
            </div>

            <p><strong>Market Cap:</strong> $${data.market_data.market_cap.usd.toLocaleString()}</p>
            <p><strong>Current Price:</strong> $${data.market_data.current_price.usd}</p>

            <h3>Description</h3>
            <p>${data.description?.en?.slice(0, 600) || "No description available."}...</p>

            <h3>Official Links</h3>
            <ul>
                <li><a href="${data.links.homepage[0]}" target="_blank">Website</a></li>
                <li><a href="https://twitter.com/${data.links.twitter_screen_name}" target="_blank">Twitter</a></li>
            </ul>
        `;

    } catch (error) {
        console.error(error);
        modalBody.innerHTML = "<p>Error loading project details.</p>";
    }
}

const modal = document.querySelector("#project-modal");
const closeBtn = document.querySelector("#modal-close");

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});

loadMarketData();
