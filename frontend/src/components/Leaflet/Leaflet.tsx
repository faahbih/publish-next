import React from 'react';

import {
  Map,
  TileLayer,
  ZoomControl,
  GeoJSON,
  Marker,
  Popup,
} from 'react-leaflet';
import rawData from 'assets/brazil-forest-code.json';

import { Line } from 'react-chartjs-2';

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

  const spatialData = rawData as GeoJSON.GeoJsonObject;

  // https://stackoverflow.com/questions/59196857/how-to-style-leaflet-popup-width-and-h%D0%B5ight-on-reactjs
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'My Second dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [15, 109, 1, 23, 78, 9, 200],
      },
    ],
  };

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
      <GeoJSON
        data={spatialData}
        style={geoJSONStyle}
        onEachFeature={onEachFeature}
      />
      <Marker position={properties}>
        <Popup minWidth={400}>
          <Line data={chartData} />
        </Popup>
      </Marker>
    </Map>
  );
}

export default Leaflet;
