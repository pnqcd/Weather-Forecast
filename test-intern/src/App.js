import './App.css';
import React, { useEffect, useState } from 'react';
import SearchComponent from './components/SearchComponent';
import WeatherCard from './components/WeatherCard';
import axios from 'axios';

const apiKey = '56ed530bd4d4475289491812240404';

const App = () => {
  const [weather, setWeather] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=21`);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <header className="header">
        <p className="heading">Weather Dashboard</p>
      </header>
      <div className="container-fluid weather-section">
        <div className="row justify-content-center">
          <div className="col-md-4 col-sm-12 ">
            <SearchComponent onSearch={fetchWeatherData} />
          </div>
          <div className="col-md-8 col-sm-12 ">
            {weather && <WeatherCard weather={weather} />}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default App;
