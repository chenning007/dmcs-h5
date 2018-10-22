import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

// //
// // //

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
export async function queryActivities() {
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
  return request('api/v1/user/temcheck', {
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
  return request('/api/v1/admin/getAdminuser', {
    method: 'POST',
    body: params,
  });
}
export async function deleteadminuser(params) {
  return request('/api/v1/admin/deleteAdminuser', {
    method: 'POST',
    body: params,
  });
}
export async function addAdminuser(params) {
  return request('/api/v1/admin/addAdminuser', {
    method: 'POST',
    body: params,
  });
}
export async function changeauthority(params) {
  return request('/api/v1/admin/changeAuthority', {
    method: 'POST',
    body: params,
  });
}

export async function queryFriend(params) {
  return request('/api/v1/user/getuser', {
    method: 'POST',
    body: params,
  });
}

export async function getselfUser(params) {
  return request('/api/v1/admin/getSelfuser', {
    method: 'POST',
    body: params,
  });
}

export async function getdocument(params) {
  return request('/api/v1/admin/getdocument', {
    method: 'POST',
    body: params,
  });
}

export async function logout() {
  return request('/api/v1/user/logout');
}

export async function verifyaccount(params) {
  return request('/api/v1/user/verifyaccount', {
    method: 'POST',
    body: params,
  });
}

export async function motivate(params) {
  return request('/api/v1/user/motivate', {
    method: 'POST',
    body: params,
  });
}

export async function updateUser(params) {
  return request('/api/v1/user/updateuser', {
    method: 'POST',
    body: params,
  });
}

export async function DeleteFile(params) {
  return request('/api/v1/file/deleteFile', {
    method: 'POST',
    body: params,
  });
}

export async function GetFileList() {
  return request('/api/v1/file/getFilelist');
}

export async function GetImageList() {
  return request('/api/v1/file/getImagelist');
}

export async function GetFileToken() {
  return request('/api/v1/file/getFileToken');
}

export async function GetFileImage(params) {
  return request('/api/v1/file/getFileImage', {
    method: 'POST',
    body: params,
  });
}
