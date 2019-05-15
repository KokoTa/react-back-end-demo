import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'


const { SubMenu } = Menu

export default class componentName extends PureComponent {

  menuClick = (e) => {
    console.log(e)
  }

  render() {
    return (
      <Menu mode="inline" theme="dark" onClick={this.menuClick}>
        <Menu.Item>
          <Link to="/">首页</Link>
        </Menu.Item>
        <SubMenu title={<span>商品</span>}>
          <Menu.Item>
            <Link to="/product">商品管理</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/productCategory">品类管理</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu title={<span>订单</span>}>
          <Menu.Item>
            <Link to="/order">订单管理</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu title={<span>用户</span>}>
        <Menu.Item>
            <Link to="/user">用户管理</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}
