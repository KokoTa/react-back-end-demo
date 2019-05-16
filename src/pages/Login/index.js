import React, { PureComponent } from 'react'
import { Row, Col } from 'antd'
import styles from './index.module.css'

import LoginForm from './loginForm'

export default class Login extends PureComponent {
  render() {
    return (
      <Row className={ styles.row }>
        <Col className={ styles.col } xl={{ span: 8, offset: 8 }}>
          <h1 className={ styles.title }>React后台管理系统</h1>
          <LoginForm></LoginForm>
        </Col>
      </Row>
    )
  }
}
