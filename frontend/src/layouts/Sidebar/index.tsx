import React from 'react';

import clsx from 'clsx';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';

import Main from 'layouts/Main';
import SidebarList from './SidebarList';
import { Icon, Tooltip } from '@material-ui/core';
import Resume from 'components/Resume';
import SideContent from 'components/SideContent';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 24,
      '& > span': {
        marginLeft: '-8px',
      },
      display: 'none',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7) + 4,
      },
      display: 'none',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
    contentInfo: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    contentInfoText: {
      display: 'flex',
      alignItems: 'center',
    },
    subtitle: {
      marginLeft: '24px',
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    download: {
      marginTop: '-5px',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
    },
    icon: {
      marginRight: 8,
      position: 'relative',
      top: '7px',
    },
  }),
);

export default function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [resumeOpen, setResumeOpen] = React.useState(
    process.env.NODE_ENV === 'production',
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleResumeOpen = () => {
    setResumeOpen(true);
  };

  const handleResumeClose = () => {
    setResumeOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.contentInfo}>
            <div className={classes.contentInfoText}>
              <Typography variant="h6">RESTORE+</Typography>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Future environmental and agricultural impacts of Brazil’s Forest
                Code
              </Typography>
            </div>
            <div>
              <Tooltip title="Download data" arrow>
                <Button className={classes.download}>
                  <a
                    href="https://www.dropbox.com/s/aj1rwz3bu9td66n/restoreplus.zip?raw=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                  >
                    Download <Icon className={classes.icon}>download</Icon>
                  </a>
                </Button>
              </Tooltip>
              <Button onClick={handleResumeOpen} color="inherit">
                About <Icon style={{ marginLeft: 8 }}>info_outlined</Icon>
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <SidebarList />
      </Drawer>

      <SideContent></SideContent>

      <Resume open={resumeOpen} onClose={handleResumeClose}></Resume>
      <main className={classes.content}>
        <Main />
      </main>
    </div>
  );
}
