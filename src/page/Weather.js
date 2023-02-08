import axios from "axios";
import { useEffect, useState } from "react";

const api = {
  key: "146cea1eef706828403d6859379129b5",
  base: "https://api.openweathermap.org/data/2.5/",
};

const cityName = "Daejeon";

const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api.key}&units=metric`;

function Weather() {
  let [weather, setWeather] = useState("");
  let [temp, setTemp] = useState();
  let [shoes, setShoes] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((결과) => {
        let copy = [...shoes, ...결과.data];
        setShoes(copy);
        console.log(shoes);
      })
      .catch(() => {
        console.log("실패함");
      });
  }, []);

  function onGeoOk(position) {
    // const lat = position.coords.latitude;
    // const lng = position.coords.longitude;
    // console.log("You live in", lat, lng);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api.key}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const name = data.name;
        const weather = data.weather[0].main;
        const temp = data.main.temp;
      });
  }
  function onGeoError() {
    alert("Can't find you. No weather for you.");
  }
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

  // const url = `https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={api.key}`;
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=Daejeon&appid=146cea1eef706828403d6859379129b5`;

  return <div>{temp}</div>;
}

export default Weather;
