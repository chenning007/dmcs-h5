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
  '压力表',
  '测温计',
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
const avatars1 = [
  'file:///usr/mygit/dmcs-h5/public/image/device1.jpeg',
  'file:///usr/mygit/dmcs-h5/public/image/device2.jpeg',
  'file:///usr/mygit/dmcs-h5/public/image/device3.jpeg',
  'file:///usr/mygit/dmcs-h5/public/image/device4.jpeg',
  'file:///usr/mygit/dmcs-h5/public/image/device5.jpeg',
  'file:///usr/mygit/dmcs-h5/public/image/device6.jpeg',
  'file:///usr/mygit/dmcs-h5/public/image/device7.jpeg',
  'file:///usr/mygit/dmcs-h5/public/image/device8.jpeg',
  'file:///usr/mygit/dmcs-h5/public/image/device9.jpeg',
  'file:///usr/mygit/dmcs-h5/public/image/device10.jpeg',
  'file:///usr/mygit/dmcs-h5/public/image/device11.jpeg',
  'file:///usr/mygit/dmcs-h5/public/image/device12.jpeg',
  'file:///usr/mygit/dmcs-h5/public/image/device13.jpeg',
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
const will_number = [
  2017010000001,
  2017010000002,
  2017010000003,
  2017010000004,
  2017010000005,
  2017010000006,
  2017010000007,
  2017010000008,
  2017010000009,
  2017010000010,
  2017010000011,
  2017010000012,
  2017010000013,
  2017010000014,
  2017010000015, //15
]
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
  '2016-05-01',
  '2016-06-01',
  '2016-07-01',
  '2016-08-01', //12
  '2016-09-01',
  '2016-10-01',
  '2016-11-01',//15
];
const secret = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'k',
];
//但是这里没有显示出来设备的具体的信息

export function deviceList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      key: i,
      deviceNumber: deviceNumber[i%  9],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      description: description[i % 8],
      time: time[i % 8],
    });
  }
  return list;
}
export function will_deviceList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      key: i,
      deviceNumber: deviceNumber[i%  10],
      defaulttitle: titles[i % 10],
      defaultavatar: avatars1[i % 10],
      secret: secret[i %10],
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
      myself_device: deviceList(count),
      public_device: [],
      device_will: will_deviceList(10),
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