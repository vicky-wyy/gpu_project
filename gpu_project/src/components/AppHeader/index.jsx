import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import menuList from '@/config/menuConfig';
import './index.less';
export default class AppHeader extends Component {
  state = {
		current: ''
	};
	handleClick = (e) => {
		console.log('click ', e);
		this.setState({
		   current: e.key
		});
	}
	renderSubMenu = ({key, title, subs}) => {
		return (
			<Menu.SubMenu key={key}>
				{
					subs && subs.map(item => {
						return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
					})
				}
			</Menu.SubMenu>
		)
	}
	renderMenuItem = ({key, title,}) => {
		return (
			<Menu.Item key={key}>
        <Link to={key}>
            <span>{title}</span>
        </Link>
			</Menu.Item>
		)
	}
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        defaultSelectedKeys={['/pages/home']}
        defaultOpenKeys={['/pages/home']}
        mode="horizontal"
        className="inline-block font-semibold"
      >
        {
					menuList.map(item => {
						return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
					})
				}
      </Menu>
    )
  }
}
