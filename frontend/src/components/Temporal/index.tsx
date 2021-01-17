import React from 'react';
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {
  Card,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import debounce from 'lodash.debounce';
import { useDispatch, useTrackedState } from 'store';
import { TimelineOption } from 'containers/Types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      position: 'fixed',
      zIndex: 1198,
      display: 'flex',
      bottom: '16px',
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        left: 0,
        bottom: 0,
        zIndex: 1200,
      },
    },
    slider: {
      width: 500 + theme.spacing(3) * 2,
      display: 'block',
      background: '#fff',
      padding: '8px 26px 0',
    },
    switch: {
      marginLeft: '60px',
      marginBottom: '2px',
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
    label: '2000',
  },
  {
    value: 10,
    label: '2005',
  },
  {
    value: 20,
    label: '2010',
  },
  {
    value: 30,
    label: '2015',
  },
  {
    value: 40,
    label: '2020',
  },
  {
    value: 50,
    label: '2025',
  },
  {
    value: 60,
    label: '2030',
  },
  {
    value: 70,
    label: '2035',
  },
  {
    value: 80,
    label: '2040',
  },
  {
    value: 90,
    label: '2045',
  },
  {
    value: 100,
    label: '2050',
  },
];

const TemporalSlider = withStyles({
  root: {
    color: '#757575',
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
  const dispatch = useDispatch();
  const state = useTrackedState();

  const [sliderValue, setSliderValue] = React.useState<number | number[]>(0);
  const [switchState, setSwitchState] = React.useState({
    checkedA: false,
    checkedB: true,
  });
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (checked) {
      dispatch({
        type: 'SET_TIMELINE_OPTION',
        option: TimelineOption.DIFFERENCE,
      });
    } else {
      dispatch({
        type: 'SET_TIMELINE_OPTION',
        option: TimelineOption.ABSOLUTE,
      });
    }

    setSwitchState({ ...switchState, [event.target.name]: checked });
  };

  const getSwitchLabel = (): string => {
    return state.currentTimelineOption.valueOf();
  };

  const handleClickPlay = () => {
    setButtonDisabled(true);

    const indexMark = marks.findIndex((mark) => mark.value === sliderValue);
    if (indexMark > -1) {
      let index = 0;

      const sliderEvent = { timeline: true };
      handleChangeSlider(sliderEvent, 0);

      const timelineInterval = setInterval(() => {
        const position = marks[index];
        handleChangeSlider(sliderEvent, position.value);

        index++;
        if (index > indexMark) {
          clearInterval(timelineInterval);
          setButtonDisabled(false);
        }
      }, 500);
    }
  };

  const handleChangeSlider = (
    event: any,
    newSliderValue: number | number[],
  ) => {
    if ((event && event.timeline) || sliderValue !== newSliderValue) {
      setSliderValue(newSliderValue);

      const debounceSlider = debounce(() => {
        const mark = marks.find((mark) => mark.value === newSliderValue);
        if (mark) {
          dispatch({ type: 'SET_CURRENT_YEAR', year: Number(mark.label) });
        }
      }, 300);

      debounceSlider();
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.slider}>
        <Typography gutterBottom></Typography>

        <FormControlLabel
          className={classes.switch}
          control={
            <Switch
              size="small"
              checked={switchState.checkedA}
              onChange={handleChangeSwitch}
              name="checkedA"
              color="primary"
            />
          }
          label={getSwitchLabel()}
        />

        <div className={classes.content}>
          <IconButton
            aria-label="play"
            className={classes.icon}
            disabled={buttonDisabled}
            onClick={handleClickPlay}
          >
            <PlayArrowIcon />
          </IconButton>
          <TemporalSlider
            aria-label="slider"
            value={sliderValue}
            step={null}
            marks={marks}
            valueLabelDisplay="off"
            disabled={buttonDisabled}
            onChange={handleChangeSlider}
          />
        </div>
      </Card>
    </div>
  );
}
