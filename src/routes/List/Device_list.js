import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux,} from 'dva/router';
import { Card, Button, Icon, List, Modal, Form, Input, Avatar, Row, Col, Steps, message, Tooltip, Divider, Table, Popover } from 'antd';

import styles from './Device_list.less';

const FormItem = Form.Item;
const { Step }=Steps;
const columns = [
  { title: '设备', width: 150, dataIndex: 'defaultavatar', key: 'defaultavatar', fixed: 'left',
    render: text =>  <Avatar src={text}/>,
  },{
    title: '设备号',width:300, dataIndex: 'deviceNumber', key: 'deviceNumber', fixed: 'left',
    render: text => <h3><b>{text}</b></h3>,
  },
];

function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

@connect(state => ({
  myself_device: state.device.myself_device,
  device_will: state.device.device_will,
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
    selectedRowkeys:[],
    input_value: null,
    visible: false,
     //device_myself用来当做局部变量存储myself_device的值，从而做到可以刷新界面的能力.
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
    this.setState({condition: 1,});   //１进入到设备添加状态
  }
  onchange_remove1() {
    if(this.state.change_remove===0){ //change_remove进入到删除操作,这是最开始的代码，有点挫
    this.setState({change_remove: 1,});
    }
  }
  onchange_remove2() {
    if(this.state.change_remove===0){ //进入到转让操作当中
    this.setState({change_remove: 2,})
    }
  }
//这个是在本地进行密码验证，实际上应该在后台进行密码验证
  next(selected,inputvalue) {
    const {device_will=[]}=this.props;
    if((device_will[selected]).secret === inputvalue){
      const temcurrent = this.state.current + 1;
      this.setState({current: temcurrent, visible: false});
    }
    else{
      this.setState({visible: true})
    }

  }
  next1_2() {
    const temcurrent = this.state.current + 1;
    this.setState({current: temcurrent});
  }
  pre() {
    const temcurrent=this.state.current - 1;
    this.setState({ current: temcurrent, visible: false });
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'device/clear',
    })
    this.setState({
       current: 0,
       condition: 0,
       change_remove: 0,
       modalVisible: false,
       selectedRowkeys:[],
       input_value: null,
       visible: false,
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
      selectedRowkeys:[],
      input_value: null,
      visible: false,
   });
   //message.success('修改成功');
  }

  extracontent(tempor) {
    if (tempor !==undefined) {
      if(tempor===0){
        return(
        <div className={styles.extraContent}>
          <div className={styles.statItem}> 
            <a onClick={()=>this.onchangeCondition()}>
              <Tooltip placement='topLeft' title='添加设备'> 
                <Icon type='plus' style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} />
              </Tooltip>
            </a>
          </div>
          <div className={styles.statItem} >
            <a onClick={()=>this.onchange_remove1()}>
              <Tooltip placement='top' title='删除设备'>
                <Icon type="minus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/>
              </Tooltip>
            </a>
          </div>
          <div className={styles.statItem} >
            <a onClick={() =>this.onchange_remove2()}>
              <Tooltip placement='topRight' title='转让设备'>
                <Icon type="retweet" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/>
              </Tooltip>
            </a>
          </div>
        </div>
      )}
      else {
        return(
            <Button type='primary' size='large' onClick={()=> this.resetchange_remove()}>
              <Icon type="rollback" />
            </Button>
        )
      }
    }
  };
/******* */
onSelectedChange = (selectedRowkeys) => {
  this.setState({selectedRowkeys: selectedRowkeys});
}

changevalue = (e) =>{
  this.setState({input_value:e.target.value});
}

condition_step = (condition,current,length) =>{
  const {device_will} = this.props;
  const {selectedRowkeys,input_value} = this.state;
  if((condition===1)&&(current==1)){
    if(length===1){
    return(
      <div>
        <Card style={{marginBottom: 12}} >
          <div style={{marginBottom:24}}>
            <span style={{width:150}}>&nbsp;&nbsp;&nbsp;设备号：</span>
            <span style={{maginLeft: 200, width:300, fontSize: 18}}><b>{device_will[selectedRowkeys[0]].deviceNumber}</b></span>
          </div>
          <Popover content={<div style={{ marginTop: 10, color:'#FF0000' }}>  请输入正确的密码 !!!</div>}
            placement="right"
            visible={this.state.visible}
          >
            <span style={{width:150}}>密码验证：</span>
            <span ><Input value={input_value} onChange={this.changevalue} style={{width:200}} type='password'/></span>
          </Popover>
        </Card>
        <span>
          <Button type='primary' onClick={() =>this.next(selectedRowkeys[0],input_value)}>下一步</Button>
          <Divider type='vertical'/>
          <Button type='primary' style={{marginLeft: 8}} onClick={()=>this.pre()}>上一步</Button>
        </span>  
      </div>
    );}
    else 
     return(
      <div>
      <Card style={{marginBottom: 12}}>
        <div style={{textAlign:'center'}}>
          <span style={{color:'#FFFF00',fontSize: 24}}>&nbsp;&nbsp;!&nbsp;&nbsp;!&nbsp;&nbsp;!&nbsp;&nbsp;&nbsp;</span>
          <span style={{fontSize:20}}>未选择任何设备</span>
        </div> 
      </Card>
      <Button type='primary' style={{marginLeft: 8}} onClick={()=>this.pre()}>上一步</Button>
      </div>
      );
  }
}
  renderDevice(){
    const {  myself_device = [], device_will= [],loading  } = this.props;
    const {condition, current, change_remove, modalVisible, selectedRowkeys,}=this.state;
    const rowSelection = {
      selectedRowkeys,
      onChange: this.onSelectedChange,
      hideDefaultSelections: true,
      type: 'radio',
    }
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
                      extra={this.extracontent(change_remove)}
                      style={{ marginBottom: 24 }} 
                    >
                      <List 
                        rowkey="id"
                        loading={loading}
                        dataSource={[...myself_device]}
                          renderItem={item =>(
                            <List.Item key={item.key} >
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
                      extra={this.extracontent(change_remove)}
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
                        extra={this.extracontent(change_remove)}
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
                <Card style={{marginBottom: 12}} bordered={false}> 
                  <div style={{width: 520}}>
                    <Table columns={columns} dataSource={device_will} scroll={{  y:500}} pagination={false} rowSelection={rowSelection}/>
                  </div>
                </Card>
                <span>
                  <Button type='primary' onClick={() =>this.next1_2()}>下一步</Button>
                  <Divider type='vertical'/>
                  <Button type='primary' onClick={() => this.reset()}>返回</Button>
                </span>
              </div>
            }
            { current===1
              &&
              this.condition_step(condition,current,selectedRowkeys.length)
            }
            { current===2
              &&
              <div>
                <Card style={{marginBottom: 12, textAlign:'center'}}>
                  <span>
                  <Icon type="check-square" style={{fontSize: 48, color:'#7CFC00'}}/>
                  <span style={{fontSize:32, marginLeft: 40}}>添加成功</span>
                  </span>
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