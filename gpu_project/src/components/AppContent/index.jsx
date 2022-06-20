import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoadableComponent from '@/utils/LoadableComponent';
import AdminRoute from '@/components/AdminRoute';

const Home = LoadableComponent(()=>import('@/pages/home'))
const Resource = LoadableComponent(()=>import('@/pages/resource'))
const Monitor = LoadableComponent(()=>import('@/pages/monitor'))
const Experience = LoadableComponent(()=>import('@/pages/experience'))
const Management = LoadableComponent(()=>import('@/pages/management'))
const ModifyPassword = LoadableComponent(()=>import('@/pages/modifyPassword'))

export default class AppContent extends Component {
  render() {
    return (
      <Switch>
        <Redirect from='/' exact to='/home'/>
        <Route path='/home' component={Home}/>
        <Route path='/resource' component={Resource}/>
        <Route path='/monitor' component={Monitor}/>
        <Route path='/experience' component={Experience}/>
        <Route path='/management' component={Management}/>
        <Route path='/modifyPassword' component={ModifyPassword}/>
      </Switch>
    )
  }
}
