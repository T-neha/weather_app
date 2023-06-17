/* https://api.openweathermap.org/data/2.5/weather?q=pune&appid=51d638a58157bafa8a1da57649a84404 */
import React, { useEffect, useState } from "react";
import Weathercard from "../weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("pune");
  const [tempInfo , setTempInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=51d638a58157bafa8a1da57649a84404`;
      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main; //this is called destructuring
      const { main: weathermood } = data.weather[0]; //this is called destructuring also change the name in this particular code 
      const { name } = data; //this is called destructuring
      const { speed } = data.wind; //this is called destructuring
      const { country, sunset } = data.sys; //this is called destructuring

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      //   console.log(temp);
      //   console.log(data);

      setTempInfo(myNewWeatherInfo);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  });

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      {/* our temp card */}
      <Weathercard {...tempInfo}/>
      
    </>
  );
};

export default Temp;
