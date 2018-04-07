import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Input, Select, Button, Card, InputNumber, Icon, Row, Col, Avatar,  List, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import logo from '../../../public/title.png';

//const FormItem = Form.Item;
//const { Option } = Select;
//const { RangePicker } = DatePicker;
//const { TextArea } = Input;


@connect(state => ({
  //data: state.form.data,
  //submitting: state.form.regularFormSubmitting,
}))
//@Form.create()
export default class Basic_form extends PureComponent {
/*  handleSubmit = (e) => {
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

  onChangeUserName = (e) => {
    this.setState({ data: e.target.value });
  }
  
  render() {
   // const { submitting, form, data } = this.props;
   // const { getFieldDecorator, getFieldValue } = this.props.form;

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
      <Row>
        <Col span={2}/>
        <Col span={20} >
          <Card  /*loading={loading}*/>
            <List bordered={false}>
              <List.Item actions={[<Button type='primary' size='large'>修改</Button>]} >
                <Icon type="check-square" style={{fontSize: 48, color:'#7CFC00'}}/>
                <span style={{fontSize: 32, paddingLeft: 32}}>登录密码</span>  
                <span style={{fontSize: 32}}><Divider type='vertical'/></span>
                <span style={{paddingTop: 16, color:'#FF0000'}}>
                      互联网账号存在被盗风险，建议您定期更改密码以保护账户安全
                </span> 
              </List.Item>
            </List>
            <Divider type='horizontal'/>
            <List bordered={false}>
              <List.Item actions={[<Button type='primary' size='large'>修改</Button>]} >
                <Icon type="check-square" style={{fontSize: 48, color:'#7CFC00'}}/>
                <span style={{fontSize: 32, paddingLeft: 32}}>手机验证</span>  
                <span style={{fontSize: 32}}><Divider type='vertical'/></span>
                <span style={{paddingTop: 16}}>
                      你验证的手机:15701585453,若已丢失或停用，<span style={{color:'#FF0000'}}>请立即更换</span>
                </span> 
              </List.Item>
            </List>
            
          </Card>
        </Col>
        <Col span={2}/>
      </Row>
    );
  }
}