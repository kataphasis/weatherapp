let citySubmit = document.getElementById("search");

citySubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("button clicked");
  let choiceCity = new FormData(citySubmit);
  let city = choiceCity.get("name");

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8c9f86ec5cab7ed66b2fab7b378b09b0`
      );
      let data = await response.json();
      displayWeatherData(data);
    } catch (err) {
      if (err instanceof TypeError) {
        displayError();
      }
    }
  };
  fetchWeatherData();
});

function temperatureConverter(valNum) {
  valNum = parseFloat(valNum);
  return (valNum - 273.15) * 1.8 + 32;
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

let dismiss;

function setDismissHandler() {
  dismiss = document.getElementById("error");
  dismiss.addEventListener("click", (event) => {
    dismiss.innerHTML = "";
    dismiss = null;
  });
}

function displayError() {
  let errorEl = document.getElementById("error");
  errorEl.innerHTML = `<div>
  <p class="text-sm">Not a valid input, try again</p>
</div>`;
  setDismissHandler();
}

function displayWeatherData(data) {
  let locationEl = document.getElementById("location");
  let tempEl = document.getElementById("temp");
  let forecastEl = document.getElementById("forecast");
  let hiLoEl = document.getElementById("hi-lo-humid");

  locationEl.innerHTML = `
    ${data.name}
    `;
  tempEl.innerHTML = `${Math.floor(temperatureConverter(data.main.temp))}\u00B0`;
  forecastEl.innerHTML = `
    ${toTitleCase(data.weather[0].description)}
    `;
  hiLoEl.innerHTML = `
  <div>
  <div>
    <p>High</p>
    <hr />
    <p>${Math.floor(temperatureConverter(data.main.temp_max))}\u00B0</p>
  </div>
  <div>
    <p>Low</p>
    <hr />
    <p>${Math.floor(temperatureConverter(data.main.temp_min))}\u00B0</p>
  </div>
  <div>
    <p>Humidity</p>
    <hr />
    <p>${data.main.humidity}%</p>
  </div>
</div>`;
}