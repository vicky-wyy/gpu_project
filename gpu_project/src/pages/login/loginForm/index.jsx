/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, message, Checkbox, Spin } from 'antd';
import axios from 'axios';
import qs from 'qs';
import { authenticateSuccess } from '@/utils/session';

// import PromptBox from '@/components/PromptBox';

class LoginForm extends Component {
  state = {
    focusItem: -1,
    loading: false
  }

  formRef = React.createRef()

  onFinish = async (values)=>{
    // var data =new FormData();
    // data.append('email',values.email);
    // data.append('password',values.password);
    // axios({
    //   method: 'post',
    //   url: 'http://10.0.76.190:5000/api/v1/auth/login',
    //   data: data,
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // }).then(response => {
    //   const res = response.data;
    //   if(res.status==='success'){
    //     console.log('成功')
    //   }
    // }).catch(error => {
    //   console.log(error)
    // })
    const data = {'email':values.email,'password':values.password}
    const data1 = qs.stringify(data)
    await axios({
      method: 'post',
      url: '/api1/api/v1/auth/login',
      data: data1,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => {
      const res = response.data
      console.log(res);
      if(res.status==='success'){
        message.success('登录成功');
        localStorage.setItem('token', res.access_token);
        authenticateSuccess(res.access_token);
        this.props.history.replace('/');
      }
    })
    .catch(error => {
      message.error('没有权限');
      console.log(error);
    })
  }
  /**
   * 转换面板为注册面板
   * @returns 
   */
  goRegister = ()=>{
    this.formRef.current.resetFields();
    this.props.toggleShow()
  }
  goForget = ()=>{
    this.formRef.current.resetFields();
    this.props.toggleShow1();
  }
  render() {
    const { focusItem, loading } = this.state
    return (
      <div>
        <h1 className='text-2xl font-semibold text-indigo-200 -mt-8 mb-12 ml-28'>用户登录</h1>
        <Spin spinning={loading} tip='登录中...'/>
        <Form
          onFinish={this.onFinish}
          ref={this.formRef}
        >
          <Form.Item
            wrapperCol={{ span: 28, pull: focusItem === 0 ? 1 : 0 }}
            labelCol={{ span: 3, pull: focusItem === 0 ? 1 : 0 }}
            name='email'
            rules={[
              { required: true, message: '请输入您的邮箱地址'},
              { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '邮箱格式不正确'}
            ]}
          >
            <Input 
              prefix={<i className='iconfont icon-user' style={{ opacity: focusItem === 0 ? 1 : 0.6 }} />}
              placeholder="请输入邮箱地址"
              className='rounded-md border-0'
              autoComplete='off'
              onFocus={() => this.setState({ focusItem: 0 })}
              onBlur={() => this.setState({ focusItem: -1 })}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 28, pull: focusItem === 1 ? 1 : 0 }}
            labelCol={{ span: 3, pull: focusItem === 1 ? 1 : 0 }}
            name='password'
            rules={[
              {
                required: true,
                message: '请输入您的密码'
              }
            ]}
          >
            <Input 
              prefix={<i className='iconfont icon-suo' style={{ opacity: focusItem === 1 ? 1 : 0.6 }}/>}
              type="password" 
              onFocus={() => this.setState({ focusItem: 1 })}
              onBlur={() => this.setState({ focusItem: -1 })}
              placeholder="请输入密码"
              className='rounded-md border-0'
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className='text-white'>记住我</Checkbox>
            </Form.Item>
            <Button type='link' onClick={this.goForget} className='text-white float-right'>忘记密码</Button>
          </Form.Item>
          <Form.Item>
            <div className='flex justify-around space-x-12'>
              <Button type="primary" htmlType="submit" className='w-40 h-9 rounded-md'>登录</Button>
              <Button type='primary' ghost onClick={this.goRegister} className='w-40 h-9 rounded-md'>注册</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default withRouter(LoginForm)