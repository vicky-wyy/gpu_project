/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';

class RegisterForm extends Component {
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
    this.props.toggleShow()
  }

  render() {
    const { focusItem } = this.state
    return (
      <div className='h-64'>
        <h1 className='text-2xl font-semibold text-indigo-200 -mt-16 mb-8 ml-28'>用户注册</h1>
        <Form
          onFinish={this.onFinish}
          ref={this.formRef}
        >
          <Row gutter={[16,4]}>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 0 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 0 ? 1 : 0 }}
                name='username'
                rules={[
                  { required: true, message: '用户名不能为空' },
                  { pattern: /^[^\s']+$/, message: '不能输入特殊字符' },
                  { min: 3, message: '用户名至少为3位' }
              ]}
              >
                <Input 
                  prefix={<i className='iconfont icon-user' style={{ opacity: focusItem === 0 ? 1 : 0.6 }} />}
                  placeholder="请输入用户名"
                  onFocus={() => this.setState({ focusItem: 0 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  onPressEnter={this.onFinish}
                  className='rounded-md border-0'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 1 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 1 ? 1 : 0 }}
                name='email'
                rules={[
                  { required: true, message: '请输入您的公司'}
                ]}
              >
                <Input
                  prefix={<i className='iconfont icon-youxiang5' style={{ opacity: focusItem === 1 ? 1 : 0.6 }} />}
                  className='rounded-md border-0'
                  onFocus={() => this.setState({ focusItem: 1 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  onPressEnter={this.onFinish}
                  placeholder='请输入公司'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 2 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 2 ? 1 : 0 }}
                name='email'
                rules={[
                  { required: true, message: '请输入您的职位'}
                ]}
              >
                <Input
                  prefix={<i className='iconfont icon-youxiang5' style={{ opacity: focusItem === 2 ? 1 : 0.6 }} />}
                  className='rounded-md border-0'
                  onFocus={() => this.setState({ focusItem: 2 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  onPressEnter={this.onFinish}
                  placeholder='请输入职位'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 3 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 3 ? 1 : 0 }}
                name='email'
                rules={[
                  { required: true, message: '请输入您的领域'}
                ]}
              >
                <Input
                  prefix={<i className='iconfont icon-youxiang5' style={{ opacity: focusItem === 3 ? 1 : 0.6 }} />}
                  className='rounded-md border-0'
                  onFocus={() => this.setState({ focusItem: 3 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  onPressEnter={this.onFinish}
                  placeholder='请输入领域'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 4 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 4 ? 1 : 0 }}
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
                  prefix={<i className='iconfont icon-group48' style={{ opacity: focusItem === 4 ? 1 : 0.6 }}/>}
                  className='rounded-md border-0'
                  onFocus={() => this.setState({ focusItem: 4 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  onPressEnter={this.onFinish}
                  placeholder='请输入手机号码'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 5 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 5 ? 1 : 0 }}
                name='email'
                rules={[
                  { required: true, message: '请输入关注的GPU'}
                ]}
              >
                <Input
                  prefix={<i className='iconfont icon-youxiang5' style={{ opacity: focusItem === 5 ? 1 : 0.6 }} />}
                  className='rounded-md border-0'
                  onFocus={() => this.setState({ focusItem: 5 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  onPressEnter={this.onFinish}
                  placeholder='请输入关注的GPU'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 6 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 6 ? 1 : 0 }}
                name='password'
                rules={[
                  {
                    required: true,
                    message: '请输入密码'
                  }
                ]}
              >
                <Input 
                  prefix={<i className='iconfont icon-suo' style={{ opacity: focusItem === 6 ? 1 : 0.6 }}/>}
                  type="password" 
                  onFocus={() => this.setState({ focusItem: 6 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  onPressEnter={this.onFinish}
                  placeholder="请输入密码"
                  className='rounded-md border-0'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 6 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 6 ? 1 : 0 }}
                name='password'
                rules={[
                  {
                    required: true,
                    message: '请确认密码'
                  }
                ]}
              >
                <Input 
                  prefix={<i className='iconfont icon-suo' style={{ opacity: focusItem === 6 ? 1 : 0.6 }}/>}
                  type="password" 
                  onFocus={() => this.setState({ focusItem: 6 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  onPressEnter={this.onFinish}
                  placeholder="请确认密码"
                  className='rounded-md border-0'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button type="primary" htmlType="submit" className='h-9 rounded-md' style={{width:'150px'}}>注册</Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button type='primary' ghost onClick={this.backLogin} className='h-9 rounded-md' style={{width:'150px'}}>返回登录</Button>
              </Form.Item>
            </Col>
            {/* <Form.Item>
              <div className='flex space-x-4 ml-2'>
                <Button type="primary" htmlType="submit" className='h-9 rounded-md' >注册</Button>
                <Button type='primary' ghost onClick={this.backLogin} className='h-9 rounded-md' style={{width:'150px'}}>返回登录</Button>
              </div>
            </Form.Item> */}
          </Row>
          
        </Form>
      </div>
    )
  }
}
export default withRouter(RegisterForm)