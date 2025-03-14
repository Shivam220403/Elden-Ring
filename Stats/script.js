const stats = [
    { name: "Vigor", key: "vigor" },
    { name: "Mind", key: "mind" },
    { name: "Endurance", key: "endurance" },
    { name: "Strength", key: "strength" },
    { name: "Dexterity", key: "dexterity" },
    { name: "Intelligence", key: "intelligence" },
    { name: "Faith", key: "faith" },
    { name: "Arcane", key: "arcane" }
];

const XP_PER_LEVEL = 100;
const statsContainer = document.getElementById("stats-container");

// Load stats from local storage
function loadStats() {
    stats.forEach(stat => {
        let xp = localStorage.getItem(stat.key) || 0;
        createStatElement(stat.name, stat.key, parseInt(xp));
    });
}

// Create UI elements
function createStatElement(name, key, xp) {
    const statDiv = document.createElement("div");
    statDiv.classList.add("stat");

    statDiv.innerHTML = `
        <h3>${name} (Level: <span id="${key}-level">${Math.floor(xp / XP_PER_LEVEL) + 1}</span>)</h3>
        <div class="progress-container">
            <div id="${key}-progress" class="progress-bar" style="width: ${xp % XP_PER_LEVEL}%"></div>
        </div>
        <p>XP: <span id="${key}-xp">${xp}</span> / ${XP_PER_LEVEL}</p>
        <div class="buttons">
            <button onclick="updateXP('${key}', -10)">-</button>
            <button onclick="updateXP('${key}', 10)">+</button>
        </div>
    `;

    statsContainer.appendChild(statDiv);
}

// Update XP and save to local storage
function updateXP(key, amount) {
    let xp = parseInt(localStorage.getItem(key)) || 0;
    xp = Math.max(0, xp + amount); // Prevent negative XP

    localStorage.setItem(key, xp);
    document.getElementById(`${key}-xp`).textContent = xp;
    document.getElementById(`${key}-level`).textContent = Math.floor(xp / XP_PER_LEVEL) + 1;
    document.getElementById(`${key}-progress`).style.width = (xp % XP_PER_LEVEL) + "%";
}

// Load stats on page load
document.addEventListener("DOMContentLoaded", loadStats);

// Register Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker Registered"))
        .catch(error => console.log("Service Worker Registration Failed", error));
}
