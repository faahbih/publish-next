import React from 'react';

import { Map, TileLayer, ZoomControl, GeoJSON } from 'react-leaflet';
import rawData from 'assets/brazil-forest-code.json';

type MapProperties = {
  lat: number;
  lng: number;
  zoom: number;
};

function Leaflet() {
  const properties = {
    lat: -14.35143,
    lng: -49.01675,
    zoom: 4,
  } as MapProperties;

  const geoJSONStyle = () => {
    return {
      color: '#1f2021',
      weight: 1,
      fillOpacity: 0.5,
      fillColor: '#fff2af',
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const popupContent = `
      <Popup>
        <p>Customizable Popups <br />with feature information.</p>
        <pre>Borough: <br />${feature.properties.name}</pre>
      </Popup>`;
    layer.bindPopup(popupContent);
  };

  const data = rawData as GeoJSON.GeoJsonObject;

  return (
    <Map
      id="mapId"
      center={properties}
      zoom={properties.zoom}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomright" />
      <GeoJSON data={data} style={geoJSONStyle} onEachFeature={onEachFeature} />
    </Map>
  );
}

export default Leaflet;
