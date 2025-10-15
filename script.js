const apiKey = "447c2ad576edebf2083fc048678284b0";

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) return alert("Please enter a city name!");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    console.log(data); // Check output here

    if (data.cod != 200) {
      document.getElementById("result").innerHTML = `<p>❌ ${data.message}</p>`;
      return;
    }

    const weather = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
      <p>☁️ Condition: ${data.weather[0].description}</p>
    `;
    document.getElementById("result").innerHTML = weather;

    localStorage.setItem("lastCity", city);
  } catch (error) {
    document.getElementById("result").innerHTML = `<p>⚠️ Network error</p>`;
    console.error(error);
  }
}
