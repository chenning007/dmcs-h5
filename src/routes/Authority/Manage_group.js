import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {routerRedux } from 'dva/router'
import { Row, Col, Card, Avatar, Button, Icon, Modal, Form,  Tooltip, Table, Divider, message } from 'antd';
import styles from './Manage_group.less';
import Table_friend from './Table_group';
import { getAuthority } from '../../utils/authority';

const columns =  [{
  title: '管理员',
  dataIndex: 'avatar',
  key: 'avatar',
  width: '10%',
  render: text => <Avatar src={text}/>,
},{
  title: '姓名',
  dataIndex: 'username',
  key: 'username',
  width:'20%'
}, {
  title: '用户号',
  dataIndex: 'userid',
  key: 'userid',
  width: '20',
}, {
  title: '联系方式',
  dataIndex: 'userTelephone',
  key: 'userTelephone',
  width: '20',
},
{
  title: '单位',
  key: 'userworkPlace',
  width: '30%',
  dataIndex: 'userworkPlace',
}];

const columns1 =  [{
  title: '朋友',
  dataIndex: 'avatar',
  key: 'avatar',
  width: '4%',
  render: text => <Avatar src={text}/>,
},{
  title: '',
  dataIndex: 'username',
  key: 'userName',
  width:'6%'
}, {
  title: '用户号',
  dataIndex: 'useridNumber',
  key: 'useridNumber',
  width: '20',
}, {
  title: '姓名',
  key: 'userTitle',
  width: '20%',
  dataIndex: 'userTitle',
}, {
  title: '联系方式',
  dataIndex: 'userTelephone',
  key: 'userTelephone',
  width: '20',
},
{
  title: '单位',
  key: 'userworkPlace',
  width: '30%',
  dataIndex: 'userworkPlace',
}];

@connect(state => ({
  list_device_friend: state.friend.list_device_friend,
  list_friend: state.friend.list_friend,
  adminusers: state.manage_group.adminusers,
  currentUser: state.login.currentUser,
}))

@Form.create()
export default class Manage_group extends PureComponent {
  state={ /********* ***********/
    content_condition: 0,  //用于设置content部分的内容,其中1时权限管理，2时添加人员,0为正常状态/******************* *********/
    selectedRowkeys: [],   //用于列表的选择，可以通过该部分信息得到权限情况
    modalVisible1: false,  //用于显示删除的信息
    modalVisible2: false,  //用于显示提示的信息
    edit_condition: false,
    resetrender: false,
  }
  onSelectedChange = (selectedRowkeys) => {
    this.setState({selectedRowkeys: selectedRowkeys});
  }
  //对权限进行判断
  componentWillMount() {
    const { dispatch,} = this.props;
    let authority =getAuthority();
    if(authority!='admin'){
      dispatch(routerRedux.push('/exception/403'));
    }
  }//对于这些情况，还是需要进行处理

  componentDidMount() {
    const { dispatch, currentUser = {} } = this.props;
    if(JSON.stringify(currentUser) !== '{}'){
      dispatch({
        type: 'manage_group/getadminuser',
        payload: {
          Userid:currentUser.userid,
        },
      });
      
      dispatch({
        type: 'friend/getUser',
        payload: {
          Userid: currentUser.userid,
        }
      });
    }
    //获得admin的数据, 数据的产生在这里，把握好即可了,一旦出现错误很容易发生异常
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'manage_group/clear', 
    });
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({resetrender: !this.state.resetrender});
  }


  submitAuthority() {
    const { dispatch, } = this.props;
    const { validateFieldsAndScroll } = this.props.form;
    validateFieldsAndScroll( (error, values) => {
        if(!error) {
        dispatch({
            type: 'user/submitRegularForm',
            payload: values,
        });
        }
    });
  }
/**** */
  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }

  resetCondition = () => {
    this.setState({
      content_condition: 0,
      selectedRowkeys: [],
      modalVisible1: false,
      modalVisible2: false,
      edit_condition: false,
    });
  }
  /***** */
  reset_submit() {
    this.submitAuthority();
    this.resetCondition();
  }
  /***** */

  contentCondition = (content_condition) =>{
    this.setState({content_condition: content_condition});
  }
  
  deleteAdmin(selectedRowkeys) {
    const { dispatch, currentUser={} } = this.props;
    let userids = [];
    let i =0;
    for(;i<selectedRowkeys.length;i++){
      userids.push({
         userid:selectedRowkeys[i]
      });
    };
    if(JSON.stringify(currentUser)!=='{}') {
      dispatch({
        type:'manage_group/deleteAdminuser',
        payload: {
          userids,
          Userid: currentUser.userid,
        }
      });
      this.setState({modalVisible1: false});
      this.setState({
        content_condition: 0,
        selectedRowkeys: [],
        modalVisible1: false,
        modalVisible2: false,
      });
    }
    else{
      message.error("用户信息缺失，请重新刷新页面");
    }
  }

  /*getUser =(content_condition) =>{
    const {dispatch, currentUser={}}  =  this.props;
    if(JSON.stringify(currentUser)!='{}'){
      dispatch({
        type: 'friend/getUser',
        payload: {
          Userid: currentUser.userid,
        }
      });
      this.setState({content_condition: content_condition,});
    }
  }*/


  setModalvisible1(visible) {
    if(!visible){
      this.setState({modalVisible1: visible});
      this.setState({
        content_condition: 0,
        selectedRowkeys: [],
        modalVisible1: false,
        modalVisible2: false,
      });
    }
    if(visible){
      this.setState({modalVisible1: visible,});
    }
  }
  setModalvisible2(visible) {
    if(!visible){
      this.setState({modalVisible2: visible});
    }
    if(visible){
      this.setState({modalVisible2: visible});
    }
  }
  
  extraContent( selectedRowkeys, content_condition) {
    if(selectedRowkeys.length > 0) {
      return( 
        <div>
          <Tooltip placement='topRight' title='删除人员'><Button type='primary' onClick={() => this.setModalvisible1(true)}>删除</Button></Tooltip>
        </div>
      );
    }
    if(selectedRowkeys.length===0) {
      if(content_condition===0){
        return(
          <div>           
              <span>
                <Tooltip placement='topLeft' title='添加人员'><Button type='primary' onClick={() => this.contentCondition(2)}>添加</Button></Tooltip>
                  <Divider type='vertical' />
                <Tooltip placement='top' title='删除人员'><Button type='primary' onClick={() => this.setModalvisible2(true)}>删除</Button></Tooltip>
                  <Divider type='vertical' />
                <Tooltip placement='topRight' title='权限管理'><Button type='primary' onClick={() => this.contentCondition(1)}>权限</Button></Tooltip>
              </span>
            </div>
        );
      }
      if(content_condition===1){
        let edit_condition = this.state.edit_condition;
        if(!edit_condition){
          return(
            <div>  
              <Tooltip placement='top' title='返回'>         
                <Button type='primary' onClick={() => this.resetCondition()}>
                  <Icon type="rollback" />
                </Button>
              </Tooltip>
            </div> 
          );
        }
        return(
          <div>  
            <Tooltip placement='topLeft' title='保存权限更改'>         
              <Button type='primary' onClick={() => this.reset_submit()}>
                保存
              </Button>
            </Tooltip>
            <Divider type='vertical'/>
            <Tooltip placement='topRight' title='取消权限更改'>         
              <Button type='primary' onClick={() => this.resetCondition()}>
                取消
              </Button>
            </Tooltip>
          </div> 
        );
      }
    }   
       
  } 
  extraContent_3(length){
    if(length){
      return(
        <div>
          <Tooltip placement='top' title='加入设备绑定成员'><Button type='primary' onClick={() => this.resetCondition()}>加入成员</Button></Tooltip>
        </div>
      );
    }
    else{
        return(
            <div>
            <Tooltip placement='top' title='返回'>
            <Button type='primary' onClick={() => this.resetCondition()}>
                <Icon type="rollback" />
            </Button>
            </Tooltip>
        </div>
        );
    }
  }

  
  edit_Condition(e,edit_enable) {
    this.setState({edit_condition: edit_enable});
  }
  //从这里可以获取人员列表的信息;
 /**** */ 
  renderActivities() {
    const {
      list_device_friend=[],
      list_friend = [],
      adminusers=[],
    } = this.props;
    const { getFieldDecorator, } = this.props.form;
    const {content_condition, selectedRowkeys=[], modalVisible1, modalVisible2} =　this.state;
    const rowSelection = {
      selectedRowkeys,
      onChange: this.onSelectedChange,
      hideDefaultSelections: true,
    }
    if(content_condition!==2)      //2时显示朋友列表,在此状态，显示正常模式＋权限管理模式＋删除模式
    {
      return (
        <div style={{padding: 10}}>
          { ((content_condition === 0)||(selectedRowkeys.length !==0))
            &&
            <div>
              <Table columns={columns} dataSource={ adminusers } 
                pagination={false} rowSelection={rowSelection}
                loading = {adminusers === [] ? true : false}
                rowKey='userid'
              />
            </div>
            //这里直接显示出了人员的列表,只有在选择人数不为0或要求显示的内容不为２时，才显示出来
          }
          { (content_condition === 1)&&(selectedRowkeys.length ===0)
            &&
            <Card  bordered={false} style={{marginTop: 12}}>
              {getFieldDecorator('authorize', {
                initialValue: list_device_friend,
              })(<Table_friend onChange={(e, edit_enable) => this.edit_Condition(e,edit_enable)}/>)}
            </Card>
            //此时显示权限情况
          }
          {(selectedRowkeys.length > 0)&&(content_condition===0)
            &&
            <Modal
              title='删除下列人员'
              visible={modalVisible1} //删除人员时
              onOk={()=>this.deleteAdmin(selectedRowkeys)}
              onCancel={()=>this.setModalvisible1(false)}
              okText='确认'
              cancelText='取消'
            >
             <Form >　
                {selectedRowkeys.map((item)=>{
                  return(
                    <Form.Item key={item}>
                      <span>{item}</span>
                    </Form.Item>
                  );
                })}   
              </Form>
            </Modal>
          }
          { selectedRowkeys.length === 0
            &&
            <Modal visible={modalVisible2}
              onOk={()=>this.setModalvisible2(false)}
              onCancel={()=>this.setModalvisible2(false)}
              title='请选择需要删除的人员'
            >
               
            </Modal>
          }
        </div>
      );
    }
    if(content_condition===2){
    return (
      <Card title='朋友列表' bodyStyle={{ padding: 0 }}
       extra={this.extraContent_3(selectedRowkeys.length)}
      >
        <div style={{padding:10 }}>
          <Table columns={columns} dataSource={ list_friend } 
          pagination={false} rowSelection={rowSelection}
          rowKey='userid'
          />
        </div>
      </Card>
      );
    }
  }

  render() {
    const { selectedRowkeys, content_condition } = this.state;

    return (
      <Row gutter={24}>
        { content_condition!== 2　//在3状态下，需要完全的更换界面，故选择了采用两种状态下之间的转换形式。
          &&
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ padding: 0 }}
              title="权限管理"
              bordered={false}
              className={styles.activeCard}
              //loading={loading}
              extra={this.extraContent(selectedRowkeys, content_condition)}
              style={{ marginBottom: 24 }} 
            > 
              <div className={styles.activitiesList}>
                {this.renderActivities()} 
              </div>
            </Card>
          </Col>    
        } 
        { content_condition === 2
          &&
          this.renderActivities()
        }      
      </Row>
    );
  }
}
