const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.querySelector("button");
const weatherIcon = document.getElementById("weatherIcon");
const mockCheckbox = document.getElementById("mockMode");

cityInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
});

// Load last searched city
window.onload = function () {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        cityInput.value = lastCity;
        getWeather();
    }
};

async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) return;

    // UI Updates
    document.getElementById("loader").style.display = "block";
    document.getElementById("weatherInfo").style.display = "none";
    document.getElementById("error").style.display = "none";

    // Check for Mock Mode
    if (mockCheckbox.checked) {
        setTimeout(() => {
            showMockData(city);
        }, 1000);
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            showError("City not found");
        } else if (response.status == 401) {
            showError("Invalid API Key. Switch to Mock Mode.");
        } else {
            const data = await response.json();
            displayWeather(data);
            localStorage.setItem("lastCity", city);
        }
    } catch (error) {
        showError("Network Error. Check connection.");
    }
}

function displayWeather(data) {
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("tempVal").innerText = Math.round(data.main.temp);
    document.getElementById("humidity").innerText = data.main.humidity + "%";
    document.getElementById("windSpeed").innerText = data.wind.speed + " km/h";
    document.getElementById("weatherDesc").innerText = data.weather[0].description;

    // Update Icon
    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
    }
    else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3076/3076129.png";
    }
    else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
    } else {
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }

    document.getElementById("loader").style.display = "none";
    document.getElementById("weatherInfo").style.display = "block";
}

function showError(msg) {
    document.getElementById("error").innerText = msg;
    document.getElementById("error").style.display = "block";
    document.getElementById("loader").style.display = "none";
}

// Mock Data Function for testing without API Key
function showMockData(city) {
    const mockData = {
        name: city.charAt(0).toUpperCase() + city.slice(1),
        main: {
            temp: Math.floor(Math.random() * 30) + 10,
            humidity: Math.floor(Math.random() * 50) + 40
        },
        wind: {
            speed: Math.floor(Math.random() * 20) + 5
        },
        weather: [
            {
                main: "Clouds",
                description: "scattered clouds",
                icon: "03d"
            }
        ]
    };
    displayWeather(mockData);
}
