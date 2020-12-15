import React from 'react';

import { Map, TileLayer, ZoomControl, GeoJSON } from 'react-leaflet';

import Report from 'components/Report';
import { Layer } from 'leaflet';
import Legend from 'components/Legend';
import { MapProperties, View } from 'containers/Types';
import Temporal from 'components/Temporal';
import { FeatureService } from './feature.service';
import { useDispatch, useTrackedState } from 'store';

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
      Amazonia: {
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
  const dispatch = useDispatch();
  const state = useTrackedState();

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

  const loadGeoJSON = (views: View[]): (JSX.Element | undefined)[] => {
    return views
      .filter((view?: View) => view && view.visible)
      .map((view?: View) => {
        return (
          <GeoJSON
            key={view!.name}
            data={view!.data}
            style={geoJSONStyle}
            onEachFeature={onEachFeature}
          />
        );
      });
  };

  React.useEffect(() => {
    const featureService = FeatureService.getInstance();

    featureService.getBiomes().then((view: View) => {
      dispatch({ type: 'ADD_BORDER', view });
    });

    featureService.getBrazil().then((view: View) => {
      dispatch({ type: 'ADD_BORDER', view });
    });
  }, [dispatch]);

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

        {loadGeoJSON(state.border)}
      </Map>
      <Legend mapProperties={userDefinedProperties} />
      <Report
        open={dialogOpen}
        properties={featureSelected?.properties}
        onClose={handleDialogClose}
      />
      <Temporal></Temporal>
    </div>
  );
}
