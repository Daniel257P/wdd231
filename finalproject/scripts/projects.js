import { depinProjects } from "../data/content.mjs";

const filtersContainer = document.querySelector("#project-filters");
const listContainer = document.querySelector("#project-directory");

const categories = [...new Set(depinProjects.map(p => p.category))];

filtersContainer.innerHTML = `
    <button data-category="all" class="filter-btn active">All</button>
    ${categories.map(cat => `
        <button data-category="${cat}" class="filter-btn">${cat}</button>
    `).join("")}
`;
function renderList(projects, marketData) {
    listContainer.innerHTML = projects.map(project => {
        const market = marketData.find(m => m.id === project.id);

        return `
            <div class="project-item">
                <img src="${market?.image || 'images/default.png'}" alt="${project.name} logo">

                <div class="info">
                    <h3>${project.name}</h3>
                    <p class="category">${project.category}</p>
                    <p class="desc">${project.description}</p>

                    ${market ? `
                        <p><strong>Token:</strong> ${market.symbol.toUpperCase()}</p>
                        <p><strong>Market Cap:</strong> $${market.market_cap.toLocaleString()}</p>
                        <p><strong>Price:</strong> $${market.current_price}</p>
                    ` : `<p>No market data available</p>`}
                </div>
            </div>
        `;
    }).join("");
}
filtersContainer.addEventListener("click", (e) => {
    if (!e.target.matches(".filter-btn")) return;

    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    const category = e.target.dataset.category;

    const filtered = category === "all"
        ? depinProjects
        : depinProjects.filter(p => p.category === category);

    renderList(filtered, window.marketData);
});
async function loadMarketData() {
    const ids = depinProjects.map(p => p.id).join(",");
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`;

    const res = await fetch(url);
    window.marketData = await res.json();

    renderList(depinProjects, window.marketData);
}

loadMarketData();
