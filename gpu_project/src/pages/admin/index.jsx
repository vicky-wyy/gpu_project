/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Layout, Dropdown, Menu, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, FormOutlined, PoweroffOutlined } from '@ant-design/icons';
import axios from 'axios';
import qs from 'qs';
import AppHeader from '@components/AppHeader';
import AppContent from '@components/AppContent';
import { logout } from '@/utils/session';
// import headerLogo from '@assets/img/nettrix_logo.png'
const { Header, Content, Footer } = Layout;

export default class Admin extends Component {
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
          const res = response.data
          console.log(res);
          if(res.status==='success'){
            message.success('登出成功');
            logout();
            this.props.history.replace('/login');
          }
        })
        .catch(error => {
          message.error('退出失败');
          console.log(error);
        })
      },
    });
  }
  render() {
    const menu = (
      <Menu>
          <Menu.Item key='modifyPassword'>
            <FormOutlined style={{ marginRight:7 }}/>
            <Link to='/modifyPassword'>修改密码</Link>
          </Menu.Item>
          <Menu.Item key='logout' onClick={this.onLogout}>
            <PoweroffOutlined style={{ marginRight:7 }}/>退出登录
          </Menu.Item>
      </Menu>
    );
    return (
      <Layout style={{minHeight:'100%'}}>
        <Header style={{position: 'fixed',zIndex: 1, width: '100%', height: '66px'}} className="flex bg-white items-center">
          {/* <img src={headerLogo} alt="" className='w-32 h-8 float-left'/> */}
          <div className='flex items-center space-x-8'>
            <h1 className='text-lg font-bold text-gray-700'>Nettrix 宁畅</h1>
            <AppHeader/>
          </div>
          <Dropdown overlay={menu} trigger={['click']} placement="bottom">
            <UserOutlined className="text-xl ml-auto"/>
          </Dropdown>
        </Header>
        <Content style={{marginTop: 66, backgroundColor: '#eee'}}>
          <AppContent/>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}
