import React, { Component } from 'react';
import Loadable from 'react-loadable';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
class LoadingPage extends Component {
  UNSAFE_componentWillMount(){
    NProgress.start();
  }
  componentWillUnmount() {
    NProgress.done()
  }
  render() {
    return (
      <div></div>
    )
  }
}

const LoadableComponent = (component) => {
  return Loadable({
    loader: component,
    loading: ()=> <LoadingPage/>
  })
}

export default LoadableComponent
