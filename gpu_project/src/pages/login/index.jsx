import React, { Component } from 'react';
import LoadableComponent from '@/utils/LoadableComponent';
import bg from '@/assets/img/bg1.jpg';
import './index.less';

const LoginForm = LoadableComponent(()=>import('@/pages/login/loginForm'))
const RegisterForm = LoadableComponent(()=>import('@/pages/login/registerForm'))
const Background = LoadableComponent(()=>import('@/components/Background'))

export default class Login extends Component {
  state = {
    show: 'login'
  }

  /**
   * 切换登录和注册的面板
   */
   toggleShow = () => {
    this.setState({
        show: this.state.show === 'login' ? 'register' : 'login'
    })
  }
  render() {
    const { show } = this.state
    return (
        <Background url={bg}>
            <div className="fixed top-1/2 left-1/2 w-72 h-72 box-content pt-20 px-10 pb-10 login-container">
                <div className={`box ${show === 'login' ? 'active' : ''}`}>
                    <LoginForm toggleShow={this.toggleShow} />
                </div>
                <div className={`box ${show === 'register' ? 'active' : ''}`}>
                    <RegisterForm toggleShow={this.toggleShow} />
                </div>
            </div>
        </Background>
    )
  }
}
