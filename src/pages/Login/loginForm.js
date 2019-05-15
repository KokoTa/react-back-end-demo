import React, { PureComponent } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import styles from './loginForm.module.css'

class LoignForm extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault()
    // 执行所有验证器
    this.props.form.validateFields((err, values) => {
      console.log(err, values)
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
            // 验证装饰器会根据规则进行验证，这里值的名字为 userName
            getFieldDecorator('userName', {
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
          {
            getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )
          }
          <a className={ styles.formForgot } href='http://baidu.com'>Forgot password</a>
          <Button className={ styles.formSubmit } type="primary" htmlType="submit">
            Log in
          </Button>
          Or <a href='http://baidu.com'>register now!</a>
        </Form.Item>
      </Form>
    )
  }
}

const WrapperForm = Form.create({ name: 'user_login' })(LoignForm)

export default WrapperForm
