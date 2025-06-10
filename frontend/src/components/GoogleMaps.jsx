import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';


const API_KEY = 'AIzaSyA9QCmGCGK3bjdB6bMoHvITiyw9QPpnJsc';

// Map component that renders the actual map
const MapComponent = ({ center, zoom, markers = [] }) => {
  const ref = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  // Add markers when map is loaded
  useEffect(() => {
    if (map && markers.length > 0) {
      markers.forEach(marker => {
        new window.google.maps.Marker({
          position: marker.position,
          map: map,
          title: marker.title,
        });
      });
    }
  }, [map, markers]);

  return <div ref={ref} style={{ width: '100%', height: '400px' }} />;
};

// Loading component
const LoadingComponent = ({ status }) => {
  return <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
      <p className="text-gray-600">Loading Google Maps...</p>
      {status === Status.FAILURE && (
        <p className="text-red-500 mt-2">Failed to load Google Maps</p>
      )}
    </div>
  </div>;
};

// Main App component
const GoogleMapsApp = () => {
  const [center, setCenter] = useState({ lat: -26.2041, lng: 28.0473 }); // Johannesburg
  const [markers, setMarkers] = useState([
    {
      position: { lat: -26.2041, lng: 28.0473 },
      title: 'Johannesburg CBD'
    },
    {
      position: { lat: -26.1367, lng: 28.0143 },
      title: 'Sandton City'
    },
    {
      position: { lat: -26.1520, lng: 28.0900 },
      title: 'OR Tambo International Airport'
    }
  ]);


  const handleGetUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCenter(userLocation);
          setMarkers([{
            position: userLocation,
            title: 'Your Location'
          }]);
        },
        (error) => {
          console.error('Error getting user location:', error);
          alert('Unable to get your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Google Maps Integration</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4 flex gap-4">
         
          <button 
            onClick={handleGetUserLocation}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded transition-colors"
          >
            Use My Location
          </button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Wrapper apiKey={API_KEY} render={LoadingComponent}>
            <MapComponent 
              center={center} 
              zoom={12} 
              markers={markers}
            />
          </Wrapper>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Current Center:</strong> {center.lat.toFixed(4)}, {center.lng.toFixed(4)}</p>
          <p><strong>Markers:</strong> {markers.length}</p>
        </div>
      </div>


    </div>
  );
};

export default GoogleMapsApp;