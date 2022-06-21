import React, { Component } from 'react';
import { Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import qs from 'qs';

const token = localStorage.getItem('token');

export default class EditInfoModal extends Component {
  state = {
    user: {}
  }
  formRef = React.createRef();
  /* 获取用户信息 */
  getUserInfo =async ()=>{
    const data = JSON.stringify({});
    await axios({
      method: 'get',
      url: '/api1/api/v1/auth/user',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: data
    })
    .then(response => {
      const res = response.data;
      this.setState({
        user: res
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  handleCancel = ()=>{
    this.formRef.current.resetFields();
    this.props.toggleVisible(false);
  }
  handleOk = ()=>{
    this.formRef.current.validateFields()
    .then(async(values) => {
      this.handleCancel();
      const data = {
        'first_name':values.first_name, 
        'last_name': values.last_name,
        'company': values.company,
        'job_role': values.job_role,
        'industry': values.industry
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
          message.success('信息修改成功');
          this.getUserInfo();
        }
      })
      .catch(error => {
        message.error('信息修改失败');
      })
    })
  }

  UNSAFE_componentWillMount(){
    this.getUserInfo();
  }
  render() {
    const { user } = this.state
    const { visible } = this.props
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    }
    return (
      <Modal
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        visible={visible}
        centered
        title='编辑个人信息'
        destroyOnClose
      >
        <Form
          ref={this.formRef}
        >
          <Form.Item
            name='first_name'
            label='first_name'
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入first_name'
              }
            ]}
            {...formItemLayout}
            initialValue={user.first_name}
          >
            <Input placeholder='请输入first_name' className='rounded-md' autoComplete='off'/>
          </Form.Item>
          <Form.Item
            name='last_name'
            label='last_name'
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入last_name'
              }
            ]}
            {...formItemLayout}
            initialValue={user.last_name}
          >
            <Input placeholder='请输入last_name' className='rounded-md' autoComplete='off'/>
          </Form.Item>
          <Form.Item
            name='company'
            label='company'
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入company'
              }
            ]}
            {...formItemLayout}
            initialValue={user.company}
          >
            <Input placeholder='请输入公司名称' className='rounded-md' autoComplete='off'/>
          </Form.Item>
          <Form.Item
            name='job_role'
            label='job_role'
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入job_role'
              }
            ]}
            {...formItemLayout}
            initialValue={user.job_role}
          >
            <Input placeholder='请输入工作角色' className='rounded-md' autoComplete='off'/>
          </Form.Item>
          <Form.Item
            name='industry'
            label='industry'
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入industry'
              }
            ]}
            {...formItemLayout}
            initialValue={user.industry}
          >
            <Input placeholder='请输入所在行业' className='rounded-md' autoComplete='off'/>
          </Form.Item>
        </Form>
      </Modal>
      
    )
  }
}
