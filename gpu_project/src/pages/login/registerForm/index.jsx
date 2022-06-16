/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class RegisterForm extends Component {
  state = {
    loading: false
  }

  formRef = React.createRef()

  onFinish = (values)=>{
    console.log(values)
  }
  /**
   * 返回登录面板
   * @returns 
   */
  backLogin = ()=>{
    this.formRef.current.resetFields();
    this.props.toggleShow()
  }

  

  render() {
    return (
      <div className='h-64'>
        <h1 className='text-2xl font-semibold text-indigo-200 -mt-12 mb-8 ml-20'>用户注册</h1>
        <Form
          onFinish={this.onFinish}
          ref={this.formRef}
        >
          <Form.Item
            wrapperCol={{ span: 28 }}
            name='username'
            rules={[
              { required: true, message: '用户名不能为空' },
              { pattern: /^[^\s']+$/, message: '不能输入特殊字符' },
              { min: 3, message: '用户名至少为3位' }
          ]}
          >
            <Input 
              prefix={<UserOutlined />}
              placeholder="请输入用户名"
              className='rounded-md border-0'
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 28 }}
            name='email'
            rules={[
              { required: true, message: '请输入您的邮件地址'},
              { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '邮箱格式不正确'}
            ]}
          >
            <Input
              prefix={<i class='iconfont icon-youxiang5' />}
              className='rounded-md border-0'
              placeholder='请输入邮箱地址'
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 28 }}
            name='phone'
            rules={[
              {
                required: true,
                message:'请输入您的手机号码'
              },
              {
                pattern: /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/,
		            message: '请输入正确的手机号'
              }
            ]}
          >
            <Input
              prefix={<i class='iconfont icon-group48' />}
              className='rounded-md border-0'
              placeholder='请输入手机号码'
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item
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
              prefix={<LockOutlined />}
              type="password" 
              placeholder="请输入密码"
              className='rounded-md border-0'
            />
          </Form.Item>
          <Form.Item>
            <div className='flex justify-around'>
              <Button type="primary" htmlType="submit" className='w-28 h-9 rounded-md'>注册</Button>
              <Button type='primary' ghost onClick={this.backLogin} className='w-28 h-9 rounded-md'>返回登录</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default withRouter(RegisterForm)