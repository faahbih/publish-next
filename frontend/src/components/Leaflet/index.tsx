import React from 'react';

import { Map, TileLayer, ZoomControl, GeoJSON } from 'react-leaflet';
import rawData from 'assets/brazil-forest-code.json';

import Report from 'components/Report';
import { Layer } from 'leaflet';
import Legend from 'components/Legend';
import { MapProperties } from 'containers/Types';

const defaultProperties = {
  lat: -14.35143,
  lng: -49.01675,
  zoom: 4,
  color: {
    key: 'any',
    value: {
      default: {
        color: '#1f2021',
        weight: 1,
        fillOpacity: 0.5,
        fillColor: '#fff2af',
      },
    },
  },
} as MapProperties;

const userDefinedProperties = {
  lat: -14.35143,
  lng: -49.01675,
  zoom: 4,
  color: {
    key: 'name',
    value: {
      'Atlantic Forest': {
        color: defaultProperties.color.value.default.color,
        weight: defaultProperties.color.value.default.weight,
        fillOpacity: defaultProperties.color.value.default.fillOpacity,
        fillColor: '#d7fcae',
      },
      Pampa: {
        color: defaultProperties.color.value.default.color,
        weight: defaultProperties.color.value.default.weight,
        fillOpacity: defaultProperties.color.value.default.fillOpacity,
        fillColor: '#fcefd4',
      },
      Pantanal: {
        color: defaultProperties.color.value.default.color,
        weight: defaultProperties.color.value.default.weight,
        fillOpacity: defaultProperties.color.value.default.fillOpacity,
        fillColor: '#ffe7ff',
      },
      'Amazon Rainforest': {
        color: defaultProperties.color.value.default.color,
        weight: defaultProperties.color.value.default.weight,
        fillOpacity: defaultProperties.color.value.default.fillOpacity,
        fillColor: '#b2ff1b',
      },
      Caatinga: {
        color: defaultProperties.color.value.default.color,
        weight: defaultProperties.color.value.default.weight,
        fillOpacity: defaultProperties.color.value.default.fillOpacity,
        fillColor: '#feffb1',
      },
      Cerrado: {
        color: defaultProperties.color.value.default.color,
        weight: defaultProperties.color.value.default.weight,
        fillOpacity: defaultProperties.color.value.default.fillOpacity,
        fillColor: '#ffc6b2',
      },
    },
  },
} as MapProperties;

const spatialData = rawData as GeoJSON.GeoJsonObject;

function geoJSONStyle(feature?: GeoJSON.Feature) {
  let style = defaultProperties.color.value.default;

  if (feature) {
    const properties = feature.properties as any;
    const key = userDefinedProperties.color.key;
    const value = userDefinedProperties.color.value;
    if (properties.hasOwnProperty(key)) {
      const propertyValue = properties[key];
      if (value.hasOwnProperty(propertyValue)) {
        style = value[propertyValue];
      }
    }
  }

  return style;
}

export default function Leaflet() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [
    featureSelected,
    setFeatureSelected,
  ] = React.useState<GeoJSON.Feature | null>(null);

  const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
    layer.on('click', () => {
      setDialogOpen(true);
      setFeatureSelected(feature);
    });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Map
        id="mapId"
        center={userDefinedProperties}
        zoom={userDefinedProperties.zoom}
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
      </Map>
      <Legend mapProperties={userDefinedProperties} />
      <Report
        open={dialogOpen}
        properties={featureSelected?.properties}
        onClose={handleDialogClose}
      />
    </div>
  );
}
