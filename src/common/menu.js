const menuData = [{
  name: '设备管理',
  icon: 'dashboard',
  path: 'dashboard/workplace',
  //children: [{
  //  name: '工作台',
 //   path: 'workplace',
 // }, {
 //   name: '监控页',
  //  path: 'monitor',
 // }, {
  //  name: '分析页',
///    path: 'analysis',
    // hideInMenu: true,
 // }],
},// {
  //name: '设备管理',
 // icon: 'form',
 // path: 'form',
 /// children: [{
 //   name: '创建设备',
 //   path: 'basic-form',
 // }, {
  //  name: '设备列表',
 //   path: 'advanced-form',
 // }, {
 //   name: '系统管理',
 //   path: 'step-form',
 // }],
//},
 {
  name: ' 群组管理',
  icon: 'table',
  path: 'list/search',
  //children: [{
 //   name: '查询表格',
 //   path: 'table-list',
 //// }, {
 //   name: '标准列表',
 //   path: 'basic-list',
 /// }, {
 //   name: '卡片列表',
 //   path: 'card-list',
///  }, {
//    name: '搜索列表',
//    path: 'search',
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
     }],
  
}, {
  name: '个人管理',
  icon: 'profile',
  path: 'profile',
  children: [{
    name: '信息',
    path: 'basic-form',
  }, 
  {
    name: '设置',
    path: 'set_up',
  },
  
  {
    name: '踪迹',
    path: 'basic',
  }, {
    name: '财务',
    path: 'advanced',
  }],
}, 
/*{
  name: '结果页',
  icon: 'check-circle-o',
  path: 'result',
  children: [{
    name: '成功',
    path: 'success',
  }, {
    name: '失败',
    path: 'fail',
  }],
}, {
  name: '异常页',
  icon: 'warning',
  path: 'exception',
  children: [{
    name: '403',
    path: '403',
  }, {
    name: '404',
    path: '404',
  }, {
    name: '500',
    path: '500',
  }, {
    name: '触发异常',
    path: 'trigger',
  }],
}, */
//{
//  name: '账户',
//  icon: 'user',
//  path: 'user',
//  children: [{
//    name: '登录',
//    path: 'login',
//  }, {
//    name: '注册',
//    path: 'register',
//  }, {
//    name: '注册结果',
//    path: 'register-result',
//  }],
//}, 
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
