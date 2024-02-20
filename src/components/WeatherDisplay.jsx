import React from 'react';
import './WeatherDisplay.css';

function WeatherDisplay({ weather, forecast }) {
  const roundTemp = (temp) => Math.round(temp);

  const renderForecast = (forecastData) => {
    const startIndex = 8;
    const dailyForecasts = forecastData.list.filter((_, index) => index >= startIndex && index < startIndex + 40).filter((_, index) => index % 8 === 0);

    return dailyForecasts.map((forecast, index) => (
      <div key={index} className="forecast-day">
        <h3>{new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
        <p>Temperature: {roundTemp(forecast.main.temp)}°C</p>
        <p>Humidity: {forecast.main.humidity}%</p>
        <p>Wind Speed: {forecast.wind.speed} km/h</p>
        <p>Conditions: {forecast.weather[0].description}</p>
      </div>
    ));
  };

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
      {forecast && (
        <div className="forecast">
          <h2>4-Day Forecast</h2>
          {renderForecast(forecast)}
        </div>
      )}
    </div>
  );
}

export default WeatherDisplay;
