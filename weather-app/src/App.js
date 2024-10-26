import Weather from "./components/Weather";
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState(() => localStorage.getItem("city") || "");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");

  function convertToFlag(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  useEffect(() => {
    async function fetchWeather() {
      try {
        setIsLoading(true);
        if (city.length < 3) {
          setWeather({});
          return;
        }

        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        const geoData = await geoRes.json();
        if (!geoData.results) throw new Error("Location not found");

        const { latitude, longitude, timezone, name, country_code } =
          geoData.results.at(0);
        setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();

        setWeather(weatherData.daily);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  useEffect(() => {
    localStorage.setItem("city", city);
  }, [city]);

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <input
        type="text"
        placeholder="Enter Your City Name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {isLoading ? <p className="loader">Loading...</p> : null}
      {weather.weathercode ? (
        <Weather location={displayLocation} weather={weather} />
      ) : null}
    </div>
  );
}

export default App;
