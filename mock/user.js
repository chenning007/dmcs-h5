


/*
export const get_List = {
    list: getActivities,
    list_activities: get_Activities,
    list_people: list_people,
    loading,
    loading1, 
  }
  
export default {
    getNotice,
    getActivities,
    getFakeList,
    get_Activities,
  };
*/
  export const currentUser = {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
      userid: '00000001',
      notifyCount: 12,
    },
  };