import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "../App.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS;

const Mapbx = () => {
  const [map, setMap] = useState(null);
  const [userPath, setUserPath] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [startLocation, setStartLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: "map-container",
        style: "mapbox://styles/nicka299/cltcfn6vy00ii01qq3lac7q7k",
        center: [-73.950863, 40.734917],
        zoom: 11,
      });

      mapInstance.on("style.load", () => {
        const geolocateControl = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        });

        mapInstance.addControl(geolocateControl);

        geolocateControl.on("geolocate", (e) => {
          const { longitude, latitude } = e.coords;
          if (!startLocation) {
            setStartLocation({ lng: longitude.toFixed(15), lat: latitude.toFixed(15) });
          }
          setCurrentLocation({ lng: longitude.toFixed(15), lat: latitude.toFixed(15) });
          setUserPath((prevState) => ({
            type: "FeatureCollection",
            features: [
              ...prevState.features,
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [longitude.toFixed(15), latitude.toFixed(15)],
                },
                properties: {},
              },
            ],
          }));
        });

        setMap(mapInstance);
      });

      mapInstance.on("move", () => {
        const userCoordinates = mapInstance.getCenter();
        setCurrentLocation({ lng: userCoordinates.lng.toFixed(15), lat: userCoordinates.lat.toFixed(15) });
      });

      setMap(mapInstance);
    };

    if (!map) initializeMap();
  }, [map, startLocation]);

  return (
    <div>
      <div id="map-container" style={{ width: "70vw", height: "60vh" }}></div>
      {startLocation ? (
        <div>
          <h2>Start Location</h2>
          <p>Longitude: {startLocation.lng}</p>
          <p>Latitude: {startLocation.lat}</p>
        </div>
      ) : (
        <p>Loading start location...</p>
      )}
      {currentLocation ? (
        <div>
          <h2>Current Location</h2>
          <p>Longitude: {currentLocation.lng}</p>
          <p>Latitude: {currentLocation.lat}</p>
        </div>
      ) : (
        <p>Loading current location...</p>
      )}
    </div>
  );
  
};

export default Mapbx;
