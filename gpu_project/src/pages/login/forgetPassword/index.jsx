/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

class ForgetPassword extends Component {
  state = {
    loading: false,
    focusItem: -1
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
    this.props.toggleShow1()
  }

  render() {
    const { focusItem } = this.state
    return (
      <div className='h-64'>
        <h1 className='text-2xl font-semibold text-indigo-200 -mt-4 mb-12 ml-28'>请求注册</h1>
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
              <Button type="primary" htmlType="submit" className='w-32 h-9 rounded-md'>找回密码</Button>
              <Button type='primary' ghost onClick={this.backLogin} className='w-32 h-9 rounded-md'>返回登录</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default withRouter(ForgetPassword)