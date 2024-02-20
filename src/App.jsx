import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (text) => {
    setInput(text);
    if (text.length > 2) {
      const fetchedSuggestions = await fetchSuggestions(text);
      setSuggestions(fetchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (text) => {
    const baseUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
    const apiKey = "077d9a6664msh3f6d74f7d0efd84p17e60bjsn82ab79d66aed";

    try {
      const response = await fetch(`${baseUrl}?namePrefix=${text}`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey, // Use the API key in the request header
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com", // Typically required by RapidAPI
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // Throw an error if response not ok
      }

      const data = await response.json();

      if (data && data.data) {
        return data.data.map((city) => city.name);
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      return [];
    }
  };



  const fetchWeatherAndForecast = async (city) => {
    const apiKey = '50775d6336d9bf645e41d092591b60df';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const weatherResponse = await axios.get(weatherUrl);
      setWeather(weatherResponse.data);

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
        <SearchBar
          onSearch={fetchWeatherAndForecast}
          input={input}
          setInput={setInput}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          handleInputChange={handleInputChange}
        />

        <WeatherDisplay weather={weather} forecast={forecast} />
      </header>
    </div>
  );
}

export default App;
