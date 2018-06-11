import React, { Component } from 'react';
import './index.scss';
import MainTab from './mainTab';
import SubTab from './subTab';

export default class Sider extends Component {
  render() {
    return (
      <nav className="sider" style={{ display: 'fixed', height: '100%' }}>
        <MainTab />
        <SubTab />
      </nav>
    );
  }
}
