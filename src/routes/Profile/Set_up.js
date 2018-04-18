import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Input, Select, Button, Card, InputNumber, Icon, Row, Col, Avatar, 
  List, Divider, Steps, message, Form, Popover, Progress
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import logo from '../../../public/title.png';

import styles from './set_up.less';
const { Step }=Steps;

/** */
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
/** */


const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  pool: <div className={styles.error}>强度：太短</div>,
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  pool: 'exception',
};

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
  state = {
    condition: 0,
    current: 0,
    choice: 1,
    visible: false,
    help: '',
  };

  componentWillUnmount() {
    this.setState({
      current: 0,
      condition: 0,
      choice: 1,
    });
  }

/*  *  */
getPasswordStatus = () => {
  const { form } = this.props;
  const value = form.getFieldValue('password');
  if (value && value.length > 9) {
    return 'ok';
  }
  if (value && value.length > 5) {
    return 'pass';
  }
  return 'pool';
};

checkConfirm = (rule, value, callback) => {
  const { form } = this.props;
  if (value && value !== form.getFieldValue('password')) {
    callback('两次输入的密码不匹配!');
  } else {
    callback();
  }
};

checkPassword = (rule, value, callback) => {
  if (!value) {
    this.setState({
      help: '请输入密码！',
      visible: !!value,
    });
    callback('error');
  } else {
    this.setState({
      help: '',
    });
    if (!this.state.visible) {
      this.setState({
        visible: !!value,
      });
    }
    if (value.length < 6) {
      callback('error');
    } else {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
  }
};

renderPasswordProgress = () => {
  const { form } = this.props;
  const value = form.getFieldValue('password');
  const passwordStatus = this.getPasswordStatus();
  return value && value.length ? (
    <div className={styles[`progress-${passwordStatus}`]}>
      <Progress
        status={passwordProgressMap[passwordStatus]}
        className={styles.progress}
        strokeWidth={6}
        percent={value.length * 10 > 100 ? 100 : value.length * 10}
        showInfo={false}
      />
    </div>
  ) : null;
};

/**   */

  onChangeUserName = (e) => {
    this.setState({ data: e.target.value });
  }
  onChangeState1 = () => {
    this.setState({condition: 1});
  }
  onChangechoice = (key) => {
    this.setState({choice: key});
  }
  next() {
    const temcurrent = this.state.current + 1;
    this.setState({current: temcurrent });
  }
  pre() {
    const temcurrent=this.state.current - 1;
    this.setState({ current: temcurrent });
  }
  reset() {
    this.setState({
      current: 0,
      condition: 0,
   });
   message.success('修改成功');
  }



  
 /*{*//* renderSet_up() {
    //const { state }=this.props;
    const { condition,current }=this.state;
    switch( condition ){  //这里相当于验证界面
       case 1 : return(
                       <Card bordered={false}>
                         <Steps current={current} className={styles.steps}>
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
                          <Steps current={current} className={styles.steps}>
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
                          <Steps current={current} className={styles.steps}>
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
                        <Col span={4}/>
                        <Col span={20} >
                          <Card  >
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
 }*//*}*/
  
  render() {
    const { submitting, data, form } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { choice, } = this.state;
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
        {/*{this.renderSet_up()} */}
        <Row>
          <Col span={2}>
            <Card 
             style={{textAlign: 'center'}}
            >
              <div style={{marginBottom: 24}}>
                <Button onClick={() => this.onChangechoice(1)}>
                  <b>修改密码</b>
                </Button>
              </div>
              <div style={{marginBottom: 24}}>
                <Button onClick={() => this.onChangechoice(2)}>
                  <b>修改信息</b>
                </Button>
              </div>
              <div >
                <Button onClick={() => this.onChangechoice(3)}>
                  <b>修改地址</b>
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={20}>
            { choice ===1
              &&
              <Card 
                bordered={true}  
                style={{marginLeft: 24}}
              >
                <Form 
                  style={{ marginTop: 16 }}
                  onSubmit={this.handleSubmit}
                > 
                  <Form.Item
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>原密码:</b>}
                  >
                    {getFieldDecorator('oldpassword', {
                      //initialValue:'',
                      rules: [{ 
                        required: true,
                        message: '请填入原始密码' 
                      }],
                    })(
                      <Input />
                    )}
                  </Form.Item> 
                  <Form.Item
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>新密码:</b>}
                    help={this.state.help}
                  > 
                    <Popover
                      content={
                        <div style={{ padding: '4px 0' }}>
                          {passwordStatusMap[this.getPasswordStatus()]}
                          {this.renderPasswordProgress()}
                          <div style={{ marginTop: 10 }}>
                            请至少输入 6 个字符。请不要使用容易被猜到的密码。
                          </div>
                        </div>
                      }
                      overlayStyle={{ width: 240 }}
                      placement="right"
                      visible={this.state.visible}
                    >
                      {getFieldDecorator('password', {
                        //initialValue:'',
                        rules: [{ 
                          required: true,
                          message: '请填入新密码' 
                        },{
                          validator: this.checkPassword,
                        }],
                      })(
                        <Input type="password" placeholder="至少6位，可包含数字和字母，区分大小写"/>
                      )}
                    </Popover>
                  </Form.Item> 
                  <Form.Item
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>确认密码:</b>}
                  >
                    {getFieldDecorator('confirm', {
                      //initialValue:'',
                      rules: [{ 
                        required: true,
                        message: '请重新输入新密码' 
                      },{
                        validator: this.checkConfirm,
                      }],
                    })(
                      <Input type="password"　placeholder='请重新输入新密码'/>
                    )}
                  </Form.Item> 
                  <Form.Item
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label=' '
                  >
                    <Button type='primary' size='large' style={{marginRight: 128}}
                     htmlType="submit" loading={submitting}
                    >
                      提交
                    </Button>
                  </Form.Item> 
                </Form>
              </Card>
            }
            { choice === 2
              &&
              <Card bordered={true}  
                style={{marginLeft: 24}}
              >
                <Form style={{ marginTop: 16 }}
                  onSubmit={this.handleSubmit}
                >
                  <Form.Item
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<h3>个人信息</h3>}
                  />
                  <Form.Item
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>真实姓名:</b>}
                  >
                    {getFieldDecorator('userName', {
                        initialValue: userName ? userName : '待补充' ,
                        rules: [{ 
                          required: false, 
                        }],
                      })(
                        <Input type="userName"/>
                      )}
                  </Form.Item>
                  <Form.Item
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>身份证号:</b>}
                  >
                    {getFieldDecorator('useridNumber', {
                        initialValue: useridNumber ? useridNumber : '待补充' ,
                        rules: [{ 
                          required: false, 
                        }],
                      })(
                        <Input type="useridNumber"　/>
                      )}
                  </Form.Item>
                  <Divider/>
                  <Form.Item
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<h3>联系方式</h3>}
                  />
                  <Form.Item 
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>邮箱:</b>}
                  >
                    {getFieldDecorator('userEmail', {
                        initialValue: userEmail ? userEmail : '待补充' ,
                        rules: [{ 
                          required: true,
                          message: '请填入一个常用邮箱' 
                        }],
                      })(
                        <Input type="userEmail"　/>
                      )}
                  </Form.Item>
                  <Form.Item 
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>备注邮箱:</b>}
                  >
                    <span>
                      {getFieldDecorator('userEmail_1', {
                          initialValue: userEmail_1 ? userEmail_1 : '待补充' ,
                          rules: [{ 
                            required: false,
                          }],
                        })(
                          <Input type="userEmail_1"　/>
                        )}
                    </span>
                    <span>
                      <h4>(备注邮箱可提高账户的安全性)</h4>
                    </span>
                  </Form.Item>
                  <Form.Item 
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>手机:</b>}
                  >
                    {getFieldDecorator('userTelephone', {
                        initialValue: userTelephone ? userTelephone : '待补充' ,
                        rules: [{ 
                          required: true,
                          message: '请填入常用手机号码' 
                        }],
                      })(
                        <Input type="userTelephone"　/>
                      )}
                  </Form.Item>
                  <Form.Item 
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>备注手机:</b>}
                  >
                    <span>  
                      {getFieldDecorator('userTelephone_1', {
                          initialValue: userTelephone_1 ? userTelephone_1 : '待补充' ,
                          rules: [{ 
                            required: false,
                            //message: '请填入常用手机号码' 
                          }],
                        })(
                          <Input type="userTelephone_1"　/>
                        )}
                    </span>
                    <span> 
                      <h4>(备注手机可提高账户的安全性)</h4>
                    </span>
                  </Form.Item>
                  <Form.Item 
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>微信号:</b>}
                  >
                    {getFieldDecorator('userWeixin', {
                        initialValue: userWeixin ? userWeixin : '待补充' ,
                        rules: [{ 
                          required:false,
                          //message: '请填入常用手机号码' 
                        }],
                      })(
                        <Input type="userWeixin"　/>
                      )}
                  </Form.Item>
                  <Form.Item 
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>QQ号:</b>}
                  >
                    {getFieldDecorator('userQq', {
                        initialValue: userQq ? userQq : '待补充' ,
                        rules: [{ 
                          required:false,
                          //message: '请填入常用手机号码' 
                        }],
                      })(
                        <Input type="userQq"　/>
                      )}
                  </Form.Item>
                  <Form.Item
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label=' '
                  >
                    <Button type='primary' size='large' style={{marginRight: 128}}
                     htmlType="submit" loading={submitting}
                    >
                      提交
                    </Button>
                  </Form.Item> 
                </Form>
              </Card>
            }
          </Col>
          <Col span={2}/>
        </Row>
      </div>
    );
  }
}