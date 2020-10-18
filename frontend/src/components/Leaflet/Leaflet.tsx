import React from 'react';

import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { LatLng } from 'leaflet';

function Leaflet() {
  const position = {
    lat: -23.17944,
    lng: -45.88694,
  } as LatLng;

  return (
    <Map id="mapId" center={position} zoom={13} zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomright" />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup.
          <br />
          Easily customizable.
        </Popup>
      </Marker>
    </Map>
  );
}

export default Leaflet;
