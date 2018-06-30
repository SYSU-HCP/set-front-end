import { Tabs } from 'antd';
import * as React from 'react';
import Distribution from './Distribution';
import Region from './Region';
const TabPane = Tabs.TabPane;

export default class NeuralNetworks extends React.PureComponent {
  public render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Region" key="1">
          <Region />
        </TabPane>
        <TabPane tab="Unit" key="2">Content of Tab Pane 2</TabPane>
        <TabPane tab="Distribution" key="3">
          <Distribution />
        </TabPane>
      </Tabs>      
    )
  }
}