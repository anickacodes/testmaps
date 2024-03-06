import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "../App.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS;

const Mapbx = () => {
  const [map, setMap] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pathCoordinates, setPathCoordinates] = useState([]);

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: "map-container",
        style: "mapbox://styles/nicka299/cltcfn6vy00ii01qq3lac7q7k",
        center: [-73.950863, 40.734917],
        zoom: 11,
      });

      const vendors = [
        {
          name: "Henry",
          color: "rgb(102, 212, 157)",
          Active: true,
          lngLat: [-73.978815, 40.732109],
        },
        {
          name: "Charlie",
          color: "rgb(102, 212, 157)",
          Active: true,
          lngLat: [-73.972715, 40.737409],
        },
        {
          name: "Robert",
          color: "rgb(102, 212, 157)",
          Active: true,
          lngLat: [-73.999715, 40.739409],
        },
      ];

      vendors.forEach(({ name, color, lngLat }) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);

        const marker = new mapboxgl.Marker({
          rotation: -22,
          color,
          scale: 0.77,
        })
          .setLngLat(lngLat)
          .setPopup(popup)
          .addTo(mapInstance);
      });

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/walking",
        alternatives: false,
        geometries: "geojson"
      });

      mapInstance.addControl(directions, "bottom-left");

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });

      mapInstance.addControl(geolocate);


      setMap(mapInstance);
    };

    if (!map) initializeMap();
  }, [map, startLocation, pathCoordinates]);

 
  
  return (
    <div>
      <div
        id="map-container"
        style={{
          width: "70vw",
          height: "60vh",
        }}
      ></div>
      <div>
      <div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>
          <p>
            Start Location: {startLocation}
          </p>

          <p>
            Current Location: {currentLocation}
          </p>
  
      </div>
    </div>
  );
};

export default Mapbx;


map.current.on('move', () => {
  setLng(map.current.getCenter().lng.toFixed(4));
  setLat(map.current.getCenter().lat.toFixed(4));
  setZoom(map.current.getZoom().toFixed(2));
});