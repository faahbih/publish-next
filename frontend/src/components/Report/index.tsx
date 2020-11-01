import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Line } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';

type ReportProps = {
  open: boolean;
  properties?: GeoJSON.GeoJsonProperties;
  onClose: () => void;
};

function datasetsFactory(
  properties: GeoJSON.GeoJsonProperties,
  scenariosNames: string[],
  validLabels: string[],
  axis = 'vertical',
) {
  const datasets: any = {};

  for (const key in properties) {
    const value = properties[key];

    let name = key;
    const date = key.match(/\d+/g)?.join('');
    if (date) {
      name = key.replace(date, '');

      scenariosNames.forEach((scenarioName: string) => {
        if (name.startsWith(scenarioName)) {
          name = name.replace(scenarioName, '');

          if (!datasets.hasOwnProperty(name)) {
            datasets[name] = {};
          }

          const scenario: any = datasets[name];
          if (!scenario.hasOwnProperty(scenarioName)) {
            scenario[scenarioName] = {
              object: [],
            };
          }

          scenario[scenarioName].object.push({ x: date, y: value });
        }
      });
    }
  }

  for (const propertyName in datasets) {
    const property = datasets[propertyName];

    for (const scenarioName in property) {
      const scenario = property[scenarioName];
      const object = scenario.object as { x: any; y: any }[];

      scenario.labels = [];
      scenario.data = [];
      validLabels.forEach((label: string) => {
        const found = object.find((entry: { x: any; y: any }) =>
          axis === 'vertical' ? entry.x === label : entry.y === label,
        );
        if (found) {
          const data = axis === 'vertical' ? found.y : found.x;
          scenario.labels.push(label);
          scenario.data.push(data);
        }
      });
    }
  }

  return datasets;
}

function chartDataFactory(
  datasetName: string,
  datasets: { [name: string]: any },
) {
  const property = datasets[datasetName];
  const labels = property.F.labels;
  return {
    labels,
    datasets: [
      {
        label: 'FC',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(0, 128, 0, 1)',
        borderColor: 'rgba(0, 128, 0, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0, 128, 0, 1)',
        pointBackgroundColor: 'rgba(0, 128, 0, 1)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0, 128, 0, 1)',
        pointHoverBorderColor: 'rgba(0, 128, 0, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: property.F.data,
      },
      {
        label: 'NoFC',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(235,75,53, 1)',
        borderColor: 'rgba(235,75,53, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(235,75,53, 1)',
        pointBackgroundColor: 'rgba(235,75,53, 1)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(235,75,53, 1)',
        pointHoverBorderColor: 'rgba(235,75,53, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: property.N.data,
      },
    ],
  };
}

function chartOptionsFactory() {
  return {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Year',
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Area (Mha)',
          },
        },
      ],
    },
    tooltips: {
      mode: 'label',
      callbacks: {
        label: function (tooltipItem: any, data: any) {
          const label = data.datasets[tooltipItem.datasetIndex].label || '';
          const value = tooltipItem.yLabel
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,');
          return `${label}: ${value}`;
        },
      },
    },
  };
}

export default function Report({ open, properties, onClose }: ReportProps) {
  const [scroll] = React.useState<DialogProps['scroll']>('paper');
  const descriptionElementRef = React.useRef<HTMLElement>(null);

  const scenariosNames = ['N', 'F'];
  const labels = [
    '2000',
    '2005',
    '2010',
    '2015',
    '2020',
    '2025',
    '2030',
    '2035',
    '2040',
    '2045',
    '2050',
  ];

  const datasetNames = ['Soy', 'Crp', 'Grs', 'Nati', 'CNat'];
  const datasetLabels = [
    'Soybean',
    'Cropland',
    'Grassland',
    'Native Vegetation',
    'Native Vegetation Conversion',
  ];

  const charts: any = [];
  if (properties) {
    const datasets = datasetsFactory(properties, scenariosNames, labels);
    datasetNames.forEach((selectedName: string, index: number) => {
      const name = datasetLabels[index];
      charts.push({
        name,
        data: chartDataFactory(selectedName, datasets),
        options: chartOptionsFactory(),
      });
    });
  }

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{properties?.name}</DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        {charts.map((entry: { name: string; data: any; options: any }) => {
          return (
            <div key={entry.name}>
              <Typography
                id="alert-dialog-title"
                variant="h6"
                gutterBottom
                align="justify"
              >
                {entry.name}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                ratione sit iusto voluptate excepturi ex nam reprehenderit
                voluptatum est laboriosam corporis delectus ab placeat
                assumenda, nobis sapiente quos, dolorem earum?
              </Typography>
              <Line data={entry.data} options={entry.options} />
            </div>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
