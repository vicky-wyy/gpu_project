import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '@/pages/login';
import Admin from '@/pages/admin';
import './App.less'
export default class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/' component={Admin}/>
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    )
  }
}
