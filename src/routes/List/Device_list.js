import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Modal, Form, Input } from 'antd';

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
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }
  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }
/******* */
  render() {
    const { list: { list, loading } } = this.props;
    const { modalVisible, addInputValue } = this.state;
    //const content = (
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
   // );

    const extraContent = (
      <div className={styles.extraImg}>
        <img alt="这是一个标题" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
      </div>
    );

    return (
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 12, lg: 4, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item => (item ? (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card} /*actions={[<a>操作一</a>, <a>操作二</a>]}*/>
                  <Card.Meta
                    avatar={<Link to="/list/device_friend">{<img alt="" className={styles.cardAvatar} src={item.avatar} />}</Link>}
                    title={<Link to="/list/device_friend">{item.title}</Link>}
                    description={(
                      <Ellipsis className={styles.item} lines={3}>{item.description}</Ellipsis>
                    )}
                  />
                </Card>
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
            )}
          />
          <Modal
               title="添加设备"
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
              </FormItem>
            </Modal>
        </div>      
    );
  }
}
