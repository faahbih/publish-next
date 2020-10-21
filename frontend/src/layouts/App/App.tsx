import React from 'react';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Sidebar from 'layouts/Sidebar';
import Legend from 'components/Legend';

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
      <Legend />
    </ThemeProvider>
  );
}

export default App;
