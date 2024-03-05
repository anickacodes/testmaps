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

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: "map-container",
        style: "mapbox://styles/nicka299/cltcfn6vy00ii01qq3lac7q7k",
        center: [-73.950863, 40.734917],
        zoom: 11,
      });

      mapInstance.on("style.load", () => {
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

        const routeSource = {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        };

        mapInstance.addSource("route", routeSource);

        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: "metric",
          profile: "mapbox/walking",
          alternatives: false,
          geometries: "geojson",
          controls: {
            instructions: true,
          },
          voiceInstructions: true,
        });

        mapInstance.addControl(directions, "bottom-left");

        // Add user's path
        mapInstance.addSource("user-path", {
          type: "geojson",
          data: userPath,
        });
        mapInstance.addLayer({
          id: "user-path",
          type: "line",
          source: "user-path",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#ff0000",
            "line-width": 4,
          },
        });

        const geolocateControl = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        });
        mapInstance.addControl(geolocateControl);

        setMap(mapInstance);
      });

      mapInstance.on("move", () => {
        const userCoordinates = mapInstance.getCenter();
        setUserPath((prevState) => ({
          type: "FeatureCollection",
          features: [
            ...prevState.features,
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [userCoordinates.lng, userCoordinates.lat],
              },
              properties: {},
            },
          ],
        }));
      });

      setMap(mapInstance);
    };

    if (!map) initializeMap();
  }, [map, userPath]);

  return (
    <div
      id="map-container"
      style={{
        width: "70vw",
        height: "60vh",
      }}
    ></div>
  );
};

export default Mapbx;
