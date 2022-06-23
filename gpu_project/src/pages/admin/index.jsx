/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Layout, Dropdown, Menu, Modal, message } from 'antd';
import { UserOutlined, FormOutlined, PoweroffOutlined } from '@ant-design/icons';
import axios from 'axios';
import qs from 'qs';
import AppHeader from '@components/AppHeader';
import AppContent from '@components/AppContent';
import { logout, unauthorized } from '@/utils/session';
import LoadableComponent from '@/utils/LoadableComponent'
const { Header, Content, Footer } = Layout;

const EditInfoModal = LoadableComponent(()=>import('./editInfoModal'));
const EditPasswordModal = LoadableComponent(()=>import('./editPasswordModal'));
export default class Admin extends Component {
  state = {
    infoVisible: false,
    passwordVisible: false
  }
  onLogout = ()=>{
    const data = qs.stringify({});
    const token = localStorage.getItem('token');
    Modal.confirm({
      title: "注销",
      content: "确定要退出系统吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        await axios({
          method: 'post',
          url: '/api1/api/v1/auth/logout',
          data: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          if(response.status===200){
            message.success('退出成功');
            localStorage.removeItem('token');
            logout();
            this.props.history.replace('/login');
          }
        })
        .catch(error => {
          if(error.response){
            const res = error.response
            if(res.status===400){
              message.error('您没有权限退出');
            }else if(res.status===401){
              message.error('Token无效或者过期,请重新登录');
              unauthorized();
            }else {
              message.error('服务器错误，请稍后再试')
            }
          }else {
            message.error('退出失败');
            console.log(error.message)
          }
        })
      },
    });
  }
  toggleInfoVisible = (visible)=>{
    this.setState({
      infoVisible: visible
    })
  }
  togglePasswordVisble = (visible)=>{
    this.setState({
      passwordVisible: visible
    })
  }
  render() {
    const { infoVisible, passwordVisible } = this.state
    const menu = (
      <Menu>
        <Menu.ItemGroup title='用户中心'>
          <Menu.Item key='editInfoModal' onClick={()=>this.toggleInfoVisible(true)}>
            <UserOutlined style={{ marginRight:7 }}/>
            修改个人信息
          </Menu.Item>
          <Menu.Item key='editPasswordModal' onClick={()=>this.togglePasswordVisble(true)}>
            <FormOutlined style={{ marginRight:7 }}/>
            修改密码
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title='设置中心'>
          <Menu.Item key='logout' onClick={this.onLogout}>
            <PoweroffOutlined style={{ marginRight:7 }}/>退出登录
          </Menu.Item>
        </Menu.ItemGroup>
        
      </Menu>
    );
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Header style={{position: 'fixed',zIndex: 1, width: '100%', height: '66px'}} className="flex bg-white items-center">
          {/* <img src={headerLogo} alt="" className='w-32 h-8 float-left'/> */}
          <div className='flex items-center space-x-8'>
            <h1 className='text-lg font-bold text-gray-700'>Nettrix 宁畅</h1>
            <AppHeader/>
          </div>
          <Dropdown overlay={menu} trigger={['hover']} placement="bottom">
            <UserOutlined className="text-xl ml-auto"/>
          </Dropdown>
        </Header>
        <Content style={{marginTop: 66, backgroundColor: '#eee' }}>
          <AppContent/>
        </Content>
        {/* <Footer style={{textAlign: 'center'}}>
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
        <EditInfoModal toggleVisible={this.toggleInfoVisible} visible={infoVisible} />
        <EditPasswordModal toggleVisible={this.togglePasswordVisble} visible={passwordVisible} />
      </Layout>
    )
  }
}
