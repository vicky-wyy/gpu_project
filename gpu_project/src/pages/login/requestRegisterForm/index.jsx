/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
class RequestRegisterForm extends Component {
  state = {
    loading: false,
    focusItem: -1
  }

  formRef = React.createRef()
  /**
   * 注册请求函数
   * @param {} values 
   */
  onFinish = async (values)=>{
    var data = qs.stringify({
      'email': values.email
    })
    if(this.state.loading){
      return
    }
    this.setState({
      loading: true
    })
    const hide = message.loading('注册中...', 0)
    await axios({
      method: 'post',
      url: '/api1/api/v1/auth/sign_up',
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => {
      const res = response.data;
      if(res.status==='success'){
        message.success('注册成功');
        this.setState({
          loading: false
        });
        hide();
      }else {
        console.log('注册失败')
      }
    })
    .catch(error => {
      message.error('您的邮箱已被注册，请直接登录')
      this.setState({
        loading: false
      });
      hide();
    })
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
    const { focusItem } = this.state
    return (
      <div className='h-64'>
        <h1 className='text-2xl font-semibold text-indigo-200 -mt-4 mb-12 text-center'>请求注册</h1>
        <Form
          onFinish={this.onFinish}
          ref={this.formRef}
        >
          <Form.Item
            style={{ marginBottom: 60 }}
            wrapperCol={{ span: 28, pull: focusItem === 1 ? 1 : 0 }}
            labelCol={{ span: 3, pull: focusItem === 1 ? 1 : 0 }}
            name='email'
            rules={[
              { required: true, message: '请输入您的邮件地址'},
              { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '邮箱格式不正确'}
            ]}
          >
            <Input
              prefix={<i className='iconfont icon-youxiang5' style={{ opacity: focusItem === 1 ? 1 : 0.6 }} />}
              className='rounded-md border-0'
              onFocus={() => this.setState({ focusItem: 1 })}
              onBlur={() => this.setState({ focusItem: -1 })}
              onPressEnter={this.onFinish}
              placeholder='请输入邮箱地址'
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item>
            <div className='flex justify-around space-x-8'>
              <Button type="primary" htmlType="submit" className='w-32 h-9 rounded-md'>请求注册</Button>
              <Button type='primary' ghost onClick={this.backLogin} className='w-32 h-9 rounded-md'>返回登录</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default withRouter(RequestRegisterForm)