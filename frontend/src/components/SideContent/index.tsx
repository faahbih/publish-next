import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './style.scss';
import SideChipList from './SideChipList';
import { ViewType } from 'containers/Types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 275,
      position: 'absolute',
      zIndex: 1200,
      left: 56,
      height: '100%',
    },
    cardContent: {
      padding: '86px 16px',
    },
    main: {
      width: '100%',
    },
    customAccordionSummary: {
      padding: '0px 8px',
    },
    customAccordionDetails: {
      flexWrap: 'wrap',
      padding: 8,
    },
    heading: {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: theme.typography.fontWeightMedium,
    },
    chipSpacing: {
      margin: '2px 4px',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginLeft: '12px',
    },
  }),
);

const textLU = `Large Unit (200x200Km at Equator)`;

export default function SideContent() {
  const classes = useStyles();

  const handleClick = (event: any) => {
    console.info('You clicked the Chip.', event);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <div className={classes.main}>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              className={classes.customAccordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Scenario</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.customAccordionDetails}>
              <SideChipList
                viewType={ViewType.SCENARIO}
                className={classes.chipSpacing}
                backgroundColorOnActive={{ FC: '#008000', NoFC: '#EB4B35' }}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded={true}>
            <AccordionSummary
              className={classes.customAccordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Attribute</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.customAccordionDetails}>
              <SideChipList
                viewType={ViewType.ATTRIBUTE}
                className={classes.chipSpacing}
                backgroundColorOnActive={'#757575'}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded={true}>
            <AccordionSummary
              className={classes.customAccordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Border</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.customAccordionDetails}>
              <SideChipList
                viewType={ViewType.BORDER}
                className={classes.chipSpacing}
                backgroundColorOnActive={'#757575'}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded={true}>
            <AccordionSummary
              className={classes.customAccordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Background</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.customAccordionDetails}>
              <Tooltip title="ColRow (50x50km at Equator)" arrow>
                <Chip
                  label="CR"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.chipSpacing}
                />
              </Tooltip>
              <Tooltip title={textLU} arrow>
                <Chip
                  label="LU"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.chipSpacing}
                />
              </Tooltip>
            </AccordionDetails>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
