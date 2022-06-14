/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Layout, Dropdown, Menu } from 'antd';
import { UserOutlined, FormOutlined, PoweroffOutlined } from '@ant-design/icons';
import AppHeader from '@components/AppHeader';
import AppContent from '@components/AppContent';
// import headerLogo from '@assets/img/nettrix_logo.png'
const { Header, Content, Footer } = Layout;

export default class Admin extends Component {
  render() {
    const menu = (
      <Menu>
          <Menu.Item>
             <a target="_blank" href="/modifyUserInfo">
              <UserOutlined style={{ marginRight:7 }}/>用户
             </a>
          </Menu.Item>
          <Menu.Item>
             <a target="_blank" href="/modifyPassword" rel="noopener noreferrer" >
                <FormOutlined style={{ marginRight:7 }}/>修改密码
             </a>
          </Menu.Item>
          <Menu.Item>
             <a onClick = {this.logout}>
               <PoweroffOutlined style={{ marginRight:7 }}/>退出登录
             </a>
          </Menu.Item>
      </Menu>
    );
    return (
      <Layout style={{minHeight:'100%'}}>
        <Header style={{position: 'fixed',zIndex: 1000, width: '100%', height: '66px'}} className="flex bg-white items-center">
          {/* <img src={headerLogo} alt="" className='w-32 h-8 float-left'/> */}
          <div className='flex items-center space-x-8'>
            <h1 className='text-lg font-bold text-gray-700'>Nettrix 宁畅</h1>
            <AppHeader/>
          </div>
          <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
            <UserOutlined className="text-xl ml-auto"/>
          </Dropdown>
        </Header>
        <Content style={{ padding:'30px 30px 0'}}>
          <AppContent/>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}
