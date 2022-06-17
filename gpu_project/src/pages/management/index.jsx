import React, { Component } from 'react'
import { Button } from 'antd';
import axios from 'axios';
import qs from 'qs';

export default class Management extends Component {
  getArticles = ()=>{
    const token = JSON.parse(localStorage.getItem('token'));

  }
  render() {
    return (
      <Button type='primary' onClick={this.getArticles}>获取文章信息</Button>
    )
  }
}
