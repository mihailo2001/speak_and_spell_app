import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const MapComponent = () => {
    const position = [42.77241312752552, 18.947009387582778];

    return (
        <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={L.icon({ iconUrl: markerIconPng, shadowUrl: markerShadowPng })}>
                <Popup>
                    9 Josipa Sladea, Niksic 81400, Crna Gora
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
