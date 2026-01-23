const myTown = document.querySelector('#town');
const myDescription =document.querySelector('#description');
const myTemperature =document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

const myKey = "97b16151bbae61dd4ef4fc696a33e580"
const myLat = "30.822670"
const myLong = "-97.603149"

const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&exclude={part}&appid=${myKey}&units=imperial`
async function apiFetch() {
        try {
            const response = await fetch(myURL);
            if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            displayResults(data); 
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

        function displayResults(data) {
        console.log('hello')
        myTown.innerHTML = data.name
        myDescription.innerHTML = data.weather[0].description
        myTemperature.innerHTML = `${data.main.temp}&deg;F`
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        myGraphic.setAttribute('src', iconsrc)
        myGraphic.setAttribute('alt',data.weather[0].description)        
    }

apiFetch();

const forecastURL = `//api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`

async function forecastFetch() {
        try {
            const response = await fetch(forecastURL);
            if (response.ok) {
            const data = await response.json();
            console.log(data); 
            displayForecast(data); 
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    function displayForecast(data) {
        const forecastContainer = document.querySelector("#forecast");
        forecastContainer.innerHTML = ""; 

        const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));
        const threeDays = daily.slice(0, 3);

        threeDays.forEach(day => {
            const date = new Date(day.dt_txt);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

            const card = document.createElement("div");
            card.classList.add("forecast-card");

            const h2 = document.createElement("h2");
            const p = document.createElement("p");

            h2.textContent = dayName;
            p.textContent = `${day.main.temp}°F`;

            card.appendChild(h2);
            card.appendChild(p);

            forecastContainer.appendChild(card);
        });
    }



forecastFetch();


async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

      
        const qualified = data.companies.filter(company =>
        company.membership === "Gold" || company.membership === "Silver"
            );
        const shuffled = qualified.sort(() => 0.5 - Math.random());

        const spotlightCount = Math.floor(Math.random() * 2) + 2;
        const selected = shuffled.slice(0, spotlightCount);

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

