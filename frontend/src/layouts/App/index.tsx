import React from 'react';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';
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

  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
    </ThemeProvider>
  );
}
