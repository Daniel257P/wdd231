document.addEventListener("DOMContentLoaded", () => {

    const sectorSelect = document.querySelector("#sector-select");

    if (sectorSelect) {
        const sectors = [
            "Wireless Networks",
            "Compute Networks",
            "Storage Networks",
            "Sensor Networks",
            "Mapping & Geospatial",
            "Energy & Power",
            "Mobility",
            "Infrastructure Sharing",
            "IoT Devices",
            "Edge Computing"
        ];

        const selectTemplate = `
            <option value="">Select Sector</option>
        ${sectors.map(sector => `<option value="${sector}">${sector}</option>`).join("")} `;

        sectorSelect.setAttribute("name", "sector","required");
        sectorSelect.setAttribute("required", "required");
        sectorSelect.innerHTML = selectTemplate;
    }

    const contactInfoContainer = document.querySelector(".contact-info");

    if (contactInfoContainer) {
        const infoTemplate = `
            <h2>Why Join DePIN Hub?</h2>
            <p>
                Become part of a growing ecosystem dedicated to decentralized physical infrastructure.
                Members gain access to exclusive insights, project analytics, and community collaboration.
            </p>

            <ul>
                <li>Access to curated DePIN project data</li>
                <li>Early research insights</li>
                <li>Networking with innovators</li>
                <li>Monthly DePIN reports</li>
            </ul>
            <div class="contact-card">
                <h3>Contact Information</h3>
                <p><strong>Address:</strong> 123 Main Street, City</p>
                <p><strong>Phone:</strong> +1 234 567 890</p>
                <p><strong>Email:</strong> support@depinhub.com</p>
            </div>
        `;

        contactInfoContainer.innerHTML = infoTemplate;
    }

    const timestampField = document.querySelector("#timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
});

    const resultsContainer = document.querySelector("#results");
    if (resultsContainer) { 
        const params = new URLSearchParams(window.location.search);
        const firstName = params.get("first");
        const lastName = params.get("last");
        const email = params.get("email");
        const sector = params.get("sector");
        const timestamp = params.get("timestamp");

        resultsContainer.innerHTML = `
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Sector of Interest:</strong> ${sector}</p>
            <p><strong>Submitted At:</strong> ${new Date(timestamp).toLocaleString()}</p>
        `;
    }
