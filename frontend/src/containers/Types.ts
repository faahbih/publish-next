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
