import React, { useEffect, useState } from "react";
import axios from "axios";

function LocationTracker({ onLocationChange }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [time, setTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [startLatitude, setStartLatitude] = useState(null);
  const [startLongitude, setStartLongitude] = useState(null);
  const [path, setPath] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);

        if (!time) {
          setTime(new Date()); // set time when user logs location
          setStartLatitude(lat); // set starting latitude
          setStartLongitude(lng); // set starting longitude
        }
        setPath([...path, { lat, lng }]);
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (time) {
        setDuration(Math.round((new Date() - time) / 1000)); // update duration every second
      }
    }, 1000);

    return () => clearInterval(interval); // cleanup interval on unmount
  }, [time]);

  const sendLocationData = (lat, lng) => {
    const url = import.meta.env.VITE_BASE_URL;

    const data = {
      latitude: lat,
      longitude: lng,
      duration: duration,
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
          Your exact location: <span>Latitude: {latitude}, Longitude: {longitude}</span>
          <br />
          Starting location: <span>Latitude: {startLatitude}, Longitude: {startLongitude}</span>
          <br />
          Time at location: {duration} seconds
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}

export default LocationTracker;

