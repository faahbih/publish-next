import React from 'react';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { AppContext, AppProps, propsDefault } from 'contexts/AppContext';
import Sidebar from 'layouts/Sidebar';

export default function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#212121',
      },
      secondary: {
        main: '#FEBF0F',
      },
    },
  });

  const [props, setProps] = React.useState<AppProps>(propsDefault);
  const state = { props, setProps };

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={state}>
        <Sidebar />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
