/////
/*****
 * 
 *用于产生用户的信息
 * 
 * 
 */
//////
  const address = [{
    key: '1',
  　title: '学校',
    name: '蔡志军',
    area: '北京市海淀区四环到五环之间',
    place: '清华大学紫荆公寓11号楼',
    mobilephone: '15702555845',
    fixedphone: '',
    emial: '',
  },{
    key: '2',
    title: '家里',
    name: '蔡志军',
    area: '江西上饶市鄱阳县油墩街镇',
    place: '油墩街镇潼港村委会表公村137号',
    mobilephone: '15702555845',
    fixedphone: '',
    emial: '',
  },{
    key: '3',
    title: null,
    name: null,
    area: null,
    place: null,
    mobilephone: null,
    fixedphone: null,
    email: null,
  }];

  export const currentUser = {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      avatar: 'http://localhost:80/image/ZiESqWwCXBRQoaPONSJe.png',
      userNumber : '1234567',
      username : 'caizj15',
      realname : '蔡志军',
      userSex : '男' ,
      useridNumber : '362330199819959003',
      userEmail : 'caizj@123.com' ,
      userEmail_1 : null ,
      userworkPlace : '清华大学' ,
      userTelephone : '15701585253' ,
      userTelephone_1 : null ,
      userWeixin : '大头' ,
      userQq : '1760258010' ,
      address : address,
    },
  };
  