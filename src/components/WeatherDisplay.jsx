import React from 'react';
import './WeatherDisplay.css';

function WeatherDisplay({ weather }) {
  
  return (
    <div>
      {weather ? (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather[0].main}</p>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
}

export default WeatherDisplay;
