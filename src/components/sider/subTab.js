import React, { Component } from 'react';
import './subTab.scss';

export default class extends Component {
  render() {
    return (
      <div className="subTab">
        <div className="header">
          <div className="currentMainTab">
            <span>PAGES</span>
          </div>
          <div className="title">
            <span>实训展示平台首页</span>
          </div>
        </div>
        <div className="searchContainer">
          <input placeholder="Search" className="search" />
        </div>
      </div>
    );
  }
}
