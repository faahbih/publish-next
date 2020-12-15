import React from 'react';

import { Map, TileLayer, ZoomControl, GeoJSON } from 'react-leaflet';

import Report from 'components/Report';
import { Layer } from 'leaflet';
import Legend from 'components/Legend';
import { MapProperties, View } from 'containers/Types';
import Temporal from 'components/Temporal';
import { FeatureService } from './feature.service';
import { AppContext } from 'contexts/AppContext';

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
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const appState = React.useContext(AppContext);

  const [
    featureSelected,
    setFeatureSelected,
  ] = React.useState<GeoJSON.Feature | null>(null);

  const [biomesData, setBiomesData] = React.useState<View>();
  // const [biomesLabelsData, setBiomesLabelsData] = React.useState<View>();
  const [brazilData, setBrazilData] = React.useState<View>();
  // const [brazilLabelsData, setBrazilLabelsData] = React.useState<View>();
  // const views = [
  //   biomesData,
  //   biomesLabelsData,
  //   brazilData,
  //   brazilLabelsData,
  // ];

  const views = [biomesData, brazilData];

  const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
    layer.on('click', () => {
      setDialogOpen(true);
      setFeatureSelected(feature);
      console.log(appState);
    });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const loadGeoJSON = (): (JSX.Element | undefined)[] => {
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
      setBiomesData(view);
      appState.props.border.views.push(view);
      appState.setProps({ ...appState.props });
    });

    featureService.getBrazil().then((view: View) => {
      setBrazilData(view);
      appState.props.border.views.push(view);
      appState.setProps({ ...appState.props });
    });
  }, []);

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

        {loadGeoJSON()}
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
