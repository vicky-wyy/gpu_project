/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Layout, Tabs, Table, Button, Card, Avatar, Row, Col } from 'antd';
import docker from '@/assets/img/Docker.png';
import jupyter from '@/assets/img/jupyter.jpg';
import { SettingOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Meta } = Card;
export default class Resource extends Component {
  render() {
    const columns = [
      {
        title: '服务器名称',
        dataIndex: 'name',
      },
      {
        title: 'IP地址',
        dataIndex: 'IP'
      },
      {
        title: 'BMC IP',
        dataIndex: 'BMC'
      },
      {
        title: 'OS',
        dataIndex: 'OS'
      },
      {
        title: '配置',
        dataIndex: 'configure'
      },
      {
        title: '状态',
        dataIndex: 'status'
      }
    ]
    const data = [
      {
        key: '1',
        name: 'Master',
        IP: <a href='#' className='text-blue-600 underline'>10.0.0.1</a>,
        BMC: <a href='#' className='text-blue-600 underline'>10.0.1.1</a>,
        OS: 'Centos',
        configure: <Button type='link'>详细配置</Button>,
        status: <Button type='link'>空闲</Button>
      },
      {
        key: '2',
        name: 'X660 G40-1',
        IP: <a href='#' className='text-blue-600 underline'>10.0.0.2</a>,
        BMC: <a href='#' className='text-blue-600 underline'>10.0.2.1</a>,
        OS: 'Centos',
        configure: <Button type='link'>详细配置</Button>,
        status: <Button type='link'>空闲</Button>
      },
      {
        key: '3',
        name: 'X660 G40-2',
        IP: <a href='#' className='text-blue-600 underline'>10.0.0.3</a>,
        BMC: <a href='#' className='text-blue-600 underline'>10.0.3.1</a>,
        OS: 'Centos',
        configure: <Button type='link'>详细配置</Button>,
        status: <Button type='link' danger>使用中</Button>
      },
      {
        key: '4',
        name: 'X640 G30 8*A30',
        IP: <a href='#' className='text-blue-600 underline'>10.0.0.4</a>,
        BMC: <a href='#' className='text-blue-600 underline'>10.0.4.1</a>,
        OS: 'Centos',
        configure: <Button type='link'>详细配置</Button>,
        status: <Button type='link' disabled>无法使用</Button>
      },
      {
        key: '5',
        name: 'X640 G30 8*A40',
        IP: <a href='#' className='text-blue-600 underline'>10.0.0.5</a>,
        BMC: <a href='#' className='text-blue-600 underline'>10.0.5.1</a>,
        OS: 'Centos',
        configure: <Button type='link'>详细配置</Button>,
        status: <Button type='link' disabled>无法使用</Button>
      }
    ]
    return (
      <Layout className='m-3 bg-white rounded shadow-md p-4 layout-container'>
        <Tabs defaultActiveKey='1'>
          <TabPane tab="硬件资源" key='1'>
            <Table
              bordered
              columns={columns} 
              dataSource={data}
              scroll={{
                x:1000
              }}
              className="border-gray-300"
            >
            </Table>
          </TabPane>
          <TabPane tab="软件资源" key='2'>
            <Row justify='space-around' gutter={16}>
              <Col span={8}>
                <Card
                  className='rounded shadow-md border-gray-300 border-1' 
                  actions={[
                    <SettingOutlined key="setting"/>
                  ]}
                  hoverable
                >  
                  <Meta
                    avatar={<Avatar src={docker} className='h-12 w-12'/>}
                    title="Docker"
                    description={
                      <div>
                        <h1 className='mb-2'>admin</h1>
                        <p>2022/06/14</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card 
                  className='rounded shadow-md border-gray-300 border-1' 
                  actions={[
                    <SettingOutlined key="setting"/>
                  ]}
                  hoverable
                >  
                  <Meta
                    avatar={<Avatar src={jupyter} className='h-12 w-12'/>}
                    title="jupyter"
                    description={
                      <div>
                        <h1 className='mb-2'>admin</h1>
                        <p>2022/06/14</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card 
                  className='rounded shadow-md border-gray-300 border-1' 
                  actions={[
                    <SettingOutlined key="setting"/>
                  ]}
                  hoverable
                >  
                  <Meta
                    avatar={<Avatar src={docker} className='h-12 w-12'/>}
                    title="Docker"
                    description={
                      <div>
                        <h1 className='mb-2'>admin</h1>
                        <p>2022/06/14</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
            </Row>
            <Row justify='space-around' gutter={16} className="mt-4">
              <Col span={8}>
                <Card
                  className='rounded shadow-md border-gray-300 border-1' 
                  actions={[
                    <SettingOutlined key="setting"/>
                  ]}
                  hoverable
                >  
                  <Meta
                    avatar={<Avatar src={docker} className='h-12 w-12'/>}
                    title="Docker"
                    description={
                      <div>
                        <h1 className='mb-2'>admin</h1>
                        <p>2022/06/14</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card 
                  className='rounded shadow-md border-gray-300 border-1' 
                  actions={[
                    <SettingOutlined key="setting"/>
                  ]}
                  hoverable
                >  
                  <Meta
                    avatar={<Avatar src={jupyter} className='h-12 w-12'/>}
                    title="jupyter"
                    description={
                      <div>
                        <h1 className='mb-2'>admin</h1>
                        <p>2022/06/14</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card 
                  className='rounded shadow-md border-gray-300 border-1' 
                  actions={[
                    <SettingOutlined key="setting"/>
                  ]}
                  hoverable
                >  
                  <Meta
                    avatar={<Avatar src={docker} className='h-12 w-12'/>}
                    title="Docker"
                    description={
                      <div>
                        <h1 className='mb-2'>admin</h1>
                        <p>2022/06/14</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Layout>
    )
  }
}
