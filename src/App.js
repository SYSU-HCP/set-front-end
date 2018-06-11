import React, { Component } from 'react';
import './App.css';
import Sider from './components/sider';
import Main from './components/main';

class App extends Component {
  render() {
    return (
      [
        <Sider key="sider" />,
        <Main key="main" />,
      ]
    );
  }
}

export default App;
