import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
  Row, Col, Avatar, Upload,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import logo from '../../../public/title.png';

const FormItem = Form.Item;
const { Option } = Select;
//const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  data: state.form.data,
  submitting: state.form.regularFormSubmitting,
}))
@Form.create()
export default class Basic_form extends PureComponent {
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
  
  render() {
    const { submitting, form, data } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7  }, 
      },
      wrapperCol: {
        xs: { span: 24, offset: 2},
        sm: { span: 12 },
        md: { span: 10 },
      },
     // marginBottom: 48,
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 9 },
      },
    };

    return (
      <Card bordered={true}>
        <Row>
          <Col span={12}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
          {/*  <FormItem
              {...formItemLayout}
              label="头像"
            >
              {getFieldDecorator('image', {
                initialValue: [],
                rules: [{
                  required: false, 
                }],
              })(
                <Input  size="large" placeholder="例如:你最帅的一张图片" 
                />
              )}
            </FormItem>
            */} 
            <FormItem/> 
            <div style={{marginLeft: 120}}>
              <h3>修改密码</h3>
            </div>
            <FormItem
              {...formItemLayout}
              label="新密码"
            >
              {getFieldDecorator('new_secret', {
                initialValue: '',
                rules: [{
                  required: false, 
                }],
              })(
                <Input  size="large" placeholder='' 
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认密码"
            >
              {getFieldDecorator('new_secret_s', {
                initialValue: '',
                rules: [{
                  required: false, 
                }],
              })(
                <Input  size="large" placeholder='' 
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="原密码"
            >
              {getFieldDecorator('old_secret', {
                initialValue: '',
                rules: [{
                  required: false, 
                }],
              })(
                <Input  size="large" placeholder='' 
                />
              )}
            </FormItem>
            <div style={{marginLeft: 120}}>
              <h3>详细住址</h3>
            </div>
            <FormItem
              {...formItemLayout}
              label="地址"
            >
              {getFieldDecorator('address', {
                initialValue: "123456789",
                rules: [{
                  required: false, 
                }],
              })(
                <Input  size="large" placeholder="" 
                />
              )}
            </FormItem>
            <div style={{marginLeft: 120}}>
              <h3>身份认证</h3>
            </div>
            <FormItem
              {...formItemLayout}
              label="身份证号"
            >
              {getFieldDecorator('id_number', {
                initialValue: "",
                rules: [{
                  required: false, 
                }],
              })(
                <Input  size="large" placeholder=""
                />
              )}
            </FormItem>
            {/*
            <FormItem
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
            </FormItem>           
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
            </FormItem>   */}         
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
              {/*<Button style={{ marginLeft: 8 }}>保存</Button>*/}
            </FormItem>
          </Form>
          </Col>
        </Row>
      </Card>
    );
  }
}