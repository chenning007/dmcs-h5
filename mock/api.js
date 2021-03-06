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
const avatars = [
  'http://39.104.208.4/image/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'http://39.104.208.4/image/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'http://39.104.208.4/image/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'http://39.104.208.4/image/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'http://39.104.208.4/image/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'http://39.104.208.4/image/kZzEzemZyKLKFsojXItE.png', // React
  'http://39.104.208.4/image/ComBAopevLwENQdKWiIn.png', // Vue
  'http://39.104.208.4/image/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const avatars2 = [
  'http://39.104.208.4/image/BiazfanxmamNRoxxVxka.png',
  'http://39.104.208.4/image/cnrhVkzwxjPwAaCfPbdc.png',
  'http://39.104.208.4/image/gaOngJwsRYRaVAuXXcmB.png',
  'http://39.104.208.4/image/ubnKSIfAJTxIgXOKlciN.png',
  'http://39.104.208.4/image/WhxKECPNujWoWEFNdnJE.png',
  'http://39.104.208.4/image/jZUIxmJycoymBprLOUbT.png',
  'http://39.104.208.4/image/psOgztMplJMGpVEqfcgF.png',
  'http://39.104.208.4/image/ZpBqSxLxVEXfcUNoPKrz.png',
  'http://39.104.208.4/image/laiEnJdGHVOhJrUShBaJ.png',
  'http://39.104.208.4/image/UrQsqscbKEpNuJcvBZBu.png',
];

const covers = [
  'http://39.104.208.4/image/uMfMFlvUuceEyPpotzlq.png',
  'http://39.104.208.4/image/iZBVOIhGJiAnhplqjvZW.png',
  'http://39.104.208.4/image/uVZonEtjWwmUZPBQfycs.png',
  'http://39.104.208.4/image/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

export function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescription: desc[i % 5],
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar: 'http://39.104.208.4/image/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
        },
        {
          avatar: 'http://39.104.208.4/image/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
        },
        {
          avatar: 'http://39.104.208.4/image/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
        },
      ],
    });
  }

  return list;
}

export function getFakeList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  const count = params.count * 1 || 20;

  const result = fakeList(count);

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export const getNotice = [
  {
    id: 'xxx1',
    title: titles[0],
    logo: avatars[0],
    description: '那是一种内在的东西，他们到达不了，也无法触及的',
    updatedAt: new Date(),
    member: '科学搬砖组',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: titles[1],
    logo: avatars[1],
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    updatedAt: new Date('2017-07-24'),
    member: '全组都是吴彦祖',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: titles[2],
    logo: avatars[2],
    description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    updatedAt: new Date(),
    member: '中二少女团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: titles[3],
    logo: avatars[3],
    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    updatedAt: new Date('2017-07-23'),
    member: '程序员日常',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: titles[4],
    logo: avatars[4],
    description: '凛冬将至',
    updatedAt: new Date('2017-07-23'),
    member: '高逼格设计天团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: titles[5],
    logo: avatars[5],
    description: '生命就像一盒巧克力，结果往往出人意料',
    updatedAt: new Date('2017-07-23'),
    member: '骗你来学计算机',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx7',
    title: titles[6],
    logo: avatars[6],
    description: '我爱科研，科研爱我',
    updateAt: new Date('2017-08-23'),
    member: '一起来高科研',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx8',
    title: titles[7],
    logo: avatars[7],
    description: '我爱运动，一起happy',
    updateAt: new Date('2017-0９-23'),
    member: '一起来跑步',
    href: '',
    memberLink: '',
  },
];

export const getActivities = [
  {
    id: 'trend-1',
    title: '曲丽丽',
    logo: avatars2[0],
    description: '高逼格设计天团',
    updatedAt: new Date(),
    member: '六月迭代',
    href: '',
    memberLink: '',
  },
  {
    id: 'trend-2',
    title: '付小小',
    logo: avatars2[1],
    description: '高逼格设计天团',
    updatedAt: new Date(),
    member: '六月迭代',
    href: '',
    memberLink: '',
  },
  {
    id: 'trend-3',
    title: '林东东',
    logo: avatars2[2],
    description: '中二少女团',
    updatedAt: new Date(),
    member: '六月迭代',
    href: '',
    memberLink: '',
  },
  {
    id: 'trend-4',
    title: '周星星',
    logo: avatars2[4],
    description: '5 月日常迭代',
    updatedAt: new Date(),
    member: '六月迭代',
    href: '',
    memberLink: '',
  },
  {
    id: 'trend-5',
    title: '朱偏右',
    logo: avatars2[3],
    description: '工程效能',
    updatedAt: new Date(),
    member: '留言',
    href: '',
    memberLink: '',
  },
  {
    id: 'trend-6',
    title: '乐哥',
    logo: avatars2[5],
    description: '程序员日常',
    updatedAt: new Date(),
    member: '品牌迭代',
    href: '',
    memberLink: '',
  },
];
export const get_Activities = [
  {
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: '曲丽丽',
      avatar: avatars2[0],
    },
    group: {
      name: '高逼格设计天团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: '付小小',
      avatar: avatars2[1],
    },
    group: {
      name: '高逼格设计天团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-3',
    updatedAt: new Date(),
    user: {
      name: '林东东',
      avatar: avatars2[2],
    },
    group: {
      name: '中二少女团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-4',
    updatedAt: new Date(),
    user: {
      name: '周星星',
      avatar: avatars2[4],
    },
    project: {
      name: '5 月日常迭代',
      link: 'http://github.com/',
    },
    template: '将 @{project} 更新至已发布状态',
  },
  {
    id: 'trend-5',
    updatedAt: new Date(),
    user: {
      name: '朱偏右',
      avatar: avatars2[3],
    },
    project: {
      name: '工程效能',
      link: 'http://github.com/',
    },
    comment: {
      name: '留言',
      link: 'http://github.com/',
    },
    template: '在 @{project} 发布了 @{comment}',
  },
  {
    id: 'trend-6',
    updatedAt: new Date(),
    user: {
      name: '乐哥',
      avatar: avatars2[5],
    },
    group: {
      name: '程序员日常',
      link: 'http://github.com/',
    },
    project: {
      name: '品牌迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
];
export const list_people = [
  {
    key: '1',
    avatar: avatars2[1],
    useridNumber: '123456',
    userName: 'John',
    userTelephone: '15701575451',
    userworkPlace: '清华大学',
  },
  {
    key: '2',
    avatar: avatars2[2],
    useridNumber: '123457',
    userName: 'Jim',
    userTelephone: '15701575452',
    userworkPlace: '清华大学',
  },
  {
    key: '3',
    avatar: avatars2[3],
    useridNumber: '123458',
    userName: 'Sara',
    userTelephone: '15701575453',
    userworkPlace: '清华大学',
  },
  {
    key: '4',
    avatar: avatars2[4],
    useridNumber: '123459',
    userName: '茅军',
    userTelephone: '15701575454',
    userworkPlace: '清华大学',
  },
  {
    key: '5',
    avatar: avatars2[5],
    useridNumber: '123459',
    userName: '刘军',
    userTelephone: '15701575455',
    userworkPlace: '清华大学',
  },
  {
    key: '6',
    avatar: avatars2[6],
    useridNumber: '123451',
    userName: '胡军',
    userTelephone: '15701575456',
    userworkPlace: '清华大学',
  },
];
export const get_Friend = {
  list: getActivities,
  list_activities: get_Activities,
  list_people: list_people,
  loading,
  loading1,
};

export default {
  getNotice,
  getActivities,
  getFakeList,
  get_Activities,
};
