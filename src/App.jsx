import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const fetchWeatherAndForecast = async (city) => {
    const apiKey = '50775d6336d9bf645e41d092591b60df';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const weatherResponse = await axios.get(weatherUrl);
      setWeather(weatherResponse.data);

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(forecastUrl);
      setForecast(forecastResponse.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
      setForecast(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Wizard</h1>
        <SearchBar onSearch={fetchWeatherAndForecast} />
        <WeatherDisplay weather={weather} forecast={forecast} /> {/* Pass forecast data as a prop */}
      </header>
    </div>
  );
}

export default App;
