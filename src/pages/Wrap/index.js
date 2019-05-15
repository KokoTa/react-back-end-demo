import React, { PureComponent, Fragment } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Layout, Dropdown, Icon } from 'antd'

import Login from '../Login'
import Home from '../Home'

import SiderMenu from '../../components/SiderMenu'
import HeaderMenu from '../../components/HeaderMenu'

import styles from './index.module.css'

const { Header, Footer, Sider, Content } = Layout

export default class Wrapper extends PureComponent {

  render() {
    return (
      <BrowserRouter>
        <Layout className={ styles.wapperLayout }>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/" render={(props) => (
              <Fragment>
                <Sider className={ styles.side }>
                  <h1 className={ styles.header }>ICON</h1>
                  <SiderMenu></SiderMenu>
                </Sider>
                <Layout className={ styles.layoutLeft }>
                  <Header>
                    <Dropdown overlay={HeaderMenu}>
                      <div className={ styles.headerIcon + ' ant-dropdown-link'}>
                        <span>你好，KokoTa </span>
                        <Icon type="down" />
                      </div>
                    </Dropdown>
                  </Header>
                  <Content>
                    <Switch>
                      <Route exact path='/' component={Home}></Route>
                      <Route path='/product' render={() => <span>Product</span>}></Route>
                      <Route path='/productCategory' render={() => <span>Product</span>}></Route>
                    </Switch>
                  </Content>
                  <Footer></Footer>
                </Layout>
              </Fragment>
            )}></Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  }
}
