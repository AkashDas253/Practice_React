import React from 'react';
import './WeatherCard.css';

function WeatherCard({ weather, getWeatherDescription }) {
  return (
    <div className="weather-card">
      <h2>{weather.location}</h2>
      <p className="coords">
        <span>Lat: {Number(weather.latitude).toFixed(2)}</span>
        <span>Lon: {Number(weather.longitude).toFixed(2)}</span>
      </p>
      <div className="current-weather">
        <p><strong>Temperature:</strong> {weather.current.temp} °C</p>
        <p><strong>Humidity:</strong> {weather.current.humidity} %</p>
        <p><strong>Wind Speed:</strong> {weather.current.wind} km/h</p>
        <p><strong>Condition:</strong> {getWeatherDescription(weather.current.code)}</p>
      </div>
    </div>
  );
}

export default WeatherCard;