import React, { Component } from 'react';
import './mainTab.scss';

export default class MainTab extends Component {
  state = {
    currentTab: 'pages',
  }
  handleClick = (tab) => {
    this.setState({
      currentTab: tab,
    });
  }
  render() {
    return (
      <ul className="mainTab">
        <li
          className={this.state.currentTab === 'pages' ? 'active' : ''}
          onClick={() => this.handleClick('pages')}
        >
          <i className="fa fa-sitemap fa-2x" aria-hidden="true" />
          <span>PAGES</span>
        </li>
        <li
          className={this.state.currentTab === 'notes' ? 'active' : ''}
          onClick={() => this.handleClick('notes')}
        >
          <i className="fa fa-file-text fa-2x" aria-hidden="true" />
          <span>NOTES</span>
        </li>
        <li
          className={this.state.currentTab === 'discuss' ? 'active' : ''}
          onClick={() => this.handleClick('discuss')}
        >
          <i className="fa fa-commenting fa-2x" aria-hidden="true" />
          <span>DISCUSS</span>
        </li>
        <li
          className={this.state.currentTab === 'console' ? 'active' : ''}
          onClick={() => this.handleClick('console')}
        >
          <i className="fa fa-terminal fa-2x" aria-hidden="true" />
          <span>CONSOLE</span>
        </li>
      </ul>
    );
  }
}
