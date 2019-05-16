import React from 'react'
import { Menu } from 'antd'

export default function HeaderMenu (props) {
  return (
    <Menu>
      <Menu.Item>用户信息</Menu.Item>
      <Menu.Item>用户设置</Menu.Item>
      <Menu.Divider></Menu.Divider>
      <Menu.Item onClick={ props.exist }>退出</Menu.Item>
    </Menu>
  )
}
