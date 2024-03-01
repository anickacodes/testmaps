import React, { useEffect, useState } from "react";
import axios from "axios";

function LocationTracker({ onLocationChange }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);
        onLocationChange({ lat, lng }); // set new coord
        // send  to server
        sendLocationData(lat, lng);
      });
      return () => {
        navigator.geolocation.clearWatch(watchId); // Stop watching the location when component unmounts
      };
    } else {
      console.log("This browser does not support geolocation.");
    }
  }, []);

  const sendLocationData = (lat, lng) => {
    const url = import.meta.env.VITE_BASE_URL;

    const data = {
      latitude: lat,
      longitude: lng,
    };

    axios.post(`${url}/location`, data)
      .then((res) => {
        console.log("Location data sent successfully!", res.data);
      })
      .catch((error) => {
        console.error("Error sending location data:", error);
      });
  };

  return (
    <div>
      {latitude && longitude ? (
        <p>
         Your exact  location: <span> Latitude: {latitude}, Longitude: {longitude}</span>
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}

export default LocationTracker;
