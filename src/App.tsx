import * as React from 'react';

import { Layout, Menu } from 'antd';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import withMeta from './components/WithMeta';

import routes from './routes';

import Home from './pages/Home';

import './App.css';

const { Header, Sider, Content } = Layout;

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Layout style={{ height: '100%' }}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
          >
            <div className="logo" />
            { this.renderMenu() }
          </Sider>
          <Layout>
            <Header className="header" style={{ background: '#fff', padding: '0 40px' }}>
              <h1>实训成果展示平台</h1>
            </Header>
            <Content style={{ margin: '24px 16px 0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: 24, background: '#fff', height: '100%', flexGrow: 1 }}>
                { this.renderRoutes() }
              </div>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }

  private renderMenu() {
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/"><Link to='/'>实训展示平台首页</Link></Menu.Item>
        { 
          routes.map(
            (route, index) => (
              <Menu.Item key={route.path}>
                <Link to={route.path}>
                  {`${route.meta.name}-${route.meta.TA}`}
                </Link>
              </Menu.Item>
            )
          )
        }
      </Menu>
    );
  }

  private renderRoutes() {
    return (
      <Switch>
        <Route exact={true} path='/' component={Home} />
        { routes.map((route, index) => (<Route path={route.path} key={index} component={withMeta(route.component, route.meta)} />))}
      </Switch>
    );
  }
}

export default App;
