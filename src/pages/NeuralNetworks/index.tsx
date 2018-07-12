import { Tabs } from 'antd';
import * as React from 'react';
import Distribution from './Distribution';
import Region from './Region';
import Unit from './unit';
const TabPane = Tabs.TabPane;

interface IState {
  tab: string
}

const tabs = ['region', 'unit', 'distribution']

export default class NeuralNetworks extends React.PureComponent<any, IState> {
  public state: IState = {
    tab: tabs[0]
  }

  public goNext = () => {
    const { tab } = this.state
    const index = tabs.indexOf(tab)
    this.setState({
      tab: tabs[(index + 1) % tabs.length]
    })
  }

  public onTabChange = (tab:string) => {
    this.setState({
      tab
    })
  }

  public render() {
    const { tab } = this.state

    return (
      <Tabs onChange={this.onTabChange} activeKey={tab} className="neural-networks" style={{ padding: '20px 0' }} >
        <TabPane tab="Region" key={tabs[0]}>
          <Region goNext={this.goNext} />
        </TabPane>
        <TabPane tab="Unit" key={tabs[1]}>
          <Unit />
        </TabPane>
        <TabPane tab="Distribution" key={tabs[2]}>
          <Distribution />
        </TabPane>
      </Tabs>      
    )
  }
}