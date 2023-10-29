let alertActive = false;
let handled = false;
let sensorData = [95, 28, 80, 70, 60];
const safetyThresholds = [90, 20, 75, 65, 55];
const ctx = document.getElementById("safetyIndexChart").getContext("2d");
const safetyChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["spO2", "Temperature", "Hazardous Gas", "Flame Detection", "Humidity"],
        datasets: [{
            label: "Safety Index",
            data: sensorData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: "Safety Index",
                },
            },
        },
    },
});

function updateSafetyData() {
   
    if (handled) {
        resetSafetyData();
        return;
    }

    
    sensorData = [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100];

    safetyChart.data.datasets[0].data = sensorData;
    safetyChart.update();

    
    const alerts = [];
    for (let i = 0; i < sensorData.length; i++) {
        if (sensorData[i] < safetyThresholds[i]) {
            
            alerts.push(getSensorName(i));
        }
    }

   
    if (alerts.length > 0) {
        showAlert(alerts);
    } else {
        hideAlert();
       
        resetToStartingPage();
    }

    
    if (alertActive) {
        document.body.classList.add('alert-border');
    } else {
        
        document.body.classList.remove('alert-border');
    }
}

function showAlert(sensorAlerts) {
    alertActive = true;
    const alertMessage = document.querySelector(".alert-message");
    const handledButton = document.getElementById("handledBtn");
    alertMessage.style.display = "block";
    handledButton.style.display = "block";
    alertMessage.innerHTML = `<p class="alert-text"><strong>Alert:</strong> Safety parameters [${sensorAlerts.join(', ')}] are below their thresholds!</p>
        <p class="alert-text">Is the situation handled?</p>`;
}


function hideAlert() {
    alertActive = false;
    const alertMessage = document.querySelector(".alert-message");
    const handledButton = document.getElementById("handledBtn");
    alertMessage.style.display = "none";
    handledButton.style.display = "none";
}


function handleSituation() {
    handled = true;
    resetSafetyData();
    resetToStartingPage();
}


function resetSafetyData() {
    sensorData = [95, 28, 80, 70, 60];
    safetyChart.data.datasets[0].data = sensorData;
    safetyChart.update();
    handled = false;
    hideAlert();
}


function resetToStartingPage() {
    
function handleSituation() {
   
    window.location.reload();
    
   
    resetAdditionalContent();
}


function resetAdditionalContent() {
    
    document.getElementById("additionalElementId").value = "Initial Value";
    
    
    document.getElementById("additionalElementId").style.display = "block";
    
    
}

}


function getSensorName(sensorIndex) {
    const sensorNames = ["spO2", "Temperature", "Hazardous Gas", "Flame Detection", "Humidity"];
    return sensorNames[sensorIndex];
}


document.getElementById("submitBtn").addEventListener("click", updateSafetyData);
document.getElementById("handledBtn").addEventListener("click", handleSituation);



