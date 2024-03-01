import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import LocationTracker from "./LocationTracker";

const containerStyle = {
  width: "600px",
  height: "500px",
  padding: "3px"
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const apiKey = import.meta.env.VITE_MAP_API_KEY;

function Map() {
  const [userLocation, setUserLocation] = useState(null);
  const [path, setPath] = useState([]);

  const handleLocationChange = (location) => {
    setUserLocation(location);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <LocationTracker onLocationChange={(location) => {
        handleLocationChange(location);
        setPath((prevPath) => [...prevPath, location]);
      }} />
     
        <GoogleMap
        mapContainerStyle={containerStyle}
        mapContainerClassName="map"
          center={userLocation ? userLocation : center}
          zoom={userLocation ? 15 : 10}
        >
          {userLocation && (
            <Marker position={{ lat: userLocation.lat, lng: userLocation.lng }} />
          )}
          <Polyline
            path={path.map((location) => ({
              lat: location.lat,
              lng: location.lng,
            }))}
            options={{
              strokeColor: "#a200ff",
              strokeOpacity: 1.0,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
   
    </LoadScript>
  );
}


export default Map;
