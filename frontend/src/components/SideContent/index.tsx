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
import { SideChipProps } from './SideChip';

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

const textFC = `
Attempt to capture the future impacts of all key provisions of a
rigorously enforced Brazil's Forest Code
`;

const textNoFC = `Allow both legal and illegal deforestation at all times, which is
driven by the demand for agricultural commodities, and does not include
any policy restrictions`;

const textCrop = `Planted areas with the following crops:
barley, dry beans, cassava, corn, cotton, groundnut, palm oil, potato,
rice, sorghum, soybeans, sugarcane, sweet potato, wheat`;

const textGrass = `Pasture areas used for livestock ranching.`;
const textNatV = `Native vegetation including rainforest and savannas.`;
const textNatVC = `Native vegetation loss due to pasture and
cropland expansions`;
const textLU = `Large Unit (200x200Km at Equator)`;

export default function SideContent() {
  const classes = useStyles();

  const handleClick = (event: any) => {
    console.info('You clicked the Chip.', event);
  };

  const handleViewsChange = (newChips: SideChipProps[]) => {
    console.info('Change Layer', newChips);
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
              <Tooltip title={textFC} arrow>
                <Chip
                  label="FC"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.chipSpacing}
                />
              </Tooltip>
              <Tooltip title={textNoFC} arrow>
                <Chip
                  label="NoFC"
                  onClick={handleClick}
                  variant="outlined"
                  style={{
                    backgroundColor: '#EB4B35',
                    color: '#fff',
                    border: 'none',
                  }}
                  className={classes.chipSpacing}
                />
              </Tooltip>
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
              <Tooltip title={textFC} arrow>
                <Chip
                  label="Soybean"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.chipSpacing}
                />
              </Tooltip>

              <Tooltip title={textCrop} arrow>
                <Chip
                  label="Cropland"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.chipSpacing}
                  style={{
                    backgroundColor: '#757575',
                    color: '#fff',
                    border: 'none',
                  }}
                />
              </Tooltip>

              <Tooltip title={textGrass} arrow>
                <Chip
                  label="Grassland"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.chipSpacing}
                />
              </Tooltip>

              <Tooltip title={textNatV} arrow>
                <Chip
                  label="Native Vegetation"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.chipSpacing}
                />
              </Tooltip>

              <Tooltip title={textNatVC} arrow>
                <Chip
                  label="Native Vegetation Conversion"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.chipSpacing}
                />
              </Tooltip>
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
                className={classes.chipSpacing}
                backgroundColorOnActive={'#757575'}
                onChange={handleViewsChange}
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
