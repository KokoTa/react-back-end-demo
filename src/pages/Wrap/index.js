import React, { PureComponent, Fragment } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Dropdown, Icon } from 'antd'

import Login from '../Login'
import Home from '../Home'

import SiderMenu from '../../components/SiderMenu'
import HeaderMenu from '../../components/HeaderMenu'

import styles from './index.module.css'

const { Header, Footer, Sider, Content } = Layout

// 后台主视图
const Main = (props) => (
  <Fragment>
    <Sider className={ styles.side }>
      <h1 className={ styles.header }>ICON</h1>
      <SiderMenu></SiderMenu>
    </Sider>
    <Layout className={ styles.layoutLeft }>
      <Header>
        <Dropdown overlay={HeaderMenu}>
          <div className={ styles.headerIcon + ' ant-dropdown-link'}>
            <span>你好，{props.userInfo.username} </span>
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
)

// 填充了状态数据的组件，用于鉴权
// 鉴权用法：https://react-router.docschina.org/web/example/auth-workflow
const MainRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = rest
  return (
    <Route
      {...rest}
      render={props =>
        Object.keys(userInfo).length ? (
          <Component userInfo={ userInfo } { ...props } />
        ) : (
          <Redirect to='/login'></Redirect>
        )
      }
    />
  )
}

const mapStateToProps = state => ({ userInfo: state.global.userInfo })
const mapDispatchToProps = dispatch => ({})
const PrivateRoute = connect(mapStateToProps, mapDispatchToProps)(MainRoute)

/**
 * 主包裹页
 */
class Wrapper extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Layout className={ styles.wapperLayout }>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <PrivateRoute path="/" component={Main}></PrivateRoute>
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  }
}


export default Wrapper
