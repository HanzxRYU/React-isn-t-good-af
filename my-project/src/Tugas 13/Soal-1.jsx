import React, { useState, useEffect } from "react";
import axios from "axios";

function CobaAxios() {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true"
      )
      .then((response) => {
        setWeather(response.data.current_weather);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Cuaca di London</h1>
      <p>Suhu: {weather.temperature}°C</p>
      <p>Kecepatan Angin: {weather.windspeed} km/h</p>
    </div>
  );
}

export default CobaAxios;
