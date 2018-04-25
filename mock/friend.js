import { getUrlParams } from './utils';

const loading = true;
const loading1 = true;

const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars2 = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
];
//
export const list_people = [
  {
    key: '1',
    avatar: avatars2[1],
    useridNumber: '123456',
    userName: 'John',
    userTitle: '张三丰',
    userTelephone: '15701575451',
    userworkPlace: '清华大学',
  }, {
    key: '2',
    avatar: avatars2[2],
    useridNumber: '123457',
    userName: 'Jim',
    userTitle: '宋远桥',
    userTelephone: '15701575452',
    userworkPlace: '北京大学',
  }, {
    key: '3',
    avatar: avatars2[3],
    useridNumber: '123458',
    userName: 'Sara',
    userTitle: '张无忌',
    userTelephone: '15701575453',
    userworkPlace: '南昌大学',
  },{
    key: '4',
    avatar: avatars2[4],
    useridNumber: '123459',
    userName: '阿军', 
    userTitle: '殷素素',
    userTelephone: '15701575454',
    userworkPlace: '清华大学',
  },{
    key: '5',
    avatar: avatars2[5],
    useridNumber: '123459',
    userName: '刘大哥',
    userTitle: '令狐冲',
    userTelephone: '15701575455',
    userworkPlace: '武汉大学',
  },{
    key: '6',
    avatar: avatars2[6],
    useridNumber: '123451',
    userName: '胡军',
    userTitle: '任盈盈',
    userTelephone: '15701575456',
    userworkPlace: '华南理工大学',
  },{
    key: '7',
    avatar: avatars2[7],
    useridNumber: '123449',
    userName: '大军',
    userTitle: '岳灵珊',
    userTelephone: '15701575460',
    userworkPlace: '广州大学',
  },{
    key: '8',
    avatar: avatars2[8],
    useridNumber: '123447',
    userName: '大胡子',
    userTitle: '林平之',
    userTelephone: '15701575447',
    userworkPlace: '南京大学',
  },
  {
    key: '9',
    avatar: avatars2[9],
    useridNumber: '123445',
    userName: '灯泡',
    userTitle: '岳不群',
    userTelephone: '15701575445',
    userworkPlace: '东南大学',
  },
  {
    key: '10',
    avatar: avatars2[0],
    useridNumber: '123443',
    userName: '滤波器',
    userTitle: '风清扬',
    userTelephone: '15701575441',
    userworkPlace: '苏州大学',
  },
];
export const get_Friend = {
  list_friend: list_people,
  loading,
  loading1, 
}
