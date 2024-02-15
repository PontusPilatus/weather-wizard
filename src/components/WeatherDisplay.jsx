import React from 'react';
import './WeatherDisplay.css';

function WeatherDisplay({ weather }) {

  const roundTemp = (temp) => Math.round(temp);

  return (
    <div>
      {weather ? (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {roundTemp(weather.main.temp)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} km/h</p>
          <p>Conditions: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
}

export default WeatherDisplay;
