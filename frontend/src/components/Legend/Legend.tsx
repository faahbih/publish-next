import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// import Typography from '@material-ui/core/Typography';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Icon from '@material-ui/core/Icon';
import './Legend.scss';
// import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    minWidth: 272,
    position: 'absolute',
    right: '16px',
    top: '70px',
    zIndex: 1500,
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

function Legend() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.cardHeader} title="Legend" />
      <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          No layers selected
        </Typography> */}

        <div className="Bullet">
          <div className="Bullet-content">
            <Icon style={{ color: '#FC8D62' }}>fiber_manual_record</Icon>
            <p className="Bullet-color-p">Central</p>
          </div>

          <div className="Bullet-content">
            <FiberManualRecord style={{ color: '#66C2A5' }} />
            <p className="Bullet-color-p">North</p>
          </div>

          <div className="Bullet-content">
            <FiberManualRecord style={{ color: '#8DA0CB' }} />
            <p className="Bullet-color-p">South</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Legend;
