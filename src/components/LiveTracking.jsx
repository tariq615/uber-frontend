import React, { useState, useEffect, useCallback } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "../../public/styles/style.css";

const MapboxLiveLocation = ({color}) => {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });
  const [userLocation, setUserLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Get user's current location
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      return;
    }

    const successHandler = (position) => {
      const { latitude, longitude } = position.coords;
      setViewport(prev => ({
        ...prev,
        latitude,
        longitude
      }));
      setUserLocation({ latitude, longitude });
    };

    const errorHandler = (error) => {
      console.error('Error getting location:', error.message);
      // Fallback to default coordinates if location access is denied
      if (error.code === error.PERMISSION_DENIED) {
        setViewport(prev => ({
          ...prev,
          latitude: 51.5074,
          longitude: -0.1278
        }));
      }
    };

    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000
    };

    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Handle map load
  const handleMapLoad = useCallback((event) => {
    const map = event.target;
    map.resize();
    setMapLoaded(true);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Map
        {...viewport}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_API}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={evt => setViewport(evt.viewState)}
        onLoad={handleMapLoad}
        attributionControl={false}
      >
        {mapLoaded && userLocation && (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
            anchor="bottom"
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: color,
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              
            }} />
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default MapboxLiveLocation;