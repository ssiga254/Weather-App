const btn = document.getElementById("btn");


function displayWeather(data) {
  const weather = data.weather[0].main;

  
  changeBackground(weather);
  


  const icon = data.weather[0].icon;
  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  
  document.getElementById("cityName").innerText = data.name;
  document.getElementById("temp").innerText = data.main.temp + "°C";
  document.getElementById("condition").innerText = weather;

  document.getElementById("extra").innerText =
    "Humidity: " + data.main.humidity + "% | Wind: " + data.wind.speed + " km/h";
}


function changeBackground(weather) {
   if (document.body.classList.contains("dark")) return;  
  if (weather === "Clear") {
    document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
  } 
  else if (weather === "Clouds") {
    document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
  } 
  else if (weather === "Rain") {
    document.body.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
  } 
  else if (weather === "Haze" || weather === "Smoke" || weather === "Mist") {
    document.body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
  } 
  else {
    document.body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
  }
}


btn.addEventListener("click", async () => {
  const city = document.getElementById("city").value;

  const apiKey = "0c56b639f38a87d167d75843712dbb69";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    
    displayWeather(data);
    getForecast(city);

  } catch (error) {
    alert(error.message);
  }
});


document.getElementById("city").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});
async function getWeatherByLocation(lat, lon) {
  const apiKey = "0c56b639f38a87d167d75843712dbb69";

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
   
    if (!response.ok) {
      throw new Error("Location weather not found");
    }
     const data = await response.json();
    
    displayWeather(data);
    getForecast(data.name);

  } catch (error) {
    console.log("Error fetching location weather");
  }
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        getWeatherByLocation(lat, lon);
      },
      () => {
        console.log("Location permission denied");
      }
    );
  } else {
    console.log("Geolocation not supported");
  }
}
getLocation();
async function getForecast(city) {
  const apiKey = "0c56b639f38a87d167d75843712dbb69";

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    showForecast(data);
  } catch (error) {
    console.log("Forecast error");
  }
}
function showForecast(data) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  
  for (let i = 0; i < 40; i += 8) {
    const item = data.list[i];

    const date = new Date(item.dt_txt);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });

    const temp = item.main.temp;
    const icon = item.weather[0].icon;

    const forecastHTML = `
      <div class="forecast-item">
        <p>${day}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" />
        <p>${temp}°C</p>
      </div>
    `;

    forecastDiv.innerHTML += forecastHTML;
  }
}
const toggle = document.getElementById("toggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  
  if (document.body.classList.contains("dark")) {
    toggle.innerText = "☀️";
  } else {
    toggle.innerText = "🌙";
  }
});
