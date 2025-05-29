const locationElem = document.getElementById('location');
const descriptionElem = document.getElementById('description');
const temperatureElem = document.getElementById('temperature');
const humidityElem = document.getElementById('humidity');
const windElem = document.getElementById('wind');

function fetchWeather(lat, lon) {
  const apiKey = '8693701c2d9378c4ce35759059b90796'; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        locationElem.textContent = data.name;
        descriptionElem.textContent = data.weather[0].description;
        temperatureElem.textContent = `Temperature: ${data.main.temp}°C`;
        humidityElem.textContent = `Humidity: ${data.main.humidity}%`;
        windElem.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      } else {
        locationElem.textContent = 'Error';
        descriptionElem.textContent = 'Unable to fetch weather data.';
      }
    })
    .catch(error => {
      locationElem.textContent = 'Error';
      descriptionElem.textContent = 'Unable to fetch weather data.';
      console.error('Error fetching weather data:', error);
    });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude);
    }, error => {
      locationElem.textContent = 'Error';
      descriptionElem.textContent = 'Geolocation access denied.';
      console.error('Error getting geolocation:', error);
    });
  } else {
    locationElem.textContent = 'Error';
    descriptionElem.textContent = 'Geolocation is not supported by this browser.';
  }
}

getLocation();
