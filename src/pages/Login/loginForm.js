import React, { PureComponent } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import actionCreator from '../../actions/actionCreator'
import styles from './loginForm.module.css'

/**
 * 登录表单，混合了路由和状态管理，复习看这个呀，也就够啦！
 */
class LoignForm extends PureComponent {
  componentDidMount () {
    console.log(this.props)
  }

  // 登录
  login = async (value) => {
    const { request } = window.Util

    try {
      const res = await request({
        type: 'post',
        url: '/login',
        data: value
      })

      if (res.data && res.data[0]) {
        localStorage.setItem('userInfo', JSON.stringify(res.data[0]))
        this.props.setUser(res.data[0])
        this.props.history.push('/')
      } else {
        message.error('用户名或密码错误')
      }
    } catch (err) {
      message.error(err.message)
    }
  }

  // 提交按钮
  handleSubmit = (e) => {
    e.preventDefault()
    // 执行所有验证器
    this.props.form.validateFields((err, values) => {
      if (err) return
      this.login(values)
    })
  }

  render() {
    // 验证装饰器，点击 handleSubmit 会触发这些装饰器，装饰器用于验证合法性
    const { getFieldDecorator } = this.props.form
    // 返回表单
    return (
      <Form onSubmit={this.handleSubmit} className={ styles.form }>
        <Form.Item>
          {
            // 验证装饰器会根据规则进行验证，这里值的名字为 username
            getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }]
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }]
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )
          }
        </Form.Item>
        <Form.Item>
          <Button className={ styles.formSubmit } type="primary" htmlType="submit">
            Log in
          </Button>
          Or <a href='http://baidu.com'>register now!</a>
          <a className={ styles.formForgot } href='http://baidu.com'>Forgot password</a>
        </Form.Item>
      </Form>
    )
  }
}

const WrapperForm = Form.create({ name: 'user_login' })(LoignForm)

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  setUser(userInfo) {
    dispatch(actionCreator.setUser(userInfo))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WrapperForm))
