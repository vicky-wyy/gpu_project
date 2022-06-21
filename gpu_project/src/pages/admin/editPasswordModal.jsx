import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import { logout } from '@/utils/session';

const token = localStorage.getItem('token')
export default class EditPasswordModal extends Component {
  formRef = React.createRef();

  handleCancel = ()=>{
    this.formRef.current.resetFields();
    this.props.toggleVisible(false);
  }

  handleOk = ()=>{
    this.formRef.current.validateFields()
    .then(async(values) => {
      const data = {
        'password':values.password, 
      }
      const data1 = qs.stringify(data)
      await axios({
        method: 'put',
        url: '/api1/api/v1/auth/user',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization": `Bearer ${token}`
        },
        data: data1
      })
      .then(response => {
        if(response.status===200){
          message.success('密码修改成功');
          this.handleCancel();
        }
      })
      .catch(error => {
        if(error.response){
          const res = error.response
          if(res.status===401){
            message.error('token已失效，请重新登录')
            logout();
            this.props.history.replace('/login');
          }else{
            message.error('token验证失败');
          }
        }else {
          message.error('密码修改失败')
          console.log(error.message)
        }
      })
    })
  }
  render() {
    const { visible } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }
    return (
      <Modal
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        visible={visible}
        centered
        title='修改密码'
        width={400}
      >
        <Form
          ref={this.formRef}
        >
          <Form.Item
            name='password'
            label='新密码'
            {...formItemLayout}
            hasFeedback
            rules={[
              { required: true, message: '密码不能为空' },
              { pattern: '^[^ ]+$', message: '密码不能有空格' },
              { min: 6, message: '密码至少为6位' },
            ]}
          >
            <Input.Password/>
          </Form.Item>
          <Form.Item
            name='re_password'
            label='重复密码'
            dependencies={['password']}
            {...formItemLayout}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认您的密码'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('您输入的两次密码不一致，请确认后输入！'));
                },
              }),
            ]}

          >
            <Input.Password/>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
