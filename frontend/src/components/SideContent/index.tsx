import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 275,
      position: 'absolute',
      zIndex: 1199,
      left: 56,
      height: '100%',
    },
    cardContent: {
      padding: '86px 16px',
    },
    title: {
      fontSize: 14,
    },
    main: {
      width: '100%',
    },
    customAccordion: {
      boxShadow: 'none',
    },
    customAccordionDetails: {
      flexWrap: 'wrap',
      padding: 0,
    },
    heading: {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: theme.typography.fontWeightMedium,
    },
    chipSpacing: {
      margin: 8,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginLeft: '12px',
    },
  }),
);

const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

export default function Legend() {
  const classes = useStyles();
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const [age, setAge] = React.useState('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Typography>

        <div className={classes.main}>
          <Accordion className={classes.customAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Borders</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.customAccordionDetails}>
              <Tooltip title={longText} arrow>
                <Chip
                  label="Brazil"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.chipSpacing}
                />
              </Tooltip>
              <Chip
                label="Biomes"
                onClick={handleClick}
                variant="outlined"
                style={{
                  backgroundColor: '#757575',
                  color: '#fff',
                  border: 'none',
                }}
                className={classes.chipSpacing}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion className={classes.customAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Scenarios</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.customAccordionDetails}>
              <Tooltip title={longText} arrow>
                <Chip
                  label="FC"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.chipSpacing}
                />
              </Tooltip>
              <Chip
                label="NoFC"
                onClick={handleClick}
                variant="outlined"
                className={classes.chipSpacing}
                style={{
                  backgroundColor: '#EB4B35',
                  color: '#fff',
                  border: 'none',
                }}
              />

              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{ marginLeft: '14px', marginTop: '16px' }}
              >
                Select the background
              </Typography>

              <div>
                <Chip
                  label="CR"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.chipSpacing}
                  style={{
                    backgroundColor: '#757575',
                    color: '#fff',
                    border: 'none',
                  }}
                />
                <Chip
                  label="SimU"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.chipSpacing}
                />
                <Chip
                  label="LU"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.chipSpacing}
                />
              </div>

              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{ marginLeft: '14px', marginTop: '16px' }}
              >
                Select an Attribute
              </Typography>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Attribute</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Soybean</MenuItem>
                  <MenuItem value={20}>Cropland</MenuItem>
                  <MenuItem value={30}>Grassland</MenuItem>
                  <MenuItem value={30}>Native Vegetation</MenuItem>
                  <MenuItem value={30}>Native Vegetation Conversion</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          {/* <Accordion className={classes.customAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>
                Social Classes
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.customAccordionDetails}>
              <Chip
                label="Social Classes 2025"
                onClick={handleClick}
                variant="outlined"
                className={classes.chipSpacing}
              />
              <Chip
                label="Social Classes 2010"
                onClick={handleClick}
                variant="outlined"
                className={classes.chipSpacing}
              />
            </AccordionDetails>
          </Accordion> */}
        </div>
      </CardContent>
    </Card>
  );
}
