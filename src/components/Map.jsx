import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";
import LocationTracker from "./LocationTracker";

const containerStyle = {
  width: "600px",
  height: "555px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const apiKey = import.meta.env.VITE_MAP_API_KEY;
function Map() {
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationChange = (location) => {
    setUserLocation(location);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <LocationTracker onLocationChange={handleLocationChange} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation ? userLocation : center}
        zoom={userLocation ? 15 : 10}
      >
        {userLocation && (
          <Marker position={{ lat: userLocation.lat, lng: userLocation.lng }} />
        )}
      </GoogleMap>
    </LoadScript>
  );
}


export default Map;
