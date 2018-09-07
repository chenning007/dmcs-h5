import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}
////
export async function queryFriend() {
  return request('/api/friends');
}
//////
export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/device/addDevice', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('api/fake_chart_data');
}

export async function fakeDeviceData() {
  return request('api/fake_form_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryDeviceInfo() {
  return request('/api/device/queryDeviceInfo');
}

export async function queryDeviceList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

//
export async function queryFakeList() {
  return request('/api/query/fake');
}
export async function queryActivities(){
  return request('/api/query/fake');
}
//

export async function accountLogin(params) {
  return request('/api/v1/user/login', {
    method: 'POST',
    body: params,
  });
}

export async function accountTemcheck(params) {
  return request('api/v1/user/temcheck',{
    method: 'POST',
    body: params,
  });
}

export async function register(params) {
  return request('/api/v1/user/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function queryadminuser(params) {
  return request('/api/v1/admin/getAdminuser',{
    method: 'POST',
    body: params,
  });
}
export async function deleteadminuser(params) {
  return request('/api/v1/admin/deleteAdminuser',{
    method: 'POST',
    body: params,
  });
}
export async function addAdminuser(params) {
  return request('/api/v1/admin/addAdminuser',{
    method: 'POST',
    body: params,
  });
}
export async function changeauthority(params) {
  return request('/api/v1/admin/changeAuthority',{
    method: 'POST',
    body: params,
  });
}
