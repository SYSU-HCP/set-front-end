import { Tabs } from 'antd';
import * as React from 'react';
import Distribution from './Distribution';
import Region from './Region';
import Unit from './unit';
const TabPane = Tabs.TabPane;

export default class NeuralNetworks extends React.PureComponent {
  public render() {
    return (
      <Tabs defaultActiveKey="1" className="neural-networks" style={{ padding: '20px 0' }} >
        <TabPane tab="Region" key="1">
          <Region />
        </TabPane>
        <TabPane tab="Unit" key="2">
          <Unit />
        </TabPane>
        <TabPane tab="Distribution" key="3">
          <Distribution />
        </TabPane>
      </Tabs>      
    )
  }
}