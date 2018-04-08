import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Modal, Form, Input, Avatar, Row, Col, Steps, message } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from './Device_list.less';

import { Link } from 'dva/router';

const FormItem = Form.Item;
const { Step }=Steps;


@connect(state => ({
  list: state.list,
}))
export default class Device_list extends PureComponent {
/***** */
  state = {
    addInputValue: '',
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    condition: 0,
    current: 0,
    change_remove: 0,
  };
/******** */

  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }
  onchangeCondition() {
    this.setState({condition: 1,});
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
       change_remove: 0,
    });
  }
  reset() {
    this.setState({current: 0,
      condition: 0,
      change_remove: 0,
   });
   message.success('修改成功');
  }

  extracontent() {
    return(
    <div className={styles.extraContent}>
       <div className={styles.statItem} >
         <a><Icon type="close-square" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/></a>
       </div>
       <div className={styles.statItem} >
         <a><Icon type="minus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/></a>
       </div>
       <div className={styles.statItem}> 
         <a onClick={()=>this.onchangeCondition()}> <Icon type="plus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} /> </a>
       </div>
    </div>
  )
  };
/******* */

/******* */
  renderDevice(){
    const { list: { list, loading } } = this.props;
    const {condition, current, change_remove}=this.state;
    if(condition===0){
      return (
            <Row gutter={24}>  
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Card
                  bordered={false}
                  title="我的设备"
                  loading={loading}
                  extra={this.extracontent()}
                  style={{ marginBottom: 24 }} 
                >
                {
                  <List 
                    rowkey="id"
                    loading={loading}
                    dataSource={[...list]}
                      renderItem={item =>(
                        <List.Item key={item.id}>
                            <List.Item.Meta
                              avatar={<Link to="/list/device_friend">{<Avatar size="large" src={item.avatar}/>}</Link>}
                              title={item.title}
                              description={item.subDescription}
                            />
                          </List.Item>
                      )}
                    />
                  }
                </Card>
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

{/*
//        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 12, lg: 4, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
  //          renderItem={item => (item ? (
    //          <List.Item key={item.id}>
      //          <Card hoverable className={styles.card} /*actions={[<a>操作一</a>, <a>操作二</a>]}>
                  <Card.Meta
                    avatar={<Link to="/list/device_friend">{<img alt="" className={styles.cardAvatar} src={item.avatar} />}</Link>}
  //                  title={<Link to="/list/device_friend">{item.title}</Link>}
                    description={(
                      <Ellipsis className={styles.item} lines={3}>{item.description}</Ellipsis>
                    )}
                  />
    //            </Card>
              </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}
                    onClick={() => this.handleModalVisible(true)}
                  >
                    <Icon type="plus" /> 新增设备
                  </Button>
                </List.Item>
              )
   //        )}
          />
          <Modal
     //          title="添加设备"
               visible={modalVisible}
               onOk={this.handleAdd}
               onCancel={() => this.handleModalVisible()}
            >
             <FormItem
                 labelCol={{ span: 5 }}
                 wrapperCol={{ span: 15 }}
                 label="描述"
              >
                 <Input placeholder="请输入设备编号" onChange={this.handleAddInput} value={addInputValue} />
    //          </FormItem>
    //        </Modal>
            </div> */ }