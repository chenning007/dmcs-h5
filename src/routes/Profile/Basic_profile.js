import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
  Row, Col, Avatar, Upload,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from '../../components/FooterToolbar';

import logo from '../../../public/title.png';

const FormItem = Form.Item;
const { Option } = Select;
//const { RangePicker } = DatePicker;
const { TextArea } = Input;

const email = 'caizj@123.com';
const telephone = null;

@connect(state => ({
  data: state.form.data,
  submitting: state.form.regularFormSubmitting,
}))
@Form.create()
export default class Basic_profiles extends PureComponent {
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

  renderInput(text)  {
    return text? <a>修改</a> : <a>绑定</a> ;
 }
  
  render() {
    const { submitting, form, data } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24, offset: -10 },
        sm: { span: 7 , offset: -10 }, 
      },
      wrapperCol: {
        xs: { span: 24, offset: 3},
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
    return (
      <div>
        <Card   
          title='基础信息'
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
                <Form
                  onSubmit={this.handleSubmit}
                  hideRequiredMark
                  style={{ marginTop: 8 }}
                > 
                  <FormItem
                    {...formItemLayout}
                    label="用户名"
                  >
                    {getFieldDecorator('name', {
                      initialValue: data,
                      rules: [{
                        required: false, 
                      }],
                    })(
                      <h3>蔡志军</h3>

                            //  {/*<Input  size="large" placeholder="例如: 2015000000" disabled
                          // />*/}
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="用户ID"
                  >
                    {getFieldDecorator('id', {
                      initialValue: "123456789",
                      rules: [{
                        required: false, 
                      }],
                    })(
                      <h3>123456789</h3>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="头衔"
                  >
                    {getFieldDecorator('title', {
                      initialValue: "侠士",
                      rules: [{
                        required: false, 
                      }],
                    })(
                      <Input size="large"/>  
                    )}
                  </FormItem>
                  {/*<FormItem
                    {...formItemLayout}
                    label="邮箱"
                  >
                    {getFieldDecorator('idcard', {
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
                    {...formItemLayout}
                    label="手机"
                  >
                    {getFieldDecorator('mobile', {
                      initialValue: [],
                      rules: [{
                        required: false, 
                      }],
                    })(
                      <Input  size="large" placeholder="例如: 1570575354" 
                      />
                    )}
                  </FormItem> */} 
                          {/*        
                          <FormItem
                            {...formItemLayout}
                            label="生日"
                          >
                            {getFieldDecorator('birthday', {
                              rules: [{
                                required: false, message: '请选择起始日期',
                              }],
                            })(
                              <DatePicker style={{ width: '100%' }} placeholder="日期" />
                            )}
                          </FormItem> 
                          */}
                          {/*
                          <FormItem
                            {...formItemLayout}
                            label="个性签名"
                          >
                            {getFieldDecorator('selfsign', {
                              rules: [{
                                required: false, 
                              }],
                            })(
                              <TextArea style={{ minHeight: 32 }} placeholder="输入你的个性签名吧！" rows={4} />
                            )}
                          </FormItem> 
                          */}                       
                          {/*<FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                              保存
                            </Button>
                            {/*<Button style={{ marginLeft: 8 }}>保存</Button>*/}
                          {/*</FormItem>*/}
                </Form>
              </Card>
            </Col>
          </Row>
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
        <Card 
          title='地址信息'
          bordered={true}
        >
          
        </Card>
        <FooterToolbar>
          <Button type="primary" htmlType="submit" loading={submitting}>
            保存
          </Button>
        </FooterToolbar>
      </div>
    );
  }
}