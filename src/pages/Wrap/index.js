import React, { PureComponent, Fragment } from 'react'
import { BrowserRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { Layout, Dropdown, Icon } from 'antd'
import Cookie from 'js-cookie'
import Lodable from 'react-loadable'

import Login from '../Login'
// import Home from '../Home'

import SiderMenu from '../../components/SiderMenu'
import HeaderMenu from '../../components/HeaderMenu'

import styles from './index.module.css'

const { Header, Footer, Sider, Content } = Layout

const Loading = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};

// 懒加载
const LodableHome = Lodable({
  loader: () => import('../Home'),
  loading: Loading
})

// 后台主视图
class MainContent extends PureComponent {
  // 退出登录
  exist = () => {
    const { history } = this.props
    // 清空用户数据
    localStorage.removeItem('userInfo')
    // 清空 sessionId
    Cookie.remove('EGG_SESS')
    // 重定向到登录页
    history.push('/login')
  }

  render () {
    return (
      <Fragment>
        <Sider className={ styles.side }>
          <h1 className={ styles.header }>ICON</h1>
          <SiderMenu></SiderMenu>
        </Sider>
        <Layout className={ styles.layoutLeft }>
          <Header>
            <Dropdown overlay={<HeaderMenu exist={ this.exist }></HeaderMenu>}>
              <div className={ styles.headerIcon + ' ant-dropdown-link'}>
                <span>你好，{ this.props.userInfo && this.props.userInfo.username } </span>
                <Icon type="down" />
              </div>
            </Dropdown>
          </Header>
          <Content>
            <Switch>
              <Route exact path='/' component={LodableHome}></Route>
              <Route path='/product' render={() => <span>Product</span>}></Route>
              <Route path='/productCategory' render={() => <span>Product</span>}></Route>
            </Switch>
          </Content>
          <Footer></Footer>
        </Layout>
      </Fragment>
    )
  }
}

// ? 获取 history 对象的两种方法：https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
const Main = withRouter(MainContent)

// ? 路由鉴权怎么用：https://react-router.docschina.org/web/example/auth-workflow
const PrivateRoute = ({ component: Component, ...rest }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
  const sessionId = Cookie.get('EGG_SESS') // 有 sessionId 说明用户状态保持中

  return (
    <Route
      {...rest}
      render={props =>
        sessionId ? (
          <Component userInfo={ userInfo } { ...props } />
        ) : (
          <Redirect to='/login'></Redirect>
        )
      }
    />
  )
}

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
