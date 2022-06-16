/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

class LoginForm extends Component {
  formRef = React.createRef()

  onFinish = (values)=>{
    console.log(values)
  }
  /**
   * 转换面板为注册面板
   * @returns 
   */
  goRegister = ()=>{
    this.formRef.current.resetFields();
    this.props.toggleShow()
  }
  render() {
    return (
      <div>
        <h1 className='text-2xl font-semibold text-indigo-200 -mt-8 mb-12 ml-20'>用户登录</h1>
        <Form
          onFinish={this.onFinish}
          ref={this.formRef}
        >
          <Form.Item
            // style={{ marginBottom: 25 }}
            wrapperCol={{ span: 28 }}
            name='username'
            rules={[
              { required: true, message: '请输入您的用户名'},
              { pattern: /^[^\s']+$/, message: '不能输入特殊字符'}
            ]}
          >
            <Input 
              prefix={<i class='iconfont icon-user' />}
              placeholder="请输入用户名"
              className='rounded-md border-0'
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 60 }}
            wrapperCol={{ span: 28 }}
            name='password'
            rules={[
              {
                required: true,
                message: '请输入您的密码'
              }
            ]}
          >
            <Input 
              prefix={<i class='iconfont icon-suo' />}
              type="password" 
              placeholder="请输入密码"
              className='rounded-md border-0'
            />
          </Form.Item>
          <Form.Item>
            <div className='flex justify-around'>
              <Button type="primary" htmlType="submit" className='w-28 h-9 rounded-md'>登录</Button>
              <Button type='primary' ghost onClick={this.goRegister} className='w-28 h-9 rounded-md'>注册</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default withRouter(LoginForm)