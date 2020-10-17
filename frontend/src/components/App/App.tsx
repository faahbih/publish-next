import React from 'react';
import Button from '@material-ui/core/Button';

import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Logo path: {logo}</p>
        <p>NODE_ENV: {process.env.NODE_ENV}</p>
        <p>REACT_APP_FOO: {process.env.REACT_APP_FOO}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </header>
    </div>
  );
}

export default App;