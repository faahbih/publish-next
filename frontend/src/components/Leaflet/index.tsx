import Legend from 'components/Legend';
import Report from 'components/Report';
import Temporal from 'components/Temporal';
import {
  MapProperties,
  TimelineOption,
  View,
  ViewType,
} from 'containers/Types';
import { Layer } from 'leaflet';
import React from 'react';
import {
  GeoJSON,
  Map,
  Marker,
  TileLayer,
  Tooltip,
  ZoomControl,
} from 'react-leaflet';
import { useDispatch, useTrackedState } from 'store';
import { filter } from 'store/utils';

import { FeatureService } from './feature.service';
import { iconEquals, iconNegative, iconPositive } from './icons';

import brazilLabels from 'assets/brazil-forest-code-labels.json';

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

  const loadGeoJSON = (views: View[]): JSX.Element[] => {
    return views
      .filter((view?: View) => view && view.data && view.visible)
      .map((view?: View) => {
        return (
          <GeoJSON
            key={view!.name}
            data={view!.data!}
            style={geoJSONStyle}
            onEachFeature={onEachFeature}
          />
        );
      });
  };

  const loadTileLayer = (views: View[]): JSX.Element[] => {
    return views
      .filter((view?: View) => view && view.url && view.visible)
      .map((view?: View) => {
        return (
          <TileLayer
            url={view!.url!}
            opacity={1}
            zIndex={3000}
            minZoom={3}
            maxZoom={4}
            tms={false}
            attribution='&copy; <a href="https://iopscience.iop.org/article/10.1088/1748-9326/aaccbb" target="_blank" rel="noopener noreferrer">Soterroni et al. (2018)</a>'
          />
        );
      });
  };

  const loadAttributes = (views: View[]): JSX.Element[] => {
    const layers: JSX.Element[] = [];

    views.forEach((view) => {
      if (view && view.data && view.visible) {
        let geojson = { ...view.data } as any;

        // TODO deixar mais generico
        if (state.currentBorder && state.currentBorder === 'Brazil') {
          geojson = brazilLabels as GeoJSON.GeoJsonObject;
        }

        for (const feature of geojson.features) {
          const properties = feature.properties;

          const geometry = feature.geometry;
          const lat = geometry.coordinates[1];
          const lng = geometry.coordinates[0];
          const coords: any = [lat, lng];

          if (
            state.currentScenario &&
            state.currentAttribute &&
            state.currentYear
          ) {
            const attributesMapper: any = {
              Soybean: 'Soy',
              Cropland: 'Crp',
              Grassland: 'Grs',
              'Native Vegetation': 'Nati',
              'Native Vegetation Conversion': 'CNat',
            };

            if (attributesMapper.hasOwnProperty(state.currentAttribute)) {
              const scenario = state.currentScenario[0];
              const attribute = attributesMapper[state.currentAttribute];

              const fieldName = `${scenario}${attribute}${state.currentYear}`;
              const fieldValue = properties[fieldName];
              const fieldResult = properties[`R${fieldName}`];

              let tooltipValue = fieldValue
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, '$&,');
              if (TimelineOption.DIFFERENCE === state.currentTimelineOption) {
                const fieldDiff = Number(properties[`D${fieldName}`]);

                tooltipValue = fieldDiff
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,');
              }

              let iconSelected = iconEquals;
              if (fieldResult === 'positive') {
                iconSelected = iconPositive;
              } else if (fieldResult === 'negative') {
                iconSelected = iconNegative;
              }

              layers.push(
                <Marker
                  key={new Date().getTime() + Math.random()}
                  position={coords}
                  icon={iconSelected}
                >
                  <Tooltip
                    className={'marker-class-name'}
                    direction={'bottom'}
                    offset={[0, 20]}
                    opacity={0.9}
                    permanent
                  >
                    {`${tooltipValue}`}
                  </Tooltip>
                </Marker>,
              );
            }
          }
        }
      }
    });

    return layers;
  };

  React.useEffect(() => {
    const featureService = FeatureService.getInstance();

    featureService.getAttriburesBiomes().then((views: View[]) => {
      views.forEach((view: View) => dispatch({ type: 'ADD_VIEW', view }));
    });

    featureService.getScenarios().then((views: View[]) => {
      views.forEach((view: View) => dispatch({ type: 'ADD_VIEW', view }));
    });

    featureService.getBorders().then((views: View[]) => {
      views.forEach((view: View) => dispatch({ type: 'ADD_VIEW', view }));
    });

    featureService.getBackgrounds().then((views: View[]) => {
      views.forEach((view: View) => dispatch({ type: 'ADD_VIEW', view }));
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

        {loadGeoJSON(filter(state, ViewType.BORDER))}
        {loadAttributes(filter(state, ViewType.ATTRIBUTE))}
        {loadTileLayer(filter(state, ViewType.BACKGROUND))}
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
