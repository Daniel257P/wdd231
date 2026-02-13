import { featuresData } from "../data/content.mjs";

const container = document.querySelector("#features");
const featuresSection = document.createElement("section");
featuresSection.classList.add("features");

featuresSection.innerHTML = `
    ${featuresData.map(feature => `
        <div class="feature">
            <div class="feature-content">
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        </div>
    `).join("")}
`;

container.appendChild(featuresSection);

const cards = featuresSection.querySelectorAll(".feature");

const learnBasicsCard = cards[0];

cards[1].addEventListener("click", () => {
    window.location.href = "projectdirectory.html";
});

cards[2].addEventListener("click", () => {
    window.location.href = "marketdata.html";
});

const depinDialog = document.querySelector("#depinDialog");
const closeDialog = document.querySelector("#closeDialog");

learnBasicsCard.addEventListener("click", () => {
    depinDialog.showModal();
});

closeDialog.addEventListener("click", () => {
    depinDialog.close();
});


// Depin Projects ID list 

const depinProjects = [
  "helium",
  "akash-network",
  "render-token",
  "iota",
  "filecoin",
  "arweave",
  "theta-token",
  "ocean-protocol",
  "livepeer",
  "storj",
  "hivemapper"
];

// cache fetch with localStorage

async function cachedFetch(url, key, ttl = 60000) {

  const cached = localStorage.getItem(key);
  const time = localStorage.getItem(key + "_time");


  if (cached && time && Date.now() - time < ttl) {
    return JSON.parse(cached);
  }

  try {

    const res = await fetch(url, {
      headers: {
        "Accept": "application/json"
      }
    });

    if (!res.ok) throw new Error("API Error");

    const data = await res.json();

    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(key + "_time", Date.now());

    return data;

  } catch (err) {

    console.error("Fetch failed:", err);

    return cached ? JSON.parse(cached) : null;
  }
}

// Fetch market data for all projects

async function fetchAllMarketData() {

  const url =
    `https://api.coingecko.com/api/v3/coins/markets` +
    `?vs_currency=usd` +
    `&ids=${depinProjects.join(",")}` +
    `&price_change_percentage=7d`;

  return await cachedFetch(url, "market_data", 120000);
}


console.log("Fetching market data for:", depinProjects);

fetchAllMarketData().then(data => {

  if (!data || data.length === 0) {
    document.querySelector("#content-grid").innerHTML =
      "<p>Data unavailable.</p>";
    return;
  }

  console.log("Market data received:", data);

  renderContentGrid(data);

}).catch(err => {
  console.error("Init error:", err);
});

function renderContentGrid(projects) {

  const container = document.querySelector("#content-grid");
  container.innerHTML = "";

  if (!projects || projects.length === 0) {
    container.innerHTML = "<p>No data found.</p>";
    return;
  }

  const mainProject = projects[0];

  // Get top 10 trending by market cap

  const trending = [...projects]
    .sort((a, b) => b.market_cap - a.market_cap)
    .slice(0, 10);

  const section = document.createElement("section");
  section.classList.add("content-grid");


  // Maind content card

  const card = document.createElement("div");
  card.classList.add("project-card");

  card.innerHTML = `
    <h2 id="project-title">${mainProject.name}</h2>

    <div class="chart-container">

      <div id="loader">Loading...</div>

      <canvas id="projectChart"></canvas>

    </div>
  `;

  // Trending Sidebar

  const aside = document.createElement("aside");
  aside.classList.add("trending");

  const trendingList = trending.map(p => {

    const growth = p.price_change_percentage_7d_in_currency;

    return `
      <li class="trending-item" data-id="${p.id}">

        <img src="${p.image}" alt="${p.name} logo" class="t-logo" 
        width="40"
        height="40" 
        referrerpolicy="no-referrer" 
        loading="lazy">

        <span class="t-name">${p.name}</span>

        <span class="t-mcap">
          $${p.market_cap.toLocaleString()}
        </span>

        <span class="t-growth ${growth >= 0 ? "positive" : "negative"}">
          ${growth !== null ? growth.toFixed(2) + "%" : "N/A"}
        </span>

      </li>
    `;

  }).join("");


  aside.innerHTML = `
    <h3>Top Trending</h3>

    <div class="trending-header">
      <span>Project</span>
      <span>Market Cap</span>
      <span>7d</span>
    </div>

    <ul class="trending-list">
      ${trendingList}
    </ul>
  `;


  aside.addEventListener("click", e => {

    const item = e.target.closest(".trending-item");

    if (!item) return;

    const id = item.dataset.id;

    const name =
      item.querySelector(".t-name").textContent;

    document.getElementById("project-title").textContent = name;

    loadProjectChart(id);

  });

  section.appendChild(card);
  section.appendChild(aside);

  container.appendChild(section);

  loadProjectChart(mainProject.id);
}


// Load chart data for each project

async function loadProjectChart(id) {

  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "block";

  const url =
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart` +
    `?vs_currency=usd&days=7`;

  const data = await cachedFetch(
    url,
    "chart_" + id,
    300000 
  );

  if (!data || !data.prices) {
    if (loader) loader.style.display = "none";
    return;
  }

  const prices = data.prices.map(p => p[1]);

  const labels = data.prices.map(p => {

    const d = new Date(p[0]);

    return `${d.getMonth() + 1}/${d.getDate()}`;
  });

  updateChart(labels, prices);

  if (loader) loader.style.display = "none";
}

let chartInstance = null;

function updateChart(labels, prices) {

  const canvas = document.getElementById("projectChart");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {

    type: "line",

    data: {
      labels,
      datasets: [{
        pointRadius: 0,
        pointHoverRadius: 4,
        label: "Price (USD)",
        data: prices,
        borderColor: "#00D68F", 
        borderWidth: 2,
        tension: 0.3,
        fill: false
      }]
    },

    options: {
      responsive: true,

      scales: {
        y: {
          beginAtZero: false
        }
      }
    }

  });
}

setInterval(async () => {

  const data = await fetchAllMarketData();

  if (data?.length) {
    renderContentGrid(data);
  }

}, 180000); 
