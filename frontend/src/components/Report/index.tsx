import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Line } from 'react-chartjs-2';

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
  labels: string[],
  datasets: { [name: string]: any },
) {
  const property = datasets[datasetName];
  return {
    labels,
    datasets: [
      {
        label: 'FC',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(0, 128, 0, 0.8)',
        borderColor: 'rgba(0, 128, 0, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0, 128, 0, 1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0, 128, 0, 1)',
        pointHoverBorderColor: 'rgba(220,220,220, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: property.F.data,
      },
      {
        label: 'NoFC',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(235,75,53, 0.8)',
        borderColor: 'rgba(235,75,53, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(235,75,53, 1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(235,75,53, 1)',
        pointHoverBorderColor: 'rgba(220,220,220, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: datasets.Soy.N.data,
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
            labelString: 'Native Vegetation (Mha)',
          },
        },
      ],
    },
  };
}

export default function Report({ open, properties, onClose }: ReportProps) {
  const [scroll] = React.useState<DialogProps['scroll']>('paper');
  const descriptionElementRef = React.useRef<HTMLElement>(null);

  const scenariosNames = ['N', 'F'];
  const labels = ['2010', '2020', '2030', '2040', '2050'];
  const datasetNames = ['Soy', 'Crp', 'Grs', 'Nati', 'CNat'];

  const charts: any = [];
  if (properties) {
    const datasets = datasetsFactory(properties, scenariosNames, labels);
    datasetNames.forEach((selectedName: string) => {
      charts.push({
        name: selectedName,
        data: chartDataFactory(selectedName, labels, datasets),
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
      maxWidth={'md'}
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
              <DialogTitle id="alert-dialog-title">{entry.name}</DialogTitle>
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
