import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Cascader,
  Row, Col, Avatar, Upload, Divider
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from '../../components/FooterToolbar';

import logo from '../../../public/title.png';

const FormItem = Form.Item;
const { Option } = Select;
//const { RangePicker } = DatePicker;
const { TextArea } = Input;

const userNumber = '1234567';
const userName = '蔡哥';
const userTitle = '蔡志军';
const userSex = '男' ;
const useridNumber = '362330199819959003';
const userEmail = 'caizj@123.com';
const userworkPlace = '清华大学';
const userTeleplone = '15701585253';
const userWeixin = '大头';
const userQq = '1760258010';
/*const identify = ['undergraduate'];
const identification = [{
  label: '请选择',
  value: 'choice',
}
,{
   label: '初中',
   value: 'middle',
},{
   label: '高中',
   value: 'high' ,
},{
  label: '中专',
  value: 'middle1',
},{
  label: '大专',
  value: 'high1',
},{
  label: '本科',
  value: 'undergraduate',
},{
  label: '硕士',
  value: 'postgraduate',
},{
  label: '博士',
  value: 'doctor',
},{
  label: '其它',
  value: 'other',
}
];*/
const address = {
    name: '蔡志军',
    area: '北京市海淀区四环到五环之间',
    place: '清华大学紫荆公寓11号楼',
    mobilephone: '15702555845',
    emial: '',
  };

/**** */
const formItemLayout = {
  labelCol: {
    xs: { span: 12, offset: -10 },
    sm: { span: 7 , offset: -10 }, 
  },
  wrapperCol: {
    xs: { span: 12, offset: 3},
    sm: { span: 12 },
    md: { span: 10 },
  },
 // marginBottom: 48,
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 10 },
  },
};
/****** */

@connect(state => ({
  data: state.form.data,
  submitting: state.form.regularFormSubmitting,
}))
@Form.create()
export default class Basic_profiles extends PureComponent {
  state = {
    changename: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }

  onChangeUserName = (e) => {
    this.setState({ data: e.target.value });
  }
  
  onChangestate = () => {
    this.setState({changename: !this.state.changename ,})
  }

  renderInput(text)  {
    return text? <a>修改</a> : <a>绑定</a> ;
 }
  renderInfo() {
    const { form, state }=this.props;
    const { getFieldDecorator, getFieldValue }=this.props.form;
    //const { changename }=this.state;
    
      return (
        <Form
          hideRequiredMark
          style={{ marginTop: 8 }}
        >
          <FormItem
            colon={false}
            labelCol={{span: 4, offset: 0}}
            wrapperCol={{span: 8, offset: 2}}
            label={<b>用户名:</b>}
          > 
            <h3>{userName? userName:'未命名'}</h3>
          </FormItem>
          <FormItem
            colon={false}
            labelCol={{span: 4, offset: 0}}
            wrapperCol={{span: 8, offset: 2}}
           //{...formItemLayout}
            label={<b>用户号:</b>}
          >
            <h3>{userNumber ? userNumber : '待补充'}</h3>           
          </FormItem> 
          <FormItem
             colon={false}
             labelCol={{span: 4, offset: 0}}
             wrapperCol={{span: 8, offset: 2}}
             label={<b>姓名:</b>}
          >
            <h3>{userTitle ? userTitle:'待补充'}</h3>
          </FormItem>
          <FormItem
             colon={false}
             labelCol={{span: 4, offset: 0}}
             wrapperCol={{span: 8, offset: 2}}
             label={<b>性别:</b>}
          >
            <h3>{userSex ? userSex:'待补充'}</h3>
          </FormItem>
          <FormItem
             colon={false}
             labelCol={{span: 4, offset: 0}}
             wrapperCol={{span: 8, offset: 2}}
             label={<b>身份证号:</b>}
          >
            <h3>{useridNumber ? useridNumber:'待补充'}</h3>
          </FormItem>
          <FormItem
             colon={false}
             labelCol={{span: 4, offset: 0}}
             wrapperCol={{span: 8, offset: 2}}
             label={<b>工作单位:</b>}
          >
            <h3>{userworkPlace ? userworkPlace:'待补充'}</h3>
          </FormItem>
          {/*
            <FormItem
              colon={false}
              labelCol={{span: 4, offset: 0}}
              wrapperCol={{span: 8, offset: 2}}
              label={<b>受教育程度:</b>}
            >
              <h3>本科</h3>
            </FormItem> 
          */}
        </Form>
      );
   /*
    if(changename){
      return(
        <Form>
          <FormItem
            colon={false}
            labelCol={{span: 4, offset: 0}}
            wrapperCol={{span: 8, offset: 2}}
            label={<b>"用户号"</b>}
          >
            <h3>{userNumber}</h3>           
          </FormItem>
          <FormItem
            colon={false}
            labelCol={{span: 8, offset: 0}}
            wrapperCol={{span: 8, offset: 2}}
            label={<b>用户名:</b>}
          > 
            {getFieldDecorator('username', {
              initialValue: userName,
              rules: [{
                required: false, 
              }],
            })(
              <Input  size="large" placeholder="例如: 12345678@123.com" 
              />
            )}
          </FormItem>
          <FormItem
             colon={false}
             labelCol={{span: 8, offset: 0}}
             wrapperCol={{span: 8, offset: 2}}
             label={<b>头衔:</b>}
          >
            <h3>{userTitle}</h3>
          </FormItem> 
          <FormItem
             colon={false}
             labelCol={{span: 4, offset: 0}}
             wrapperCol={{span: 8, offset: 2}}
             label={<b>受教育程度:</b>}
          >
            {getFieldDecorator('identification', {
              initialValue: ['undergraduate'] ,identify,
              rules: [{ 
                      //type :'array',
                      required: false, 
              }],
          })(
            <Cascader options={identification} placeholder='请选择' />
          )}
          </FormItem>
        </Form>
      );*/
      
  }
  
  render() {
    const { submitting, form, data } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <div>
        <Card   
          title={<div><b>基本信息</b></div>}
          bordered={true}
          style={{ marginBottom: 24 }}
        >
          <Row> 
            <Col span={6} >
              <Card
                //bordered={true}
                style={{ marginTop: 10, textAlign: 'center', width: 240, marginLeft: 30 }}

              // title='个人头像'
              >
                <div > 
                  <img src='https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png' alt="头像" width="80%" />
                </div>
                <div style={{ marginTop: 16 }}>
                  <Upload>
                    <Button>
                        <Icon type="upload"/>
                          更改头像
                    </Button>
                  </Upload>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card
               style={{ marginTop: -10 }}
               bordered={false}
              >
                {this.renderInfo()}
              </Card>
            </Col>
          </Row>
        </Card>
        <Card 
          title={<div><b>联系方式</b></div>}
          bordered={true}
          style={{marginBottom: 24}}
        > 
          <Row> 
            <Col span={6}/>
            <Col span={12}> 
              <Form
                hideRequiredMark
                style={{ marginTop: 8 }}
              >
                <FormItem
                  colon={false}
                  labelCol={{span: 4, offset: 0}}
                  wrapperCol={{span: 8, offset: 2}}
                  label={<b>邮箱:</b>}
                > 
                  <h3>{userEmail? userEmail:'待补充'}</h3>
                </FormItem>
                <FormItem
                  colon={false}
                  labelCol={{span: 4, offset: 0}}
                  wrapperCol={{span: 8, offset: 2}}
                  label={<b>手机号:</b>}
                > 
                  <h3>{userTeleplone? userTeleplone :'待补充'}</h3>
                </FormItem>
                <FormItem
                  colon={false}
                  labelCol={{span: 4, offset: 0}}
                  wrapperCol={{span: 8, offset: 2}}
                  label={<b>微信号:</b>}
                > 
                  <h3>{userWeixin? userWeixin :'待补充'}</h3>
                </FormItem>
                <FormItem
                  colon={false}
                  labelCol={{span: 4, offset: 0}}
                  wrapperCol={{span: 8, offset: 2}}
                  label={<b>QQ号:</b>}
                > 
                  <h3>{userQq? userQq :'待补充'}</h3>
                </FormItem>
              </Form>
            </Col>
          </Row>    
        </Card>
        <Card
          title={<div><b>邮寄地址</b></div>}
          bordered={true}
        >
          

        </Card>
        {/*
        <Card 
          title= '绑定信息'
          bordered={true}
          style={{marginBottom: 24 }}
        >
          <Row>
            <Col span={12}>  
              <FormItem
                {...formItemLayout}
                label="手机"
              >
                {getFieldDecorator('telepnone', {
                  initialValue: telephone? telephone: '待绑定',
                  rules: [{
                    required: false, 
                  }],
                })(
                    <Input size="large"/>
                )}
                <a>{telephone? '修改':'绑定'}</a>
              </FormItem> 
              <FormItem
                {...formItemLayout}
                label="邮箱"
              >
                {getFieldDecorator('mailbox', {
                  initialValue: email ? email :'待绑定',
                  rules: [{
                    required: false, 
                  }],
                })(
                    <Input size="large"/>
                )}
                <a>{email? '修改':'绑定'}</a>
              </FormItem>   
            </Col>
            <Col span={4} />
          </Row> 
              </Card>*/}
        {/*
        <FooterToolbar>
          <Button type="primary" htmlType="submit" loading={submitting}
          onClick={this.onChangestate}
          >
            编辑
          </Button>
          <Divider type= 'vertical'/>
          <Button type="primary" htmlType="submit" loading={submitting}
          onClick={this.onChangestate}
          >
            保存
          </Button>
        </FooterToolbar>*/ }
      </div>
    );
  }
}