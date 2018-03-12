// mock data
const step = {
  payAccount: 'ant-design@alipay.com',
  receiverAccount: 'test@example.com',
  receiverName: 'Alex',
  amount: '500',

};

const regularFormSubmitting = false;
const stepFormSubmitting = false;
const advancedFormSubmitting = false;

const deviceinfo = [{
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  }, 
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  }
];

export const getFakeFormData = {
  step,  
  regularFormSubmitting,
  stepFormSubmitting,
  advancedFormSubmitting,
  deviceinfo,

};

export default {
  getFakeFormData,
};
