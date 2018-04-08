import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Input, Select, Button, Card, InputNumber, Icon, Row, Col, Avatar,  List, Divider, Steps, message } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import logo from '../../../public/title.png';


const { Step }=Steps;

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
  state = {
    condition: 0,
    current: 0,
  };

  onChangeUserName = (e) => {
    this.setState({ data: e.target.value });
  }
  onChangeState1 = () => {
    this.setState({condition: 1});
  }
  onChangeState2 = () => {
    this.setState({condition: 2});
  }
  onChangeState3 = () => {
    this.setState({condition: 3});
  }
  onChangeState4 = () => {
    this.setState({condition: 4});
  }
  next() {
    const temcurrent = this.state.current + 1;
    this.setState({current: temcurrent });
  }
  pre() {
    const temcurrent=this.state.current - 1;
    this.setState({ current: temcurrent });
  }
  componentWillUnmount() {
    this.setState({current: 0,
       condition: 0,
    });
  }
  reset() {
    this.setState({current: 0,
      condition: 0,
   });
   message.success('修改成功');
  }
  
  renderSet_up() {
    //const { state }=this.props;
    const { condition,current }=this.state;
    switch( condition ){
       case 1 : return(
                       <Card bordered={false}>
                         <Steps current={current} /*className={styles.steps}*/>
                            <Step title="验证身份" />
                            <Step title="修改登录密码" />
                            <Step title="完成" />
                         </Steps>
                         <div style={{ marginTop:20}}>
                           { current<2
                             &&
                             <Button type='primary' onClick={() =>this.next()}>下一步</Button>
                           }
                           { current===2
                             &&
                             <Button type='primary' onClick={()=>this.reset()}>完成</Button>
                           }
                           { current>0
                             &&
                             <Button type='primary' style={{marginLeft: 8}} onClick={()=>this.pre()}>上一步</Button>
                            }   
                         </div>
                       </Card>
                      ) ;
       case 2 : return(
                        <Card bordered={false}>
                          <Steps current={current} /*className={styles.steps}*/>
                            <Step title="验证身份" />
                            <Step title="修改已验证手机" />
                            <Step title="完成" />
                          </Steps>
                          <div style={{ marginTop:20}}>
                            { current<2
                              &&
                              <Button type='primary' onClick={() =>this.next()}>下一步</Button>
                            }
                            { current==2
                              &&
                              <Button type='primary' onClick={()=>this.reset()}>完成</Button>
                            }
                            { current>0
                              &&
                              <Button type='primary' style={{marginLeft: 8}} onClick={()=>this.pre()}>上一步</Button>
                            }   
                          </div>
                        </Card>
                      )  ;
       case 3 : return (
                        <Card bordered={false}>
                          <Steps current={current} /*className={styles.steps}*/>
                            <Step title="验证身份" />
                            <Step title="验证邮箱" />
                            <Step title="完成" />
                          </Steps>
                          <div className='step-aciton'>
                            { current<2
                              &&
                              <Button type='primary' onClick={() =>this.next()}>下一步</Button>
                            }
                            { current==2
                              &&
                              <Button type='primary' onClick={()=>this.reset()}>完成</Button>
                            }
                            { current>0
                              &&
                              <Button type='primary' style={{marginLeft: 8}} onClick={()=>this.pre()}>上一步</Button>
                            }   
                          </div>
                        </Card>
                        );
       case 4 : return (this.reset());

       default : return (
                      <Row>
                        <Col span={2}/>
                        <Col span={20} >
                          <Card  /*loading={loading}*/>
                            <List bordered={false}>
                              <List.Item actions={[<Button type='dashed' size='large' onClick={this.onChangeState1}>修改</Button>]} >
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
                              <List.Item actions={[<Button type='dashed' size='large' onClick={this.onChangeState2}>修改</Button>]} >
                                <Icon type="check-square" style={{fontSize: 48, color:'#7CFC00'}}/>
                                <span style={{fontSize: 32, paddingLeft: 32}}>手机验证</span>  
                                <span style={{fontSize: 32}}><Divider type='vertical'/></span>
                                <span style={{paddingTop: 16}}>
                                      你验证的手机:15701585453,若已丢失或停用，<span style={{color:'#FF0000'}}>请立即更换</span>
                                </span> 
                              </List.Item>
                            </List>
                            <Divider type='horizontal'/>
                            <List bordered={false}>
                              <List.Item actions={[<Button type='primary' size='large' onClick={this.onChangeState3}>立即绑定</Button>]} >
                              <Icon type="exclamation-circle-o"  style={{fontSize: 48, color:'#FFFF00'}}/>
                                <span style={{fontSize: 32, paddingLeft: 32}}>邮箱验证</span>  
                                <span style={{fontSize: 32}}><Divider type='vertical'/></span>
                                <span style={{paddingTop: 16}}>
                                      验证后，可用于快速找回登录密码,提高账号的稳定性
                                </span> 
                              </List.Item>
                            </List> 
                            <Divider type='horizontal'/>
                            <List bordered={false}>
                              <List.Item actions={[<Button type='primary' size='large' onClick={this.onChangeState4}>立即认证</Button>]} >
                              <Icon type="exclamation-circle-o"  style={{fontSize: 48, color:'#FFFF00'}}/>
                                <span style={{fontSize: 32, paddingLeft: 32}}>实名认证</span>  
                                <span style={{fontSize: 32}}><Divider type='vertical'/></span>
                                <span style={{paddingTop: 16}}>
                                      实名认证后，可通过实名信息修改手机号等，提高账户安全性
                                </span> 
                              </List.Item>
                            </List> 
                          </Card>
                        </Col>
                        <Col span={2}/>
                      </Row>
                      ) ;
    }
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
      <div className='render'>
      {this.renderSet_up()} 
      </div>
    );
  }
}