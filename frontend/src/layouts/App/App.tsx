import React from 'react';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Sidebar from 'layouts/Sidebar';

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
    </ThemeProvider>
  );
}

export default App;
