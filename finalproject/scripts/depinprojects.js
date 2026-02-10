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

async function fetchAllMarketData() {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${depinProjects.join(",")}&price_change_percentage=7d`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch market data");

    return await res.json(); 

  } catch (error) {
    console.error("Market fetch error:", error);
    return [];
  }
}

console.log("Fetching market data for:", depinProjects);    
fetchAllMarketData().then(data => {
  console.log("Market data received:", data);
  renderContentGrid(data);
 
}).catch(error => {
  console.error("Error fetching market data:", error);
});

function renderContentGrid(projects) {
  const container = document.querySelector("#content-grid");
  container.innerHTML = ""; 

  const mainProject = projects[0];

  const trending = [...projects]
    .sort((a, b) => b.market_cap - a.market_cap)
    .slice(0, 10);

  const section = document.createElement("section");
  section.classList.add("content-grid");

  // ============================
  // Main Project Card
  // ============================
  const card = document.createElement("div");
  card.classList.add("project-card");

 card.innerHTML = `
  <h2 id="project-title">${mainProject.name}</h2>
  <div class="chart-container">
    <canvas id="projectChart"></canvas>
  </div>
`;

 // ============================
// Trending Sidebar
// ============================
const aside = document.createElement("aside");
aside.classList.add("trending");

const trendingList = trending.map(p => {
    
    const growth = p.price_change_percentage_7d_in_currency;

    return `
      <li class="trending-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name} logo" class="t-logo">
        <span class="t-name">${p.name}</span>
        <span class="t-mcap">$${p.market_cap.toLocaleString()}</span>
        <span class="t-growth ${growth >= 0 ? "positive" : "negative"}">
          ${growth ? growth.toFixed(2) + "%" : "N/A"}
        </span>
      </li>
    `;
  }) 
  .join("");
  
aside.innerHTML = `
  <h3>Top Trending</h3>
  <div class="trending-header">
        <span>Project Name</span>
        <span>Market Cap</span>
        <span>7d Growth</span>
    </div>

    <ul class="trending-list">
        ${trendingList}
    </ul>
    `;
    
  section.appendChild(card);
  section.appendChild(aside);
  container.appendChild(section);

  document.querySelectorAll(".trending-item").forEach(item => {
  item.addEventListener("click", () => {
    const id = item.dataset.id;
    
    const name = item.querySelector(".t-name").textContent; 
    document.getElementById("project-title").textContent = name;

    loadProjectChart(id);
  });
});


  loadProjectChart(mainProject.id);
}

async function loadProjectChart(id) {
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`;

  const res = await fetch(url);
  const data = await res.json();

  const prices = data.prices.map(p => p[1]);
  const labels = data.prices.map(p => {
    const date = new Date(p[0]);
    return `${date.getMonth()+1}/${date.getDate()}`;
  });

  updateChart(labels, prices);
}

let chartInstance = null;

function updateChart(labels, prices) {
  const ctx = document.getElementById("projectChart").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Price (USD)",
        data: prices,
        borderColor: "#4caf50",
        borderWidth: 2,
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}