import { getUrlParams } from './utils';
const titles = [
  '电视',
  '冰箱',
  '空调',
  '洗衣机',
  '脱水机',
  '微波炉',
  '灯泡',
  '开关',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];
const deviceNumber = [
  2018010000001,
  2018010000002,
  2018010000003,
  2018010000004,
  2018010000005,
  2018010000006,
  2018010000007,
  2018010000008,
  2018010000009,
];
const description = [
  '观测天下',
  '永远吃最新鲜的水果',
  '给你舒适的生活',
  '拯救苦逼的学生',
  '再也不用担心衣服干不了',
  '任何时候可以吃到任何温度的食物',
  '光明不再如此的遥远',
  '0与1之间的跳动,天壤之别',
];
const time = [
  '2011-01-01',
  '2012-02-02',
  '2013-03-03',
  '2014-04-04',
  '2015-06-05',
  '2016-06-06',
  '2017-07-07',
  '2018-08-08',

] 

export function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      deviceNumber: deviceNumber[i%  9],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      description: description[i % 8],
      time: time[i % 8],
    });
  }
  return list;
}
export function getDeviceList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);

  const count = 8;

  const result = {
      myself_device: fakeList(count),
      public_device: [],
      loading: true,
    };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export default {
  getDeviceList,
};