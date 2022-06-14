import React, { Component } from 'react'
import { Row, Col, Layout, Card } from 'antd';
import bg from '@assets/img/宁畅背景.jpg';
import card from '@assets/img/Card.png';
export default class Home extends Component {
  render() {
    return (
      <Layout>
        <Row>
          <img src={bg} alt=""/>
        </Row>
        <Row className='my-4'>
          <h1 className='text-3xl font-semibold text-blue-400 mx-auto'>新闻</h1>
        </Row>
        <Row justify="space-around" className='m-4'>
          <Col span={5}>
            <Card 
              cover={
                <img alt='example' src={card}/>
              }
              hoverable
            >
              <div>
                <h1 className='text-xl font-semibold text-blue-400 mb-4'>通用机架服务器</h1>
                <p className='font-semibold text-black'>弹性扩展 稳定高效</p>
              </div>
            </Card>
          </Col>
          <Col span={5}>
            <Card 
              cover={
                <img alt='example' src={card}/>
              }
              hoverable
            >
              <div>
                <h1 className='text-xl font-semibold text-blue-400 mb-4'>通用机架服务器</h1>
                <p className='font-semibold text-black'>弹性扩展 稳定高效</p>
              </div>
            </Card>
          </Col>
          <Col span={5}>
            <Card 
              cover={
                <img alt='example' src={card}/>
              }
              hoverable
            >
              <div>
                <h1 className='text-xl font-semibold text-blue-400 mb-4'>通用机架服务器</h1>
                <p className='font-semibold text-black'>弹性扩展 稳定高效</p>
              </div>
            </Card>
          </Col>
          <Col span={5}>
            <Card 
              cover={
                <img alt='example' src={card}/>
              }
              hoverable
            >
              <div>
                <h1 className='text-xl font-semibold text-blue-400 mb-4'>通用机架服务器</h1>
                <p className='font-semibold text-black'>弹性扩展 稳定高效</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Layout>
    )
  }
}
