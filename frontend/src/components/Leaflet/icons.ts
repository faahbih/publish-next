import L from 'leaflet';

const iconPositive = new L.Icon({
  iconUrl: require('../../assets/img/arrow_upward-black-18dp.svg'),
  iconSize: [16, 16],
  iconAnchor: [8, 2],
});

const iconNegative = new L.Icon({
  iconUrl: require('../../assets/img/arrow_downward-black-18dp.svg'),
  iconSize: [16, 16],
  iconAnchor: [8, 2],
});

const iconEquals = new L.Icon({
  iconUrl: require('../../assets/img/brightness_1-24px.svg'),
  iconSize: [8, 8],
  iconAnchor: [4, 0],
});

export { iconPositive, iconNegative, iconEquals };
