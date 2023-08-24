import "./App.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCloud, faWind } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [geoDataCity, setGeoDataCity] = useState("");
  const [error, setError] = useState(null); // State to hold error messages
  const [data, setData] = useState({
    name: "",
    main: { temp: "" },
    weather: [{ icon: "", description: "" }],
    wind: { speed: "" },
  });
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");
  const imageURL = data.weather[0].icon;

  const handleUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const key = "5dde358276914a6cb8e59220ea920bdc";
        const geolocatorAPI = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${key}`;

        fetch(geolocatorAPI)
          .then((response) => {
            console.log(geolocatorAPI);
            return response.json();
          })
          .then((jsonData) => {
            setGeoDataCity(jsonData.results[0].components.city);
            console.log(jsonData.results[0].components.city);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      });
    } else {
      console.log("Geolocator not available!");
    }
  };

  const cityCapture = (e) => {
    setCity(e.target.value);
  };

  const apiGet = () => {
    const API_KEY = "15cb84f4e344b04d57a4e0e7e291d6a7";
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`;
    setError(null); // Clear previous errors
    fetch(API)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`City ${city} not found!!`);
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setData(json);
      }, [])

      .catch((error) => {
        setError(error.message);
      });

    // e.preventDefault();
  };

  useEffect(() => {
    handleUserLocation();
    apiGet(); //Call the apiGet function when the component mounts
  }, [unit]); //Call the apiGet function whenever the unit changes

  return (
    <div className="container">
      <div className="form">
        <input
          type="text"
          onChange={cityCapture}
          placeholder="Type in a location..."
        ></input>
        <div className="">
          <button onClick={apiGet}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="searchButton"
            />
          </button>
        </div>
      </div>
      <div className="formatSelect">
        <select
          name="format"
          id="format"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
        </select>
      </div>
      <div className="weatherData">
        <img src={`https://openweathermap.org/img/wn/${imageURL}@4x.png`}></img>
        <div className="weatherTemp">
          {" "}
          {data.main.temp} {unit === "metric" ? "°C" : "°F"}
        </div>
        <div className="weatherLocation">{data.name}</div>
        <p>{error}</p>
        <div className="weatherAdditionalInfo">
          <div className="left">
            <FontAwesomeIcon icon={faCloud} />
            {data.weather[0].description}
          </div>
          <div className="right">
            <FontAwesomeIcon icon={faWind} />
            {data.wind.speed} {unit === "metric" ? "m/s" : "mp/h"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
