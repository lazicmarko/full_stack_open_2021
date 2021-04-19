import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Weather = ({capital}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => setWeatherData(response.data));
  }, []);

  if (weatherData.current) {
    return (
      <div>
        <h1>Weather in {capital}</h1>
        <h3>temperature: {weatherData.current.temperature}</h3>
        <img src={weatherData.current.weather_icons[0]} alt=""/>
        <h3>wind: {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</h3>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default Weather;
