import { FaSearch } from "react-icons/fa";
import clear_icon from "../../assets/clear.webp";
import cloud_icon from "../../assets/cloud.png";
import humidity_icon from "../../assets/humidity.webp";
import drizzle_icon from "../../assets/drizzle.webp";
import snow_icon from "../../assets/snow.webp";
import wind_icon from "../../assets/wind.webp";
import rain_sun_icon from "../../assets/rain-sun.webp";

import { useEffect, useRef, useState } from "react";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_sun_icon,
    "09n": rain_sun_icon,
    "10d": rain_sun_icon,
    "10n": rain_sun_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (!city || city.trim() === "") return;

    try {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4199ed03a763e8ea12d698c678379f1d`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        setWeatherData(null);
        alert("City not found!");
      } else {
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const city = inputRef.current.value;
    search(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    search("Lahore");
  }, []);

  return (
    <div>
      <div className="bg-blue-400 w-full sm:w-1/2 mx-auto border border-gray-400 py-6 rounded">
        <h1 className="text-4xl pb-3 font-semibold text-white text-center">Weather App</h1>
        <div className="flex justify-center items-center py-6">
          <div className="relative w-full md:max-w-md md:px-auto px-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search city..."
              className="w-full border bg-white border-gray-300 rounded-md py-2 px-3 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div
              onClick={handleSearch}
              className="absolute right-7 top-1/2 transform -translate-y-1/2 text-blue-950 cursor-pointer"
            >
              <FaSearch />
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-white">Loading weather data...</p>
        ) : weatherData ? (
          <>
            <img src={weatherData.icon} alt="weather icon" className="w-40 mx-auto py-3" />
            <h3 className="text-2xl text-white text-center">{weatherData.temperature}°C</h3>
            <h3 className="text-2xl text-white text-center">{weatherData.location}</h3>
            <div className="flex flex-wrap md:justify-between justify-center px-6 sm:px-16 py-12">
              <div className="flex items-center gap-5 text-white">
                <img className="w-20" src={humidity_icon} alt="humidity" />
                <div className="text-left">
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="flex items-center gap-5 text-white mt-4 sm:mt-0">
                <img className="w-20" src={wind_icon} alt="wind" />
                <div className="text-left">
                  <p>{weatherData.windSpeed} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-white">Enter a city to see weather</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
