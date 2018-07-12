import * as React from 'react';

import { Layout, Menu } from 'antd';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';

import withMeta from './components/WithMeta';

import routes from './routes';

// import Home from './pages/Home';

import './App.css';

const { Sider, Content } = Layout;

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Layout style={{ height: '100%' }}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width={160}
          >
            <div className="logo">
              2018年<br/>实训效果展示平台
            </div>
            { this.renderMenu() }
          </Sider>
          <Layout>
            {/* <Header className="header" style={{ background: '#fff', padding: '0 40px' }}>
              <h1>实训成果展示平台</h1>
            </Header> */}
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
        defaultSelectedKeys={[location.pathname === '/' ? routes[0].path : location.pathname]}
      >
        {/* <Menu.Item key="/"><Link to='/'>实训展示平台首页</Link></Menu.Item> */}
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
        <Redirect exact={true} path='/' to={routes[0].path} />
        { routes.map((route, index) => {
          return (
            <Route
              path={route.path}
              key={index}
              component={withMeta(route.component, route.meta)}
            />
          )
        })}
      </Switch>
    );
  }
}

export default App;
