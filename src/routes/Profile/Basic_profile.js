import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
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
const userTitle = '侠士';
const email = 'caizj@123.com';
const telephone = null;


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
    const { changename }=this.state;
    if( !changename ){
      return(
        <Form
          hideRequiredMark
          style={{ marginTop: 8 }}
        >
          <FormItem
            colon={false}
            labelCol={{span: 8, }}
            wrapperCol={{span: 8, offset: 2}}
           //{...formItemLayout}
            label={<b>用户号:</b>}
          >
            <h3>{userNumber}</h3>           
          </FormItem> 
          <FormItem
            colon={false}
            labelCol={{span: 8, offset: 0}}
            wrapperCol={{span: 8, offset: 2}}
            label={<b>用户名:</b>}
          > 
            <h3>{userName? userName:'未命名'}</h3>
          </FormItem>
          <FormItem
             colon={false}
             labelCol={{span: 8, offset: 0}}
             wrapperCol={{span: 8, offset: 2}}
             label={<b>头衔:</b>}
          >
            <h3>{userTitle}</h3>
          </FormItem>
        </Form>
      );
    }
    if(changename){
      return(
        <Form>
          <FormItem
            colon={false}
            labelCol={{span: 8, offset: 0}}
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
              initialValue: [],
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
        </Form>
      );
    }
  }
  
  render() {
    const { submitting, form, data } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <div>
        <Card   
          title='基本信息'
          bordered={true}
          style={{ marginBottom: 24 }}
        >
          <Row> 
            <Col span={4} >
              <Card
                bordered={false}
                style={{ marginTop: -10, textAlign: 'center' }}
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
          title={<div><b>地址信息</b></div>}
          bordered={true}
          style={{marginBottom: 24}}
        >   
          
        </Card>
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
        </Card>
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
        </FooterToolbar>
      </div>
    );
  }
}