import React from 'react';
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { Card, IconButton, Typography } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      position: 'fixed',
      zIndex: 1299,
      display: 'flex',
      bottom: '16px',
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        left: 0,
        bottom: 0,
      },
    },
    slider: {
      width: 500 + theme.spacing(3) * 2,
      display: 'block',
      background: '#fff',
      padding: '16px 24px 8px',
    },
    content: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      marginRight: '24px',
    },
    margin: {
      height: theme.spacing(3),
    },
  }),
);

const TempShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
  {
    value: 0,
  },
  {
    value: 20,
  },
  {
    value: 40,
  },
  {
    value: 60,
  },
  {
    value: 80,
  },
  {
    value: 100,
  },
];

const TemporalSlider = withStyles({
  root: {
    color: '#eb4b35',
    height: 2,
    padding: '16px 0',
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: TempShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: TempShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 12px)',
    top: -18,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

export default function Temporal() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.slider}>
        <Typography gutterBottom></Typography>
        <div className={classes.content}>
          <IconButton aria-label="play" className={classes.icon}>
            <PlayArrowIcon />
          </IconButton>
          <TemporalSlider
            aria-label="slider"
            defaultValue={40}
            marks={marks}
            valueLabelDisplay="on"
          />
        </div>
      </Card>
    </div>
  );
}
