import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Row, Col, Card, List, Avatar, Input, Button, Icon, Modal, Form } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditableLinkGroup from '../../components/EditableLinkGroup';
import { Radar } from '../../components/Charts';

import styles from './Device.less';

const FormItem = Form.Item;

@connect(state => ({
  myself_device: state.device.myself_device,
  loading: state.device.loading,
  currentUser: state.user.currentUser, 
}))
export default class Device extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };
  componentDidMount() {
    const { dispatch, currentUser } = this.props;
    if((currentUser!==undefined)&&(currentUser!=={})){
        dispatch ({
          type: 'device/fetch',
          payload: {
            count: currentUser.userNumber,
          },
        }
        );
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch ({
      type: 'device/clear',
    })
  }
/**** */
  onLinktodevice = (avatar_src,deviceNumber_src) => {
    const {dispatch}=this.props;
    dispatch(routerRedux.push({
      pathname: '/dashboard/monitor_device',
      state: { 
        avatar: avatar_src,
        deviceNumber: deviceNumber_src,
      },
    })
    );
  }


 /**** */ 

  render() {
    const {
      myself_device, loading,
    } = this.props;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>早安，蔡志军，祝你开心每一天！</div>
        </div>
      </div>
    );

    /*const extraContent = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          //onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );*/

    return (
      <PageHeaderLayout
      >
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="我的设备"
              bordered={false}
              loading={loading}
              bodyStyle={{ padding: 0 }}
            >
              {  myself_device !== []
                  &&
                  myself_device.map(item => (
                    <Card.Grid className={styles.projectGrid} key={item.key}>
                      <Card 
                        bodyStyle={{ textAlign: 'center', padding: 0}} 
                        bordered={false}
                        onClick={() =>this.onLinktodevice(item.avatar,item.deviceNumber)}
                      >
                        <Card.Meta
                            style={{padding: 0}}
                            title={(
                            <div className={styles.cardTitle}>
                                <Avatar size="large" src={item.avatar}/>
                            </div>
                            )}
                            // description={item.title}
                        />
                        <div style={{paddingTop:10}}><b>{item.title}</b></div>
                      </Card> 
                    </Card.Grid>
                  ))
                }
            </Card>
           {/* <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.projectList}
              title="共享设备"
              loading={loading}
            >
            {
                list.map(item => (
                  <Card.Grid className={styles.projectGrid} key={item.id}
                  >
                  <Row>
                    <Col xl={4} lg={4} md={4} sm={4} xs={4}/>
                    <Col xl={16} lg={16} md={16} sm={16} xs={16}>
                    <Card 
                    bodyStyle={{ padding: 10 }} 
                    bordered={false}
                    >
                      <Card.Meta
                        title={(
                          <div className={styles.cardTitle}>
                            <Avatar size="large" src={item.logo} />
                            {/*<Link to="/dashboard/monitor_device">{item.title}</Link>*/}
                        {/*  </div>
                        )}
                       // description={item.description}
                      />
                      <div className={styles.projectItemContent}>
                        <Link to="/dashboard/monitor_device">{item.member || ''}</Link>
                       {/* {item.updatedAt && (
                          <span className={styles.datetime} title={item.updatedAt}>
                            {moment(item.updatedAt).fromNow()}
                          </span>
                        )}
                      */}
                    {/*  </div>
                    </Card>
                    </Col>
                  </Row>
                  </Card.Grid>
                ))
              }
            </Card>*/}
  
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
