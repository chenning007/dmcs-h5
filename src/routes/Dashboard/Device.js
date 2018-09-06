import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Card,  Avatar, } from 'antd';


import styles from './Device.less';


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
  onLinktodevice = (avatar_src, title_src, deviceNumber_src) => {
    const {dispatch}=this.props;
    dispatch(routerRedux.push({
      pathname: '/dashboard/monitor_dgo/monitor_device',
      state: { 
        avatar: avatar_src,
        title: title_src,
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

    return (
      <div>
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
                        onClick={() =>this.onLinktodevice(item.avatar, item.title, item.deviceNumber)}
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
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.projectList}
              title="共享设备"
              loading={loading}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
