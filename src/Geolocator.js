import React, { useEffect, useState } from "react";
import {
  faCloud,
  faWind,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Geolocator(props) {
  const handleUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const key = "5dde358276914a6cb8e59220ea920bdc";
        const geolocatorAPI = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${key}`;
        // console.log(geolocatorAPI);
        fetch(geolocatorAPI)
          .then((response) => {
            // console.log(geolocatorAPI);
            return response.json();
          })
          .then((jsonData) => {
            props.userData(jsonData.results[0].components.city);
            // console.log(jsonData.results[0].components.city);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      });
    } else {
      console.log("Geolocator not available!");
    }
  };

  return (
    <button onClick={handleUserLocation}>
      <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
    </button>
  );
}

export default Geolocator;
