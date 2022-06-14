import React, { Component } from 'react'
import {  Card } from 'antd';
import './index.less';
export default class ModifyPassword extends Component {
  render() {
    return (
      <Card
        className='shadow-lg rounded-md border-gray-200 m-4'
        title='我的账户'
      >
        <h1 className='font-semibold text-sm'>基础信息</h1>
      </Card>
    )
  }
}
