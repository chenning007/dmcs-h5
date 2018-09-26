import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

//
const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};
// wrapper of dynamic

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = item.name;
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = item.name;
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/dashboard/device': {
      component: dynamicWrapper(app, ['device', 'user'], () =>
        import('../routes/Dashboard/Device')
      ),
      // hideInBreadcrumb: true,
      // name: '工作台',
    },
    '/dashboard/graph': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Graph')),
    },
    '/dashboard/monitor_dgo': {
      component: dynamicWrapper(app, [], () => import('../routes/Dashboard/Monitor_dgo')),
    },
    '/dashboard/monitor_dgo/monitor_device': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/Dashboard/Monitor_device')
      ),
    },
    '/dashboard/monitor_dgo/monitor_graph': {
      component: dynamicWrapper(app, ['monitor', 'chart'], () =>
        import('../routes/Dashboard/Monitor_graph')
      ),
    },
    '/dashboard/monitor_dgo/monitor_data': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor_data')),
    },
    '/dashboard/monitor_device': {
      component: dynamicWrapper(app, ['monitor'], () =>
        import('../routes/Dashboard/Monitor_device')
      ),
    },
    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
    },
    '/form/step-form/info': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    },
    '/form/step-form/confirm': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
    },
    '/form/step-form/result': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    },
    '/list/device_friend': {
      component: dynamicWrapper(app, ['list', 'friend', 'form'], () =>
        import('../routes/List/Device_friend')
      ),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
    },
    '/list/search/friend_list': {
      component: dynamicWrapper(app, ['friend'], () => import('../routes/List/Friend_list')),
    },
    '/list/search/device_list': {
      component: dynamicWrapper(app, ['device', 'user'], () =>
        import('../routes/List/Device_list')
      ),
    },
    '/list/search/data_list': {
      component: dynamicWrapper(app, ['list', 'project', 'activities', 'chart'], () =>
        import('../routes/List/Data_list')
      ),
    },
    '/list/search/file_list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/File_list')),
    },
    '/authority/manage_list': {
      component: dynamicWrapper(app, ['manage_group', 'login', 'tem_store'], () =>
        import('../routes/Authority/Manage_list')
      ),
      authority: 'admin' || 'host',
    },
    '/authority/manage_file': {
      component: dynamicWrapper(app, ['manage_group', 'tem_store', 'document'], () =>
        import('../routes/Authority/Manage_file')
      ),
      authority: 'admin' || 'host',
    },
    '/authority/manage_group': {
      component: dynamicWrapper(app, ['list', 'friend', 'form', 'manage_group', 'login'], () =>
        import('../routes/Authority/Manage_group')
      ),
      authority: 'admin' || 'host',
    },
    '/profile': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/Profile')),
    },
    '/profile/trace': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/TraceProfile')),
    },
    '/profile/finance': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/FinanceProfile')),
    },
    '/profile/basic-profile': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/Profile/Basic_profile')),
    },
    '/profile/set_up': {
      component: dynamicWrapper(app, ['user', 'form'], () => import('../routes/Profile/Set_up')),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/firstpage': {
      component: dynamicWrapper(app, [], () => import('../routes/FirstPage/FirstPage')),
    },
    '/user/pageinfo': {
      component: dynamicWrapper(app, [], () => import('../routes/FirstPage/Pageinfo')),
    },
    '/user/pagelist': {
      component: dynamicWrapper(app, [], () => import('../routes/FirstPage/PageList')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/RegisterResult')),
    },
    '/user/update-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/UpdateResult')),
    },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  const routerData = {};

  Object.keys(routerConfig).forEach(path => {
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};

    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];

    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });
  return routerData;
};
