import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css'; // Assuming you have some CSS

function App() {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (city) => {
    const apiKey = '50775d6336d9bf645e41d092591b60df'; // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null); // Optionally, handle the error state more gracefully
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Wizard</h1>
        <SearchBar onSearch={fetchWeather} />
        <WeatherDisplay weather={weather} />
      </header>
    </div>
  );
}

export default App;
