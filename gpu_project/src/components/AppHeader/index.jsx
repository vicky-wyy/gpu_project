import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import menuList from '@/config/menuConfig';
import memoryUtils from '@/utils/memoryUtils';

import './index.less';
class AppHeader extends Component {
	// renderSubMenu = ({key, title, subs}) => {
	// 	return (
	// 		<Menu.SubMenu key={key}>
	// 			{
	// 				subs && subs.map(item => {
	// 					return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
	// 				})
	// 			}
	// 		</Menu.SubMenu>
	// 	)
	// }
	// renderMenuItem = ({key, title,}) => {
	// 	return (
	// 		<Menu.Item key={key}>
  //       <Link to={key}>
  //           <span>{title}</span>
  //       </Link>
	// 		</Menu.Item>
	// 	)
	// }
  getMenuNodes = (menuList)=>{
    const path = this.props.location.pathname
    return menuList.reduce((pre,item)=>{
        if(!item.children){
          const admin = true
          if((admin===true && item.auth) || !item.auth){
            pre.push((
              <Menu.Item key={item.key}>
                <Link to={item.key}>
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
            ))
          }
        }else {
          const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
          if(cItem){
            this.openKey = item.key
          }
          pre.push((
            <Menu.SubMenu
              key={item.key}
              title={
                <span>{item.title}</span>
              }
            >
              {
                this.getMenuNodes(item.children)
              }
            </Menu.SubMenu>
          ))
        }
      return pre
    },[])
  }

  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
    let path = this.props.location.pathname

    const openKey = this.openKey
    return (
      <Menu
        selectedKeys={[path]}
        defaultOpenKeys={[openKey]}
        mode="horizontal"
        className="inline-block font-semibold"
      >
        {/* {
					menuList.map(item => {
						return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
					})
				} */}
        {
          this.menuNodes
        }
      </Menu>
    )
  }
}
export default withRouter(AppHeader)