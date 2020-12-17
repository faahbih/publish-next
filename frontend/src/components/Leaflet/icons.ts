import L from 'leaflet';

const iconPositive = new L.Icon({
  iconUrl: require('../../assets/img/arrow_upward-black-18dp.svg'),
  iconSize: [16, 16],
  iconAnchor: [11, 8],
});

const iconNegative = new L.Icon({
  iconUrl: require('../../assets/img/arrow_downward-black-18dp.svg'),
  iconSize: [16, 16],
  iconAnchor: [11, 8],
});

const iconEquals = new L.Icon({
  iconUrl: require('../../assets/img/8x8-00000000.png'),
  iconSize: [8, 8],
  iconAnchor: [4, 0],
});

export { iconPositive, iconNegative, iconEquals };
