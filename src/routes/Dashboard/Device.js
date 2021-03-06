import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Card, Avatar } from 'antd';
import { getAuthority } from '../../utils/authority';

import styles from './Device.less';

@connect(state => ({
  myselfDevice: state.device.myselfDevice,
  loading: state.device.loading,
  currentUser: state.user.currentUser,
}))
export default class Device extends PureComponent {
  componentDidMount() {
    const { currentUser } = this.props;
    if (currentUser !== undefined && currentUser !== {}) {
      /* dispatch({
        type: 'device/fetch',
        payload: {
          count: currentUser.userNumber,
        },
      }); */
      // 这部分尚未实现，故先注释掉
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'device/clear',
    });
  }

  /* *** */

  onLinktodevice = (avatarSrc, titleSrc, deviceNumberSrc) => {
    const { dispatch } = this.props;
    dispatch(
      routerRedux.push({
        pathname: '/dashboard/monitor_dgo/monitor_device',
        state: {
          avatar: avatarSrc,
          title: titleSrc,
          deviceNumber: deviceNumberSrc,
        },
      })
    );
  };

  /* *** */

  render() {
    const { myselfDevice, loading } = this.props;

    const authority = getAuthority();
    return (
      <div>
        {authority !== 'user' &&
          authority !== 'admin' &&
          authority !== 'host' && (
            <Card>
              邮箱未激活，功能暂时无法使用。
              如需激活或重新设置邮箱，请到“个人管理”进行激活邮件重发送或邮箱设置
            </Card>
          )}
        {(authority === 'user' || authority === 'admin' || authority === 'host') && (
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
                {myselfDevice !== [] &&
                  myselfDevice.map(item => (
                    <Card.Grid className={styles.projectGrid} key={item.key}>
                      <Card
                        bodyStyle={{ textAlign: 'center', padding: 0 }}
                        bordered={false}
                        onClick={() =>
                          this.onLinktodevice(item.avatar, item.title, item.deviceNumber)
                        }
                      >
                        <Card.Meta
                          style={{ padding: 0 }}
                          title={
                            <div className={styles.cardTitle}>
                              <Avatar size="large" src={item.avatar} />
                            </div>
                          }
                          // description={item.title}
                        />
                        <div style={{ paddingTop: 10 }}>
                          <b>{item.title}</b>
                        </div>
                      </Card>
                    </Card.Grid>
                  ))}
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
        )}
      </div>
    );
  }
}
