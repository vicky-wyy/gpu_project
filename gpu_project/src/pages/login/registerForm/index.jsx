/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Row, Col, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
class RegisterForm extends Component {
  state = {
    loading: false,
    focusItem: -1
  }

  formRef = React.createRef()

  onFinish = async (values)=>{

    if(this.state.loading){
      return
    }
    this.setState({
      loading: true
    })
    const hide = message.loading('注册中...', 0)
    const data = {
      'email':values.email,
      'first_name':values.first_name,
      'last_name': values.last_name,
      'company': values.company,
      'job_role': values.job_role,
      'industry': values.industry,
      'password': values.password
    };
    const data1 = qs.stringify(data);
    await axios({
      method: 'post',
      url: '/api1/api/v1/auth/register',
      data: data1,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => {
      const res = response.data
      if(response.status===201){
        localStorage.setItem('token', res.access_token);
        this.backLogin();
        message.success('注册成功，请直接登录');
      }
    })
    .catch(error => {
      if(error.response){
        const res = error.response
        if(res.status===409){
          message.error('您已经注册，请直接登录即可');
          this.backLogin();
        }else if(res.status===400){
          message.error('您没有权限登录该系统')
        }else {
          message.error('服务器错误，请稍后再试')
        }
      }else {
        message.error('注册失败');
        console.log(error.message)
      }
    })
    this.setState({
      loading: false
    })
    hide();
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
        <h1 className='text-2xl font-semibold text-indigo-200 -mt-16 mb-8 text-center'>用户注册</h1>
        <Form
          onFinish={this.onFinish}
          ref={this.formRef}
        >
          <Row gutter={[16,4]}>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 0 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 0 ? 1 : 0 }}
                name='email'
                rules={[
                  { required: true, message: '请输入您的邮件地址'},
                  { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '邮箱格式不正确'}
              ]}
              >
                <Input 
                  prefix={<i className='iconfont icon-youxiang5' style={{ opacity: focusItem === 0 ? 1 : 0.6 }} />}
                  placeholder="请输入邮箱"
                  onFocus={() => this.setState({ focusItem: 0 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  className='rounded-md border-0'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 1 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 1 ? 1 : 0 }}
                name='first_name'
                rules={[
                  { required: true, message: '请输入first_name'}
                ]}
              >
                <Input
                  prefix={<i className='iconfont icon-user' style={{ opacity: focusItem === 1 ? 1 : 0.6 }} />}
                  className='rounded-md border-0'
                  onFocus={() => this.setState({ focusItem: 1 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  placeholder='请输入first_name'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 2 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 2 ? 1 : 0 }}
                name='last_name'
                rules={[
                  { required: true, message: '请输入last_name'}
                ]}
              >
                <Input
                  prefix={<i className='iconfont icon-xingming3' style={{ opacity: focusItem === 2 ? 1 : 0.6 }} />}
                  className='rounded-md border-0'
                  onFocus={() => this.setState({ focusItem: 2 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  onPressEnter={this.onFinish}
                  placeholder='请输入last_name'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 3 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 3 ? 1 : 0 }}
                name='company'
                rules={[
                  { required: true, message: '请输入您的公司'}
                ]}
              >
                <Input
                  prefix={<i className='iconfont icon-gongsimingcheng3' style={{ opacity: focusItem === 3 ? 1 : 0.6 }} />}
                  className='rounded-md border-0'
                  onFocus={() => this.setState({ focusItem: 3 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  onPressEnter={this.onFinish}
                  placeholder='请输入公司'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 4 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 4 ? 1 : 0 }}
                name='job_role'
                rules={[
                  {
                    required: true,
                    message:'请输入您的job_role'
                  }
                ]}
              >
                <Input
                  prefix={<i className='iconfont icon-job1' style={{ opacity: focusItem === 4 ? 1 : 0.6 }}/>}
                  className='rounded-md border-0'
                  onFocus={() => this.setState({ focusItem: 4 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  placeholder='请输入job_role'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                wrapperCol={{ span: 28, pull: focusItem === 5 ? 1 : 0 }}
                labelCol={{ span: 3, pull: focusItem === 5 ? 1 : 0 }}
                name='industry'
                rules={[
                  { required: true, message: '请输入行业'}
                ]}
              >
                <Input
                  prefix={<i className='iconfont icon-zhiweiguanli1' style={{ opacity: focusItem === 5 ? 1 : 0.6 }} />}
                  className='rounded-md border-0'
                  onFocus={() => this.setState({ focusItem: 5 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
                  onPressEnter={this.onFinish}
                  placeholder='请输入您的行业'
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
                  { required: true, message: '密码不能为空' },
                  { pattern: '^[^ ]+$', message: '密码不能有空格' },
                  { min: 6, message: '密码至少为6位' },
                ]}
              >
                <Input 
                  prefix={<i className='iconfont icon-suo' style={{ opacity: focusItem === 6 ? 1 : 0.6 }}/>}
                  type="password" 
                  onFocus={() => this.setState({ focusItem: 6 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
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
                name='re_password'
                rules={[
                  {
                    required: true,
                    message: '请确认密码'
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次输入的密码不一致，请确认后输入'));
                    },
                  }),
                ]}
              >
                <Input 
                  prefix={<i className='iconfont icon-suo' style={{ opacity: focusItem === 6 ? 1 : 0.6 }}/>}
                  type="password" 
                  onFocus={() => this.setState({ focusItem: 6 })}
                  onBlur={() => this.setState({ focusItem: -1 })}
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
          </Row>
          
        </Form>
      </div>
    )
  }
}
export default withRouter(RegisterForm)