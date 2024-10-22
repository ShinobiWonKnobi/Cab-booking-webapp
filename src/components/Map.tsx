import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const mockCoordinates: { [key: string]: [number, number] } = {
  'SRM KTR, Potheri': [12.8231, 80.0442],
  'Chennai Central': [13.0827, 80.2707],
  'Marina Beach': [13.0500, 80.2824],
  'Mahabalipuram': [12.6269, 80.1928],
  'Kanchipuram': [12.8342, 79.7036],
};

interface MapComponentProps {
  from: string;
  to: string;
  userLocation: [number, number] | null;
  driverLocation: [number, number] | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ from, to, userLocation, driverLocation }) => {
  const fromCoords = mockCoordinates[from] || [12.8231, 80.0442]; // Default to SRM KTR
  const toCoords = mockCoordinates[to] || [13.0827, 80.2707]; // Default to Chennai Central

  return (
    <MapContainer center={fromCoords} zoom={10} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {from && <Marker position={fromCoords}>
        <Popup>From: {from}</Popup>
      </Marker>}
      {to && <Marker position={toCoords}>
        <Popup>To: {to}</Popup>
      </Marker>}
      {userLocation && <Marker position={userLocation}>
        <Popup>Your Location</Popup>
      </Marker>}
      {driverLocation && <Marker position={driverLocation}>
        <Popup>Driver Location</Popup>
      </Marker>}
    </MapContainer>
  );
};

export default MapComponent;