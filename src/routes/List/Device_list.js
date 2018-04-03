import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Modal, Form, Input, Avatar, Row, Col } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from './Device_list.less';

import { Link } from 'dva/router';

const FormItem = Form.Item;

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
/******* */

/******* */
  render() {
    const { list: { list, loading } } = this.props;
    const extracontent = (
      <div className={styles.extraContent}>
         <div className={styles.statItem} >
            <Icon type="close-square" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/>
         </div>
         <div className={styles.statItem} >
            <Icon type="minus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/>
         </div>
         <div className={styles.statItem}> 
            <Icon type="plus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} />
         </div>
      </div>
    );
{/*    //const content = (
     // <div className={styles.pageHeaderContent}>
    //    <p>
   //       段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
   //       提供跨越设计与开发的体验解决方案。
   //     </p>
   //     <div className={styles.contentLink}>
   //       <a>
   //         <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" /> 快速开始
    //      </a>
    //      <a>
    //        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" /> 产品简介
    //      </a>
    //      <a>
    //        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" /> 产品文档
    //      </a>
    //    </div>
    //  </div>
// );*/}
    return ( 
      <div>  
      <Row gutter={24}>  
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        <Card
          bordered={false}
          title="我的设备"
          loading={loading}
          extra = {extracontent}
          style={{ marginBottom: 24 }}  
          //bodyStyle={{ padding: 0 }}
          //extra={[<Icon type="plus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} />,
                  //<Icon type="minus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} />,
                 // <Icon type="close-square" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/>
          //      ]}
        >
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