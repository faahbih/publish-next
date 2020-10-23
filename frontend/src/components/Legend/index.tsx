import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Icon from '@material-ui/core/Icon';
import './style.scss';
import { Typography } from '@material-ui/core';
import { LegendValue, MapProperties } from 'containers/Types';

type LegendProps = {
  mapProperties: MapProperties;
};

const useStyles = makeStyles({
  root: {
    minWidth: 272,
    position: 'absolute',
    right: '16px',
    top: '70px',
    zIndex: 1100,
  },
  cardHeader: {
    padding: '8px 16px',
    background: '#212121',
    color: 'white',
    textTransform: 'uppercase',
    '& span': {
      fontSize: '16px',
      fontWeight: 'bold',
      letterSpacing: '.03em',
    },
  },
  title: {
    fontSize: 14,
    display: 'flex',
    justifyContent: 'center',
    padding: '8px 0 0',
    marginBottom: 0,
  },
});

function legendValuesFactory(mapProperties: MapProperties): LegendValue[] {
  const values: LegendValue[] = [];

  for (const label of Object.keys(mapProperties.color.value).sort()) {
    const value = mapProperties.color.value[label];
    values.push({
      icon: 'fiber_manual_record',
      fillColor: value.fillColor,
      label,
    });
  }

  return values;
}

export default function Legend({ mapProperties }: LegendProps) {
  const classes = useStyles();
  const values = legendValuesFactory(mapProperties);
  const hasValues = !values || !values.length;

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.cardHeader} title="Legend" />
      <CardContent>
        {hasValues ? (
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            No layers selected
          </Typography>
        ) : (
          <div className="Bullet">
            {values.map((value: LegendValue) => (
              <div className="Bullet-content" key={value.label}>
                <Icon style={{ color: value.fillColor }}>{value.icon}</Icon>
                <p className="Bullet-color-p">{value.label}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
