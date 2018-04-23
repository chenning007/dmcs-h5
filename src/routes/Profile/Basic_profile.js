import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Route, Switch } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Cascader,
  Row, Col, Avatar, Upload, Divider
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from '../../components/FooterToolbar';

import logo from '../../../public/title.png';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const userNumber = '1234567';
const userName = '蔡哥';
const userTitle = '蔡志军';
const userSex = '男' ;
const useridNumber = '362330199819959003';
const userEmail = 'caizj@123.com';
const userEmail_1 = null;
const userworkPlace = '清华大学';
const userTelephone = '15701585253';
const userTelephone_1 = null;
const userWeixin = '大头';
const userQq = '1760258010';
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
  }];

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
  //data: state.form.data,
  //submitting: state.form.regularFormSubmitting,
}))
@Form.create()
export default class Basic_profiles extends PureComponent {
  state = {
    changename: false,
  };
  /*handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }*/
  onChangestate = () => {
     const {dispatch}=this.props;
     dispatch(routerRedux.push(`set_up`));
  }
  onChangeUserName = (e) => {
    this.setState({ data: e.target.value });
  }
  

  renderInfo() {
    //const { form, state }=this.props;
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
            label={<b>用户&nbsp;&nbsp;&nbsp;名:</b>}
          > 
            <h3>{userName? userName:'未命名'}</h3>
          </FormItem>
          <FormItem
            colon={false}
            labelCol={{span: 4, offset: 0}}
            wrapperCol={{span: 8, offset: 2}}
           //{...formItemLayout}
            label={<b>用户&nbsp;&nbsp;&nbsp;号:</b>}
          >
            <h3>{userNumber ? userNumber : '待补充'}</h3>           
          </FormItem> 
          <FormItem
             colon={false}
             labelCol={{span: 4, offset: 0}}
             wrapperCol={{span: 8, offset: 2}}
             label={<b>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</b>}
          >
            <h3>{userTitle ? userTitle:'待补充'}</h3>
          </FormItem>
          <FormItem
             colon={false}
             labelCol={{span: 4, offset: 0}}
             wrapperCol={{span: 8, offset: 2}}
             label={<b>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</b>}
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
        </Form>
      );  
  }
  
  render() {
    const { /*submitting,*/ form, } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <div
      //className='all'
      >
        <Card 
          //className='basic_info'  
          title={<div className='basic_info'><b>基本信息</b></div>}
          bordered={true}
          style={{ marginBottom: 24 }}
        >
          <Row> 
            <Col span={6} className='image'>
              <Card
                //bordered={true}
                style={{ marginTop: 10, textAlign: 'center', width: 240, marginLeft: 30 }}

              // title='个人头像'
              >
                <div className='image'> 
                  <img src='https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png' alt="头像" width="80%" />
                </div>
                <div 
                 className='headimage'
                style={{ marginTop: 16 }}>
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
          //className='link_method'
          title={<div ><b>联系方式</b></div>}
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
                {userEmail_1
                 &&
                  <FormItem
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>备注邮箱:</b>}
                  >
                    <h3>{userEmail_1}</h3>
                  </FormItem>
                }
                <FormItem
                  colon={false}
                  labelCol={{span: 4, offset: 0}}
                  wrapperCol={{span: 8, offset: 2}}
                  label={<b>手机号:</b>}
                > 
                  <h3>{userTelephone? userTelephone :'待补充'}</h3>
                </FormItem>
                { userTelephone_1
                  &&
                  <FormItem
                  colon={false}
                  labelCol={{span: 4, offset: 0}}
                  wrapperCol={{span: 8, offset: 2}}
                  label={<b>备注手机:</b>}
                  > 
                    <h3>{userTelephone_1}</h3>
                  </FormItem> 
                }
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
          //className='mail_address'
          title={<div ><b>邮寄地址</b></div>}
          bordered={true}
        >
          <Row className='address'>
            <Col span={4}/>
            <Col span={16}>
              
              {address.map((item) => {
                  return (
                      <Card 
                        bordered={true}
                        key={item.key}
                        title={item.title ? item.title : item.name}
                        style={{marginBottom:12}}
                        //className={item}
                      >
                        <p style={{paddingLeft: 24}}>收件人: &nbsp; <b> {item.name}</b></p>
                        <p style={{paddingLeft: 24}}>所在地区: &nbsp; <b> {item.area}</b></p>
                        <p style={{paddingLeft: 24}}>地址: &nbsp; <b> {item.place}</b></p>
                        <p style={{paddingLeft: 24}}>手机: &nbsp; <b> {item.name}</b></p>
                        <p style={{paddingLeft: 24}}>固定电话: &nbsp; <b> {item.fixedphone}</b></p>
                        <p style={{paddingLeft: 24}}>邮箱: &nbsp; <b> {item.emial}</b></p>
                      
                      </Card>
                    
                  )
                }
              )}
            </Col>
            <Col span={4}/>
          </Row>
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
        
        <FooterToolbar>
          <Button type="primary" size='large' 
            onClick={() =>this.onChangestate()}
          >
            修改
          </Button>
        </FooterToolbar>
      </div>
    );
  }
}