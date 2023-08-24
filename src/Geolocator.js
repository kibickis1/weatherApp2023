import React, { useEffect, useState } from "react";

function Geolocator(props) {
  const [geoDataCity, setGeoDataCity] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const key = "5dde358276914a6cb8e59220ea920bdc";
        const geolocatorAPI = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${key}`;

        fetch(geolocatorAPI)
          .then((response) => {
            return response.json();
          })
          .then((jsonData) => {
            console.log(jsonData);
            setGeoDataCity(jsonData.results[0].components.city);
            props.onGeoDataCityReceive(jsonData.results[0].components.city);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      });
    } else {
      console.log("Geolocator not available!");
    }
  });

  console.log(geoDataCity);

  // if ("geolocation" in navigator) {
  //   navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       // Success callback
  //       var latitude = position.coords.latitude;
  //       var longitude = position.coords.longitude;
  //       console.log("Latitude: " + latitude + ", Longitude: " + longitude);

  //       // You can use latitude and longitude for various purposes
  //     },
  //     function (error) {
  //       // Error callback
  //       console.error("Error getting location: ", error);
  //     }
  //   );
  // }
  return <div>will be hidden</div>;
}

export default Geolocator;
