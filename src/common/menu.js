const menuData = [{
  name: '设备监控',
  icon: 'dashboard',
  path: 'dashboard/device',
  },
  {
  name: ' 群组管理',
  icon: 'team',
  path: 'list/search',
    children: [
      {
        name: '设备',
        path: 'device_list',
      },
      {
        name: '朋友',
        path: 'friend_list',
      },
      {
        name: '数据',
        path: 'data_list',
     },
     {
        name: '文件',
        path: 'file_list',
     },
    ],
  
}, {
  name: '个人管理',
  icon: 'solution',
  path: 'profile',
  children: [{
    name: '信息',
    path: 'basic-profile',
  }, 
  {
    name: '修改',
    path: 'set_up',
  },
  {
    name: '踪迹',
    path: 'trace',
  }, {
    name: '财务',
    path: 'finance',
  }],
}, 
{
  name: '网站维护',
  icon: 'setting',
  path: 'authority/manage_list',
  //authority: ['admin'],
},

{
  name: '使用文档',
  icon: 'book',
  path: 'http://pro.ant.design/docs/getting-started',
  target: '_blank',
}
];

function formatter(data, parentPath = '') {
  const list = [];
  data.forEach((item) => {
    if (item.children) {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
        children: formatter(item.children, `${parentPath}${item.path}/`),
      });
    } else {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
      });
    }
  });
  return list;
}

export const getMenuData = () => formatter(menuData);
