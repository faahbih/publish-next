import { MapControl, withLeaflet } from 'react-leaflet';
import L from 'leaflet';

import './Legend.scss';

class Legend extends MapControl {
  createLeafletElement(props) {
    console.log(props);
  }

  componentDidMount() {
    // get color depending on population density value
    const getColor = (d) => {
      return d > 1000
        ? '#800026'
        : d > 500
        ? '#BD0026'
        : d > 200
        ? '#E31A1C'
        : d > 100
        ? '#FC4E2A'
        : d > 50
        ? '#FD8D3C'
        : d > 20
        ? '#FEB24C'
        : d > 10
        ? '#FED976'
        : '#FFEDA0';
    };

    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      const content = ['<h4>LEGEND</h4>'];

      const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        content.push(
          '<i style="background:' +
            getColor(from + 1) +
            '"></i> ' +
            from +
            (to ? '&ndash;' + to : '+'),
        );
      }

      div.innerHTML = content.join('<br>');
      console.log(content);
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}

export default withLeaflet(Legend);
