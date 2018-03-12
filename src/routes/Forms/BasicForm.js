import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
//const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  submitting: state.form.regularFormSubmitting,
}))
@Form.create()
export default class BasicForms extends PureComponent {
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
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="创建设备" content="请您填写如下信息，完成设备的创建">
        <Card bordered={true}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
          <FormItem
              {...formItemLayout}
              label="设备图片"
             >
              {getFieldDecorator('devimage', {
                rules: [{
                  required: true, message: '请输入设备图片',
                }],
              })(
                <Input size="large" placeholder="选择一张图片" />
              )}
            </FormItem>  
            <FormItem
              {...formItemLayout}
              label="设备编号"
            >
              {getFieldDecorator('devid', {
                rules: [{
                  required: true, message: '请输入设备编号',
                }],
              })(
                <Input  size="large" placeholder="输入设备编号" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="设备名称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入设备名称',
                }],
              })(
                <Input  size="large" placeholder="输入设备名称" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="设备类型"
            >
              {getFieldDecorator('type', {
                rules: [{
                  required: true, message: '请输入设备类型',
                }],
              })(
                <Input  size="large" placeholder="输入设备类型" />
              )}
             </FormItem> 
              <FormItem
              {...formItemLayout}
              label="主要参数"
            >
              {getFieldDecorator('parameters', {
                rules: [{
                  required: true, message: '请输入设备主要参数',
                }],
              })(
                <Input  size="large" placeholder="输入设备主要参数" />
              )}
              </FormItem>
              <FormItem
              {...formItemLayout}
              label="设备厂商"
            >
              {getFieldDecorator('vendor', {
                rules: [{
                  required: true, message: '请输入设备厂商',
                }],
              })(
                <Input  size="large" placeholder="输入厂商" />
              )}
            </FormItem>
            
            <FormItem
              {...formItemLayout}
              label="保修起始日期"
            >
              {getFieldDecorator('guranteeFrom', {
                rules: [{
                  required: true, message: '请选择起始日期',
                }],
              })(
                <DatePicker style={{ width: '100%' }} placeholder="日期" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="拥有者"
             >
             {getFieldDecorator('owner',{
               rules:[{
                 required:true, message: '请输入拥有者',
               }],
               })(
                 <Input size="large" placeholder="输入拥有者"/>
               )}
            </FormItem>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
