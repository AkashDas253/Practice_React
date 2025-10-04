import React from 'react';

function HourlyForecast({ hourly, getWeatherDescription }) {
  return (
    <div className="hourly-forecast">
      {hourly.time.slice(0, 6).map((time, idx) => (
        <div key={time} className="hour">
          <span>{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>{hourly.temperature_2m[idx]}°C</span>
          <span>{hourly.relative_humidity_2m[idx]}%</span>
          <span>{hourly.wind_speed_10m[idx]} km/h</span>
          <span>{getWeatherDescription(hourly.weather_code[idx])}</span>
        </div>
      ))}
    </div>
  );
}

export default HourlyForecast;