import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";

const containerStyle = {
  width: "600px",
  height: "500px",
  padding: "3px",
};

const center = {
  lat: 40.753742,
  lng: -73.983559,
};

const apiKey = import.meta.env.VITE_MAP_API_KEY;

function Map() {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    fetch("https://testtrackback.onrender.com/locations")
      .then((response) => response.json())
      .then((data) => {
        const routeCoordinates = data.map(({ latitude, longitude }) => ({
          lat: latitude,
          lng: longitude,
        }));
        setRoute(routeCoordinates);
      });
  }, []);

  return (
    <LoadScript googleMapsApiKey={apiKey} mapId="1d113781e58102b7">
      <GoogleMap
        mapContainerStyle={containerStyle}
        mapContainerClassName="map"
        center={center}
        zoom={10}
      >
        <Polyline
          path={route}
          options={{
            strokeColor: "#690aa0e6",
            strokeOpacity: 1.0,
            strokeWeight: 6,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
