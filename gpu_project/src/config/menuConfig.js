const menuList = [
  {
    title: '主页',
    key: '/home',
    roles: ['admin','guest']
  },
  {
    title: '资源',
    key: '/resource',
    roles: ['admin',"guest"]
  },
  {
    title: '监控和任务调度',
    key: '/monitor',
    roles: ['admin','guest']
  },
  {
    title: '体验中心',
    key: '/experience',
    roles: ['admin','guest']
  },
  {
    title: '后台管理',
    key: '/management',
    roles: ['admin']
  }
]
export default menuList;

