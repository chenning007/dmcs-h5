import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Input, Button, Icon, Modal, Form, 
          Select, Tooltip, Table, Dropdown, Menu, Switch } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditableLinkGroup from '../../components/EditableLinkGroup';
import { Radar } from '../../components/Charts';

import styles from './Device_friend.less';

const FormItem = Form.Item;

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
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 10 },
  },
};

const columns = [{
  title: '人员',
  dataIndex: 'avatar',
  key: 'avatar',
  width: '4%',
  render: text => <Avatar src={text}/>,
},{
  title: '',
  dataIndex: 'name',
  key: 'name',
  width:'16%'
}, {
  title: '用户号',
  dataIndex: 'id_number',
  key: 'id_number',
  width: '30',
}, {
  title: '联系方式',
  dataIndex: 'phone_number',
  key: 'phone_number',
  width: '15',
},
{
  title: '单位',
  key: 'work_place',
  width: '20%',
  dataIndex: 'work_place',
  //render: '',
},{
  title: '权限',
  key: 'access',
  width: '15%',
  dataIndex: 'access',
}];

const columns1 = [{
  title: '朋友',
  dataIndex: 'avatar',
  key: 'avatar',
  width: '4%',
  render: text => <Avatar src={text}/>,
},{
  title: '',
  dataIndex: 'name',
  key: 'name',
  width:'16%'
}, {
  title: '用户号',
  dataIndex: 'id_number',
  key: 'id_number',
  width: '30',
}, {
  title: '联系方式',
  dataIndex: 'phone_number',
  key: 'phone_number',
  width: '20',
},
{
  title: '单位',
  key: 'work_place',
  width: '30%',
  dataIndex: 'work_place',
  //render: '',
}];

@connect(state => ({
  activities: state.activities,
}))

@Form.create()
export default class Device_friend extends PureComponent {
  state={
    title_condition: 1,
    content_condition: 0,
    selectedRowkeys: [],
    modalVisible1: false,
    modalVisible2: false,
  }
  onSelectedChange = (selectedRowkeys) => {
    this.setState({selectedRowkeys: selectedRowkeys});
  }
  componentDidMount() {
    const { dispatch } = this.props;
  //  dispatch({
  //    type: 'project/fetchNotice',
  //  });
    dispatch({
      type: 'activities/fetchList',
    });
   // dispatch({
   //   type: 'chart/fetch',
  //  });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    this.setState({
      title_condition: 1,
      content_condition: 0,
      selectedRowkeys: [],
      modalVisible1: false,
      modalVisible2: false,
    })
    dispatch({
      type: 'activities/clear',
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
      title_condition: 1,
      content_condition: 0,
      selectedRowkeys: [],
      modalVisible1: false,
      modalVisible2: false,

    });
  }
  contentCondition = (content_condition) =>{
    this.setState({content_condition: content_condition});
  }
  
  handleMenuClick = (e) => {
    //const { dispatch } = this.props;
    const { selectedRowkeys } = this.state;

    if (!selectedRowkeys) return;

    switch (e.key) {
      case 'remove':
          this.setState({content_condition: 1, }); //删除为1
        break;
      case 'approval':
          this.setState({content_condition: 2, }); //授权管理为2
      default:
        break;
    }
  }

  setModalvisible1(visible) {
    if(!visible){
    this.setState({modalVisible1: visible});
    this.setState({selectedRowkeys: []});
    }
    if(visible){
    this.setState({modalVisible1: visible});
    }
  }
  setModalvisible2(visible) {
    if(!visible){
    this.setState({modalVisible2: visible});
    this.setState({selectedRowkeys: []});
    }
    if(visible){
    this.setState({modalVisible2: visible});
    }
  }
  
  extraContent( selectedRowkeys) {
     //const titlecondition = titlecondition;
     const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">
          <a onClick={() => this.setModalvisible1(true)}>删除</a>
        </Menu.Item>
        <Menu.Item key="approval">
          <a onClick={() => this.setModalvisible2(true)}>权限</a>
        </Menu.Item>
      </Menu>
      );   //正常情况下
      return (
        <div > 
          { selectedRowkeys.length>0 
              &&
            <span>  
              <Dropdown overlay={menu}>
                <Button>
                  操作 <Icon type="down" />
                </Button>
              </Dropdown>
            </span>
          }
          { selectedRowkeys.length===0
              &&
            <span>
              <Button type='primary'onClick={() => this.contentCondition(3)}>添加</Button>
            </span>
          }
        </div>    
      );   
    } 

               // {/*
               // <div className={styles.extraContent}>  
               //   <div className={styles.statItem}> 
               //     <Tooltip title='权限管理'>
               /*       <a onClick={() => this.contentCondition(1)}>
                        <Icon type="setting" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} />
                      </a>
                    </Tooltip>
                  </div>
                  <div className={styles.statItem} >
                    <Tooltip title='删除人员'>
                      <a onClick={() => this.contentCondition(2)}>
                        <Icon type="minus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/>
                      </a>
                    </Tooltip>
                  </div>
                  <div className={styles.statItem} > 
                    <Tooltip title='添加人员'>
                      <a onClick={()=> this.contentCondition(3)}>
                        <Icon type="plus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} />
                      </a>
                    </Tooltip>
                  </div>
                </div>*//*}*/
  extraContent_3(content_condition){
    if(content_condition){
    return(
      <div>
        <Button type='primary' onClick={() => this.resetCondition()}>加入成员</Button>
      </div>
    );
   }
   return ;
  }
    



 /**** */ 
  renderActivities() {
    const {
      activities: { list_people },
    } = this.props;
    const {content_condition, selectedRowkeys, modalVisible1, modalVisible2} =　this.state;
    const rowSelection = {
      selectedRowkeys,
      onChange: this.onSelectedChange,
      hideDefaultSelections: true,
    }
    if(content_condition!==3)
    {
      return (
        <div style={{padding: 10}}>
          <Table columns={columns} dataSource={ list_people } 
            pagination={false} rowSelection={rowSelection}
          />
          {(selectedRowkeys.length > 0)&&(content_condition===1)
            &&
              <Modal
                title='删除下列人员'
                visible={modalVisible1}
                onOk={()=>this.setModalvisible1(false)}
                onCancel={()=>this.setModalvisible1(false)}
                okText='确认'
                cancelText='取消'
              >
                <Form >
                  {selectedRowkeys.map((item)=>{
                    let tem=item-1;
                    return(
                      <Form.Item key={item}>
                        <span>{(list_people[tem]).id_number}</span>
                      </Form.Item>
                    );
                  })}   
                </Form>
              </Modal>
          }{
            (selectedRowkeys.length > 0)&&(content_condition===2)
             &&
              <Modal
              title='权限管理'
              visible={modalVisible2}
              onOk={()=>this.setModalvisible2(false)}
              onCancel={()=>this.setModalvisible2(false)}
              okText='确认'
              cancelText='取消'
            >
              <Form >
                {selectedRowkeys.map((item)=>{
                  let tem=item-1;
                  return(
                    <Form.Item key={item}>
                      <span style={{fontSize: 16}}>
                        用户号:
                      </span>
                      <span style={{fontSize: 16, paddingLeft: 4}}>{(list_people[tem]).id_number}</span>
                      <span style={{fontSize: 16, paddingLeft: 8}}>
                        用户名:
                      </span>
                      <span style={{fontSize: 16, paddingLeft: 4}}>{(list_people[tem]).name}</span>
                      <Card>
                        <div style={{paddingLeft: 8}}>
                          <span style={{fontSize: 16}}>
                            无:
                          </span>
                          <span style={{paddingLeft: 8}}>
                            <Switch checkedChildren={<Icon type="check" />} 
                              unCheckedChildren={<Icon type="cross" />} 
                              defaultChecked
                            />
                          </span>
                        </div>
                        <div style={{paddingLeft: 8}}>
                          <span style={{fontSize: 16}}>
                            读:
                          </span>
                          <span style={{paddingLeft: 8}}>
                            <Switch checkedChildren={<Icon type="check" />} 
                              unCheckedChildren={<Icon type="cross" />} 
                              defaultChecked={false} 
                            />
                          </span>
                        </div>
                        <div style={{paddingLeft: 8}}>
                          <span style={{fontSize: 16}}>
                            写:
                          </span>
                          <span style={{paddingLeft: 8}}>
                            <Switch checkedChildren={<Icon type="check" />} 
                              unCheckedChildren={<Icon type="cross" />} 
                              defaultChecked={false} 
                            />
                          </span>
                        </div>
                      </Card>
                    </Form.Item>
                  );
                })}   
              </Form>
            </Modal>
          }
        </div>
      );
    }
    if(content_condition===3){
    return (
      <Card title='朋友列表' bodyStyle={{ padding: 0 }}
      extra={this.extraContent_3(selectedRowkeys.length)}
      >
        <div style={{padding:10 }}>
          <Table columns={columns1} dataSource={ list_people } 
          pagination={false} rowSelection={rowSelection}/>
        </div>
      </Card>
      );
    }
          /*
        case 1 :{
          return list_people.map((item) => {
            return (
              <List.Item key={item.key} actions={[<Button type='primary'>保存</Button>]}>
                <span>
                <Avatar
                  src={item.avator} 
                  /*title={
                      <a className={styles.username}>{item.user.name}</a>*/
                /* }*/
              /*  />
                </span>
                <span style={{paddingLeft: 12, paddingTop: 6}}>{item.name}</span>
                  
              </List.Item>
            );
          });
        }*/
        /*case 2 :{
          return (
            <div style={{padding: 10}}>
              <Table columns={columns} dataSource={ list_people } 
                pagination={false} rowSelection={rowSelection}
              />
              {selectedRowkeys.length > 0
               &&
                  <Modal
                    title='删除人员'
                    visible={modalVisible1}
                    onOk={()=>this.setModalvisible1(false)}
                    onCancel={()=>this.setModalvisible1(false)}
                    okText='确认'
                    cancelText='取消'
                  >
                    <Form >
                      {selectedRowkeys.map((item)=>{
                        let tem=item-1;
                        return(
                          <Form.Item key={item}>
                            <span>{(list_people[tem-1]).id_number}</span>
                          </Form.Item>
                        );
                      })}   
                    </Form>
                  </Modal>
              }
            </div>
          );
        }
        case 3 :{

        }
        default: return;
    }*/
  }

  render() {
    const {
      activities: { loading: activitiesLoading, },
      form,
    } = this.props;

    const { getFieldDecorator, getFieldValue } = this.props.form;

    const { selectedRowkeys, content_condition } = this.state;
 

    return (
        <Row gutter={24}>
          {content_condition!==3
            &&
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Card
                bodyStyle={{ padding: 0 }}
                bordered={false}
                className={styles.activeCard}
                title="共享成员"
                loading={activitiesLoading}
                extra={this.extraContent(selectedRowkeys)}
                style={{ marginBottom: 24 }} 
              > 
                <div className={styles.activitiesList}>
                    {this.renderActivities()} 
                </div>
              </Card>
              <Card 
                  bordered={true}
                  title="设备信息"
                  style={{ marginBottom: 36 }}
              >
                <Row>
                  <Col span={12}>
                    <Form
                      //onSubmit={this.handleSubmit}
                      hideRequiredMark
                      style={{ marginTop: 8 }}
                    >  
                      <FormItem
                        {...formItemLayout}
                        label="设备id"
                      >
                        {getFieldDecorator('id', {
                        initialValue: "2015000000",
                        rules: [{
                            required: false, 
                          }],
                        })(
                            <Input  size="large" placeholder="例如: 2015000000" disabled
                            />
                          )}
                      </FormItem>
                      <FormItem
                          {...formItemLayout}
                          label="名称"
                      >
                      {getFieldDecorator('number', {
                        initialValue: "conditionar",
                        rules: [{
                          required: false, 
                        }],
                      })(
                          <Input  size="large" placeholder="例如: 2015000000" disabled
                          />
                        )}
                      </FormItem>
                      <FormItem
                          {...formItemLayout}
                          label="日期"
                      >
                      {getFieldDecorator('date', {
                        initialValue: "2017-08-01",
                        rules: [{
                          required: false, 
                        }],
                      })(
                          <Input  size="large" placeholder="例如: 2015000000" disabled
                          />
                        )}
                      </FormItem>  
                      <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                        <Button type="primary" htmlType="submit" /*loading={submitting}*/>
                          保存
                        </Button>
                          {/*<Button style={{ marginLeft: 8 }}>保存</Button>*/}
                      </FormItem>           
                    </Form>
                  </Col>
                </Row>
              </Card>
              <Card 
                style={{ marginBottom: 36 , textAlign: 'center' }}
              >
                <Button type="danger" htmlType="submit" size="large"/*loading={submitting}*/>
                    权限转让
                </Button> 
              </Card>
              <Card style={{ textAlign: 'center' }}>
                <Button type="danger" htmlType="submit" size="large"/*loading={submitting}*/>
                    删除并退出
                  </Button>   
              </Card>
            </Col>    
          } 
          { content_condition === 3
            &&
              this.renderActivities()
          }      
      </Row>
    );
  }
}
