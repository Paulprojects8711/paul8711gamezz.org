const searchData = [
    {
        name: "Raspberry Pi 40 Pin",
        link: "/pinouts/device/rpi/40pin",
        aliases: ["rpi", "pi 5", "pi5", "pi 4", "pi4", "pi 3", "pi3", "pi 2", "pi2", "zero", "zero w", "zero 2w", "zero 2 w"],
        tags: ["gpio", "spi", "i2c", "uart", "gnd", "ground", "5v", "3v3", "pwm", "arm"]
    },
    {
        name: "Raspberry Pi 26 Pin",
        link: "/pinouts/device/rpi/26pin",
        aliases: ["rpi", "pi 1", "pi1"],
        tags: ["gpio", "spi", "i2c", "uart", "gnd", "ground", "5v", "3v3", "pwm", "arm"]
    }
];

const input = document.getElementById("device-search");
const results = document.getElementById("search-results");

input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    results.innerHTML = "";

    if (!query) {
        results.style.display = "none";
        return;
    }

    const filtered = searchData
        .filter(item => {
            const nameMatch = item.name.toLowerCase().includes(query);
            const aliasMatch = item.aliases.some(a => a.toLowerCase().includes(query));
            const tagMatch = item.tags.some(t => t.toLowerCase().includes(query));
            return nameMatch || aliasMatch || tagMatch;
        })
        .sort((a, b) => {
            const aExact = a.name.toLowerCase().startsWith(query);
            const bExact = b.name.toLowerCase().startsWith(query);
            return bExact - aExact;
        });

    filtered.forEach(item => {
        const li = document.createElement("li");
        li.className = "search-item";
        li.textContent = item.name;
        li.addEventListener("click", () => {
            window.location.href = item.link;
        });
        results.appendChild(li);
    });

    results.style.display = filtered.length ? "block" : "none";
});

// Close results when clicking outside
document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
        results.style.display = "none";
    }
});