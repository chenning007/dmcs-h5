import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux,} from 'dva/router';

import { Card, Button, Icon, List, Modal, Form, Input, Avatar, Row, Col, Steps, message } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from './Device_list.less';

import { Link } from 'dva/router';

const FormItem = Form.Item;
const { Step }=Steps;


@connect(state => ({
  myself_device: state.device.myself_device,
  loading: state.device.loading,
  currentUser: state.user.currentUser,
}))
export default class Device_list extends PureComponent {
/***** */
  state = {
    condition: 0,
    current: 0,
    change_remove: 0,
    modalVisible: false,
  };
/******** */

  componentDidMount() {
    const { currentUser } = this.props;
    if((currentUser!==undefined)&&(currentUser!=={})){
      this.props.dispatch ({
        type: 'device/fetch',
        payload: {
          count: currentUser.userNumber,
        },
        }
      ); 
    }
  }

  onLinktodevice = (avatar_src,deviceNumber_src,title_src) => {
    const {dispatch}=this.props;
    dispatch(routerRedux.push({
      pathname: '/list/device_friend',
      state: { avatar: avatar_src,
               deviceNumber: deviceNumber_src,
               title: title_src,
             },
    }));
  }

  setModalvisible (setvisible) { 
    this.setState({modalVisible: setvisible,});
  };
  onchangeCondition() {
    this.setState({condition: 1,}); //１进入到设备添加状态
  }
  onchange_remove1() {
    if(this.state.change_remove===0){ //change_remove进入到删除操作
    this.setState({change_remove: 1,});
    }
  }
  onchange_remove2() {
    if(this.state.change_remove===0){ //进入到转让操作当中
    this.setState({change_remove: 2,})
    }
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
    this.setState({
       current: 0,
       condition: 0,
       change_remove: 0,
       modalVisible: false,
    });
  }
  resetchange_remove(){
    this.setState({change_remove: 0,})
  }
  reset() {
    this.setState({
      current: 0,
      condition: 0,
      change_remove: 0,
      modalVisible: false,
   });
   message.success('修改成功');
  }

  extracontent() {
    if(this.state.change_remove===0){
      return(
      <div className={styles.extraContent}>
        <div className={styles.statItem}> 
          <a onClick={()=>this.onchangeCondition()}> <Icon type="plus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} /> </a>
        </div>
        <div className={styles.statItem} >
          <a onClick={()=>this.onchange_remove1()}><Icon type="minus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/></a>
        </div>
        <div className={styles.statItem} >
          <a onClick={() =>this.onchange_remove2()}><Icon type="retweet" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/></a>
        </div>
      </div>
    )}
    if(this.state.change_remove!==0){
      return(
          <Button type='primary' size='large' onClick={()=> this.resetchange_remove()}>
            <Icon type="rollback" />
          </Button>
      )
    }
  };
/******* */

/******* */
  renderDevice(){
    const {  myself_device, loading  } = this.props;
    const {condition, current, change_remove, modalVisible}=this.state;
    if(condition===0){
      return (
            <Row gutter={24}>  
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                { change_remove===0
                  &&
                    <Card
                      bordered={false}
                      title="我的设备"
                      loading={loading}
                      extra={this.extracontent()}
                      style={{ marginBottom: 24 }} 
                    >
                      <List 
                        rowkey="id"
                        loading={loading}
                        dataSource={myself_device ===undefined?[]:[...myself_device]}
                          renderItem={item =>(
                            <List.Item key={item.id} >
                              <span onClick={() =>this.onLinktodevice(item.avatar,item.deviceNumber,item.title)}  
                                style={{width:200}}
                              >
                                  <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} size='large'/>}
                                    title={item.title}
                                    description={<b>{item.deviceNumber}</b>}
                                  />
                              </span>
                              <span style={{marginLeft:200, width:300}} ><h3>{item.description}</h3></span> 
                              <span style={{marginLeft:200}}><h3>{item.time}</h3></span>
                              
                            </List.Item> 
                          )}
                        />  
                    </Card>
                  }
                  { change_remove===1
                    &&
                      <Card 
                      bordered={false}
                      title="我的设备"
                      loading={loading}
                      extra={this.extracontent()}
                      style={{ marginBottom: 24 }} 
                      >
                        <List 
                          rowkey="id"
                          loading={loading}
                          dataSource={myself_device ===undefined?[]:[...myself_device]}
                            renderItem={item =>(
                              <List.Item key={item.id} 
                                actions={[<Button type='danger' 
                                    onClick={() =>this.setModalvisible(true)}>
                                    删除</Button>]}>
                                  <List.Item.Meta
                                    avatar={<a onClick={() =>this.onLinktodevice(item.avatar,item.deviceNumber,item.title)}>{<Avatar size="large" src={item.avatar}/>}</a>}
                                    title={item.title}
                                    description={item.subDescription}
                                  />
                                </List.Item>
                            )}
                          />
                      </Card>
                  }
                  { change_remove===2
                    &&
                      <Card
                        bordered={false}
                        title="我的设备"
                        loading={loading}
                        extra={this.extracontent()}
                        style={{ marginBottom: 24 }}
                      >
                        <List 
                          rowkey="id"
                          loading={loading}
                          dataSource={myself_device ===undefined?[]:[...myself_device]}
                            renderItem={item =>(
                              <List.Item key={item.id} 
                                actions={[
                                    <Button 
                                      type='primary'
                                      onClick={() =>this.setModalvisible(true)}>
                                      转让
                                    </Button>
                                  ]}>
                                  <List.Item.Meta
                                    avatar={<a onClick={() =>this.onLinktodevice(item.avatar,item.deviceNumber,item.title)}>{<Avatar size="large" src={item.avatar}/>}</a>}
                                    title={item.title}
                                    description={item.subDescription}
                                  />
                                </List.Item>
                            )}
                        />
                    </Card>
                  }
                { change_remove===1
                  &&
                  <Modal
                  title='删除设备'
                  visible={modalVisible}
                  onOk={()=>this.setModalvisible(false)}
                  onCancel={()=>this.setModalvisible(false)}
                  okText='确认'
                  cancelText='取消'
                  >
                    <FormItem
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 15 }}
                      label="登录密码"
                    >
                      <Input placeholder="请输入登录密码" /*onChange={this.handleAddInput} value={addInputValue}*/ />
                    </FormItem> 
                  </Modal>
                }
                { change_remove===2
                  &&
                  <Modal
                  title='转让设备'
                  visible={modalVisible}
                  onOk={()=>this.setModalvisible(false)}
                  onCancel={()=>this.setModalvisible(false)}
                  okText='确认'
                  cancelText='取消'
                  >
                    <FormItem
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 15 }}
                      label=""
                    >
                      <Input placeholder="请输入登录密码" /*onChange={this.handleAddInput} value={addInputValue}*/ />
                    </FormItem>  
                  </Modal>
                }
                <Card
                  bordered={false}
                  title="历史记录"
                  loading={loading}
                  //bodyStyle={{ padding: 0 }}
                >
                  <h3>这里记录报废或删除或转让的设备的信息</h3>
                </Card>
              </Col>  
            </Row>
      );
    }
    if(condition===1){
      return(
        <Card bordered={false}>
          <Steps current={current} /*className={styles.steps}*/>
            <Step title="选择设备" />
            <Step title="设备验证" />
            <Step title="完成" />
          </Steps>
          <div style={{ marginTop:20}}>
            { current===0
              &&
              <div>
                <Card> 

                </Card>
                <Button type='primary' onClick={() =>this.next()}>下一步</Button>
              </div>
            }
            { current===1
              &&
              <div>
                <Card>
                   
                </Card>
                <span>
                  <Button type='primary' onClick={() =>this.next()}>下一步</Button>
                  <Button type='primary' style={{marginLeft: 8}} onClick={()=>this.pre()}>上一步</Button>
                </span>  
              </div>
            }
            { current===2
              &&
              <div>
                <Card>
                </Card>
                <span> 
                    <Button type='primary' onClick={()=>this.reset()}>完成</Button>
                </span>
              </div>
            }   
          </div>
        </Card>
      );
    }
  }

  render() {
    return ( 
      <div>  
        {this.renderDevice()}
      </div>
    );
  }
}