document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scoutingForm');
    const qrCodeContainer = document.getElementById('qrCodeContainer');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Collect data from form fields
        const matchData = {
            matchNumber: document.getElementById('matchNumber').value,
            teamNumber: document.getElementById('teamNumber').value,
            autonomousActions: document.getElementById('autonomousActions').value,
            autoObjects: document.getElementById('autoObjects').value,
            teleOpActions: document.getElementById('teleOpActions').value,
            teleOPScored: document.getElementById('teleOPScored').value,
            endgameAscent: document.getElementById('endgameAscent').value
        };

        // Save data locally in case page reloads
        localStorage.setItem(`match-${matchData.matchNumber}`, JSON.stringify(matchData));
        alert('Data Saved!');
    });

    document.getElementById('generateQR').addEventListener('click', () => {
        generateQRCode();
    });

    function generateQRCode() {
        const qrCodeContainer = document.getElementById("qrCodeContainer");
        qrCodeContainer.innerHTML = ''; // Clear previous QR codes
    
        const matchData = {
            matchNumber: document.getElementById('matchNumber').value,
            teamNumber: document.getElementById('teamNumber').value,
            autonomousActions: document.getElementById('autonomousActions').value,
            autoObjects: document.getElementById('autoObjects').value,
            teleOpActions: document.getElementById('teleOpActions').value,
            teleOPScored: document.getElementById('teleOPScored').value,
            endgameAscent: document.getElementById('endgameAscent').value
        };
    
        if (!matchData.matchNumber || !matchData.teamNumber) {
            alert("Please enter a Match Number and Team Number!");
            return;
        }
    
        // Convert object to JSON
        const qrData = JSON.stringify(matchData);
    
        // Generate QR Code
        new QRCode(qrCodeContainer, {
            text: qrData,
            width: 200,
            height: 200
        });
    
        alert("QR Code Generated!");
    
        // Store in history (keep only last 10)
        let history = JSON.parse(localStorage.getItem("matchHistory")) || [];
        history.unshift(matchData); // Add new entry at the beginning
        if (history.length > 10) history.pop(); // Keep only last 10
    
        localStorage.setItem("matchHistory", JSON.stringify(history));
    }
    
});

