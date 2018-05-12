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
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 10 },
  },
};
/****** */
@connect(state => ({
  currentUser: state.user.currentUser,
}))

export default class Basic_profiles extends PureComponent {

  onChangestate = (avatar_src) => {
    const { dispatch }=this.props;
    dispatch(routerRedux.push(`set_up`));
  }
  

  renderInfo() {
    const { currentUser }=this.props; 
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
            <h3>{currentUser.userName? currentUser.userName:'未命名'}</h3>
          </FormItem>
          <FormItem
            colon={false}
            labelCol={{span: 4, offset: 0}}
            wrapperCol={{span: 8, offset: 2}}
            label={<b>用户&nbsp;&nbsp;&nbsp;号:</b>}
          >
            <h3>{currentUser.userNumber ? currentUser.userNumber : '待补充'}</h3>           
          </FormItem> 
          <FormItem
             colon={false}
             labelCol={{span: 4, offset: 0}}
             wrapperCol={{span: 8, offset: 2}}
             label={<b>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</b>}
          >
            <h3>{currentUser.userTitle ? currentUser.userTitle:'待补充'}</h3>
          </FormItem>
          <FormItem
             colon={false}
             labelCol={{span: 4, offset: 0}}
             wrapperCol={{span: 8, offset: 2}}
             label={<b>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</b>}
          >
            <h3>{currentUser.userSex ? currentUser.userSex:'待补充'}</h3>
          </FormItem>
          <FormItem
             colon={false}
             labelCol={{span: 4, offset: 0}}
             wrapperCol={{span: 8, offset: 2}}
             label={<b>身份证号:</b>}
          >
            <h3>{currentUser.useridNumber ? currentUser.useridNumber:'待补充'}</h3>
          </FormItem>
          <FormItem
             colon={false}
             labelCol={{span: 4, offset: 0}}
             wrapperCol={{span: 8, offset: 2}}
             label={<b>工作单位:</b>}
          >
            <h3>{currentUser.userworkPlace ? currentUser.userworkPlace:'待补充'}</h3>
          </FormItem>
        </Form>
      );  
  }
  
  render() {
    const { currentUser, form, } = this.props;
    return (
      <div>
        <Card   
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
                  <img src={currentUser.avatar} alt="头像" width="80%" />
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
                  <h3>{currentUser.userEmail? currentUser.userEmail:'待补充'}</h3>
                </FormItem>
                {currentUser.userEmail_1
                 &&
                  <FormItem
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>备注邮箱:</b>}
                  >
                    <h3>{currentUser.userEmail_1}</h3>
                  </FormItem>
                }
                <FormItem
                  colon={false}
                  labelCol={{span: 4, offset: 0}}
                  wrapperCol={{span: 8, offset: 2}}
                  label={<b>手机号:</b>}
                > 
                  <h3>{currentUser.userTelephone? currentUser.userTelephone :'待补充'}</h3>
                </FormItem>
                { currentUser.userTelephone_1
                  &&
                  <FormItem
                  colon={false}
                  labelCol={{span: 4, offset: 0}}
                  wrapperCol={{span: 8, offset: 2}}
                  label={<b>备注手机:</b>}
                  > 
                    <h3>{currentUser.userTelephone_1}</h3>
                  </FormItem> 
                }
                <FormItem
                  colon={false}
                  labelCol={{span: 4, offset: 0}}
                  wrapperCol={{span: 8, offset: 2}}
                  label={<b>微信号:</b>}
                > 
                  <h3>{currentUser.userWeixin? currentUser.userWeixin :'待补充'}</h3>
                </FormItem>
                <FormItem
                  colon={false}
                  labelCol={{span: 4, offset: 0}}
                  wrapperCol={{span: 8, offset: 2}}
                  label={<b>QQ号:</b>}
                > 
                  <h3>{currentUser.userQq? currentUser.userQq :'待补充'}</h3>
                </FormItem>
              </Form>
            </Col>
          </Row>    
        </Card>
        <Card
          title={<div ><b>邮寄地址</b></div>}
          bordered={true}
        >
          <Row className='address'>
            <Col span={4}/>
            <Col span={16}>
              
              { currentUser.address !== undefined
                &&
                (currentUser.address).map((item) => {
                  if(item.area !== null){
                    return (
                      <Card 
                        bordered={true}
                        key={item.key}
                        title={item.title ? item.title : (item.name ? item.name: '')}
                        style={{marginBottom:12}}
                      >
                        <p style={{paddingLeft: 24}}>收件人: &nbsp; <b> {item.name}</b></p>
                        <p style={{paddingLeft: 24}}>所在地区: &nbsp; <b> {item.area}</b></p>
                        <p style={{paddingLeft: 24}}>地址: &nbsp; <b> {item.place}</b></p>
                        <p style={{paddingLeft: 24}}>手机: &nbsp; <b> {item.mobilephone}</b></p>
                        <p style={{paddingLeft: 24}}>固定电话: &nbsp; <b> {item.fixedphone}</b></p>
                        <p style={{paddingLeft: 24}}>邮箱: &nbsp; <b> {item.emial}</b></p>
                      
                      </Card> 
                      
                    );
                  }
                }
              )}
            </Col>
            <Col span={4}/>
          </Row>
        </Card>       
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