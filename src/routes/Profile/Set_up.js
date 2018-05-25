import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Input, Select, Button, Card, InputNumber, Icon, Row, Col, Avatar, 
  List, Divider, Steps, message, Form, Popover, Progress
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import Address from './Address';
import styles from './set_up.less';
const { Step }=Steps;

/** */

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
  currentUser: state.user.currentUser,
  submitting: state.user.regularFormSubmitting,
}))
@Form.create()
export default class Basic_form extends PureComponent {
  handleSubmit = (e) => {
    const { currentUser } = this.props;
    //e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/submitRegularForm',
          payload: {
            values,
            currentUser,
          }   
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
      visible: false,
      help: '',
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
  } 
  else {
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
    } 
    else {
      const { form } = this.props;
      if(value && value === form.getFieldValue('oldpassword')){
        this.setState({
          help: '与原密码相同',
        });
        callback('error');
      }
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
  
  render() {
    const { submitting, form, currentUser={} } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { choice, } = this.state;

    return (
      <div>
        <Row>
          <Col xl={2} lg={24} md={24} sm={24} xs={24}>
            <Card  style={{textAlign: 'center'}}>
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
          <Col xl={20} lg={24} md={24} sm={24} xs={24}>
  {/*修改密码*/}
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
                      rules: [{ 
                        required: true,
                        message: '请填入原始密码' 
                      }],
                    })(
                      <Input type='password'/>
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
              /*修改个人信息 */
              &&
              <Card bordered={true}  
                style={{marginLeft: 24}}
              >
                <Form style={{ marginTop: 16 }}
                  onSubmit={this.handleSubmit}
                >
                  <div>
                    <h3>个人信息</h3>
                  </div>
                  <Form.Item
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>真实姓名:</b>}
                  >
                    {getFieldDecorator('userName', {
                        initialValue: currentUser.realname ? currentUser.realname : '待补充' ,
                        rules: [{ 
                          required: false, 
                        }],
                      })(
                        <Input />
                      )}
                  </Form.Item>
                  <Form.Item
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>身份证号:</b>}
                  >
                    {getFieldDecorator('useridNumber', {
                        initialValue: currentUser.useridNumber ? currentUser.useridNumber : '待补充' ,
                        rules: [{ 
                          required: false, 
                        }],
                      })(
                        <Input />
                      )}
                  </Form.Item>
                  <Divider/>
                  <div>
                    <h3>联系方式</h3>
                  </div>
                  <Form.Item 
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>邮箱:</b>}
                  >
                    {getFieldDecorator('userEmail', {
                        initialValue: currentUser.userEmail ? currentUser.userEmail : '待补充' ,
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
                          initialValue: currentUser.userEmail_1 ? currentUser.userEmail_1 : '待补充' ,
                          rules: [{ 
                            required: false,
                          }],
                        })(
                          <Input />
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
                        initialValue: currentUser.userTelephone ? currentUser.userTelephone : '待补充' ,
                        rules: [{ 
                          required: true,
                          message: '请填入常用手机号码' 
                        }],
                      })(
                        <Input />
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
                          initialValue: currentUser.userTelephone_1 ? currentUser.userTelephone_1 : '待补充' ,
                          rules: [{ 
                            required: false,
                            //message: '请填入常用手机号码' 
                          }],
                        })(
                          <Input />
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
                        initialValue: currentUser.userWeixin ? currentUser.userWeixin : '待补充' ,
                        rules: [{ 
                          required:false,
                          //message: '请填入常用手机号码' 
                        }],
                      })(
                        <Input />
                      )}
                  </Form.Item>
                  <Form.Item 
                    colon={false}
                    labelCol={{span: 4, offset: 0}}
                    wrapperCol={{span: 8, offset: 2}}
                    label={<b>QQ号:</b>}
                  >
                    {getFieldDecorator('userQq', {
                        initialValue: currentUser.userQq ? currentUser.userQq : '待补充' ,
                        rules: [{ 
                          required:false,
                        }],
                      })(
                        <Input />
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
            { choice === 3
              /*修改地址*/
              /**直接通过三个地址循环进行遍历即可 */
              /*** */
              &&
              <Card
                style={{marginLeft: 24}}
                bordered={true}
              >
                <Row >
                  <Col span={4}/>
                    <Col span={16}>  
                      { getFieldDecorator('address', {
                          initialValue: currentUser.address ,
                        })(<Address />)}
                      < Button type='primary' size='large' style={{marginRight: 128}}
                        htmlType="submit" loading={submitting} onClick={() => this.handleSubmit()}>
                        提交
                      </Button>
                    </Col>
                  <Col span={4}/>
                </Row>
              </Card> 
            }
          </Col>
        </Row>
      </div>
    );
  }
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