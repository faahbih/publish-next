export type MapProperties = {
  lat: number;
  lng: number;
  zoom: number;
  color: {
    key: string;
    value: {
      [name: string]: {
        color: string;
        weight: number;
        fillOpacity: number;
        fillColor: string;
      };
    };
  };
};

export type LegendValue = {
  icon: string;
  fillColor: string;
  label: string;
};

export enum ViewType {
  SCENARIO,
  ATTRIBUTE,
  BORDER,
  BACKGROUND,
}

export type View = {
  name: string;
  type: ViewType;
  visible: boolean;
  description: string;
  data?: GeoJSON.GeoJsonObject;
};

export enum TimelineOption {
  ABSOLUTE = 'Absolute values',
  DIFFERENCE = 'Difference to 2000',
}
