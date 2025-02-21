document.addEventListener("DOMContentLoaded", () => {
    const historyContainer = document.getElementById("historyContainer");

    // Retrieve stored history (max 10 entries)
    let history = JSON.parse(localStorage.getItem("matchHistory")) || [];

    if (history.length === 0) {
        historyContainer.innerHTML = "<p>No match history yet.</p>";
        return;
    }

    history.forEach((data) => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("history-entry");
        
        // Match Title
        const title = document.createElement("h2");
        title.innerText = `Match ${data.matchNumber} - Team ${data.teamNumber}`;
        
        // QR Code Container
        const qrDiv = document.createElement("div");
        qrDiv.classList.add("qr-code");

        // Generate QR Code
        new QRCode(qrDiv, {
            text: JSON.stringify(data),
            width: 150,
            height: 150
        });

        // Append Elements
        entryDiv.appendChild(title);
        entryDiv.appendChild(qrDiv);
        historyContainer.appendChild(entryDiv);
    });
});

// Clear history function
function clearHistory() {
    localStorage.removeItem("matchHistory");
    alert("Match history cleared!");
    location.reload();
}
