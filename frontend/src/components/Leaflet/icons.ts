import L from 'leaflet';

const iconPositive = new L.Icon({
  iconUrl: require('../../assets/img/arrow_upward-black-18dp.svg'),
  iconSize: [32, 32],
  iconAnchor: [16, 4],
});

const iconNegative = new L.Icon({
  iconUrl: require('../../assets/img/arrow_downward-black-18dp.svg'),
  iconSize: [32, 32],
  iconAnchor: [16, 4],
});

const iconEquals = new L.Icon({
  iconUrl: require('../../assets/img/refresh-black-18dp.svg'),
  iconSize: [32, 32],
  iconAnchor: [16, 4],
});

export { iconPositive, iconNegative, iconEquals };
