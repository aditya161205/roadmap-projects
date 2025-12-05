async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "Loading...";

    const res = await fetch(`http://localhost:5000/weather?city=${city}`);
    const data = await res.json();

    if (data.error) {
        resultDiv.innerHTML = `<p style='color:red;'>${data.error}</p>`;
        return;
    }

    const weather = data.data.currentConditions;

    resultDiv.innerHTML = `
    <h3>${city.toUpperCase()}</h3>
    <p>Temp: ${weather.temp}°F</p>
    <p>Humidity: ${weather.humidity}%</p>
    <p>Conditions: ${weather.conditions}</p>
    <small>Source: ${data.source}</small>
  `;
}
