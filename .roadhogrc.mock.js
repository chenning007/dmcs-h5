import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getNotice, getFakeList, get_List } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getFakeFormData } from './mock/form';
import { imgMap } from './mock/utils';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

import { currentUser } from './mock/user';
import { get_Friend } from './mock/friend';
import { getDeviceList } from './mock/device';
// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': currentUser,
  // GET POST 可省略
  'GET /api/project/notice': getNotice,
  'GET /api/friends': get_Friend,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getDeviceList,
  ////
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/fake_form_data': getFakeFormData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  //'GET /api/device/queryDeviceInfo':'http://localhost:8080/dmcs',
  //'POST /api/v1/user/login': 'http://localhost:8080/dmcs',
  //'POST /api/v1/user/register': 'http://localhost:8080/dmcs',
  /*'POST /api/v1/user/login': (req, res) => {
    const { password, userName, type } = req.body;
    if(password === '888888' && userName === 'admin'){
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return ;
    }
    if(password === '123456' && userName === 'user'){
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return ;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },*/

  /*'POST /api/v1/user/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  }, */
  'POST /api/v1/user/temcheck': 'http://127.0.0.1:8080/dmcs',
  'POST /api/v1/user/register': 'http://127.0.0.1:8080/dmcs',
  'POST /api/v1/user/getuser': 'http://127.0.0.1:8080/dmcs',
  'GET  /api/v1/user/logout': 'http://127.0.0.1:8080/dmcs',
  'POST /api/v1/user/verifyaccount': 'http://127.0.0.1:8080/dmcs',
  'POST /api/v1/user/motivate': 'http://127.0.0.1:8080/dmcs',
  'POST /api/v1/user/updateuser': 'http://127.0.0.1:8080/dmcs',

  'POST /api/v1/admin/getAdminuser': 'http://127.0.0.1:8080/dmcs',
  'POST /api/v1/admin/addAdminuser': 'http://127.0.0.1:8080/dmcs',
  'POST /api/v1/admin/changeAuthority': 'http://127.0.0.1:8080/dmcs',
  'POST /api/v1/admin/getSelfuser': 'http://127.0.0.1:8080/dmcs',
  'POST /api/v1/admin/getdocument': 'http://127.0.0.1:8080/dmcs',
  'POST /api/v1/admin/deletedocument': 'http://127.0.0.1:8080/dmcs',

  'POST /api/v1/file/deleteFile': 'http://127.0.0.1:8080/dmcs',
  'GET /api/v1/file/getFilelist': 'http://127.0.0.1:8080/dmcs',
  'GET /api/v1/file/getImagelist': 'httP://127.0.0.1:8080/dmcs',
  'GET /api/v1/file/getFileToken': 'http://127.0.0.1:8080/dmcs',

  'POST /api/device/addDevice': res => {
    res.send({ status: 'ok' });
  },
  'GET /api/query/fake': res => {
    res.send({
      status: 'ok',
    });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};

export default (noProxy ? {} : delay(proxy, 1000));

/*export default {
  'POST /api/(.*)': 'http://localhost:8080/dmcs/api/',
};*/
