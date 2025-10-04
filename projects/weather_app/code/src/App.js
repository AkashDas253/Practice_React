import React, { useState } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import HourlyForecast from './components/HourlyForecast';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => setCity(e.target.value);

  const handleSearch = async () => {
    setError('');
    setWeather(null);
    if (!city) return;

    try {
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`);
      const geoData = await geoRes.json();
      if (geoData.length === 0) {
        setError('City not found.');
        return;
      }
      const { lat, lon, display_name } = geoData[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      if (weatherData.current && weatherData.hourly) {
        setWeather({
          location: display_name,
          latitude: lat,
          longitude: lon,
          current: {
            temp: weatherData.current.temperature_2m,
            wind: weatherData.current.wind_speed_10m,
            humidity: weatherData.current.relative_humidity_2m,
            code: weatherData.current.weather_code,
          },
          hourly: weatherData.hourly,
        });
      } else {
        setError('Weather data not available.');
      }
    } catch (err) {
      setError('Error fetching data.');
    }
  };

  const getWeatherDescription = (code) => {
    const codes = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      99: 'Thunderstorm with hail',
    };
    return codes[code] || 'Unknown';
  };

  // Dynamic background based on time
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;
  const appClass = isDay ? 'App day' : 'App night';

  return (
    <div className={appClass}>
      <header className="App-header">
        <h1>Weather App</h1>
        <div className="search-bar">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city name"
          />
          <button onClick={handleSearch}>Get Weather</button>
        </div>
        {error && <p className="error">{error}</p>}
        {weather && (
          <>
            <WeatherCard weather={weather} getWeatherDescription={getWeatherDescription} />
            <h3>Next 6 Hours Forecast</h3>
            <HourlyForecast hourly={weather.hourly} getWeatherDescription={getWeatherDescription} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;