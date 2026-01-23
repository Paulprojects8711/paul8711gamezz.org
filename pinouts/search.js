const searchData = [
    { name: "Raspberry Pi 40 Pin", type: "pi", link: "/pinouts/device/rpi/40pin" },
    //{ name: "Raspberry Pi 26 Pin", type: "pi", link: "?pinout=26" },
    //{ name: "Raspberry Pi Zero", type: "pi", link: "?pinout=zero" },
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

    const filtered = searchData.filter(item => item.name.toLowerCase().includes(query));

    filtered.forEach(item => {
        const li = document.createElement("li");
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