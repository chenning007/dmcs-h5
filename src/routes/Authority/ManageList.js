import React, { PureComponent } from 'react';
import { Card, Button, Icon, Row, Col, message, Avatar } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getAuthority } from '../../utils/authority';
import { cookieToJson } from '../../utils/cookieToJson';
import { sourceData } from '../../../public/constant';

import styles from './ManageList.less';

@connect(state => ({
  currentUser: state.login.currentUser,
  AdminUser: state.manage_group.AdminUser,
  loading: state.manage_group.loading,
}))
export default class ManageList extends PureComponent {
  state = {
    condition: 0,
  };

  componentWillMount() {
    const { dispatch } = this.props;
    const authority = getAuthority();
    if (authority !== 'admin' && authority !== 'host') {
      dispatch(routerRedux.push('/exception/403'));
    }
  } // 对权限进行判断

  componentDidMount() {
    const { currentUser = {}, dispatch } = this.props;
    const cookie = cookieToJson();
    if (cookie.admin_token === undefined || JSON.stringify(cookie) === '{}') {
      if (JSON.stringify(currentUser) !== '{}') {
        dispatch({
          type: 'manage_group/getselfuser',
          payload: {
            Userid: currentUser.userid,
          },
        });
      } else {
        dispatch(routerRedux.push('/exception/403'));
        message.error('无法验证身份');
      }
    } else {
      dispatch({
        type: 'manage_group/getselfuser',
        payload: cookie, // 直接将cookie发送过去
      });
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'document/clear',
    });
    dispatch({
      type: 'tem_store/clear',
    });
  }

  setCondition = condition => {
    // 这里需要完成路由操作；
    // 只需要完成路由操作
    const { dispatch } = this.props;
    this.setState({ condition });
    if (condition && condition < 10) {
      dispatch({
        type: 'tem_store/addid',
        payload: { id: sourceData[condition].id },
      });
      switch (condition) {
        case 1:
          dispatch(routerRedux.push('/authority/manage_file'));
          break;
        case 2:
          dispatch(routerRedux.push('/authority/filewindow'));
          break;
        case 3:
          dispatch(routerRedux.push('/authority/viewcontrol'));
          break;
        case 4:
          dispatch(routerRedux.push('/authority/manage_file'));
          break;
        case 5:
          dispatch(routerRedux.push('/authority/manage_file'));
          break;
        case 6:
          dispatch(routerRedux.push('/authority/manage_file'));
          break;
        case 7:
          dispatch(routerRedux.push('/authority/manage_file'));
          break;
        case 8:
          dispatch(routerRedux.push('/authority/manage_file'));
          break;
        case 9:
          dispatch(routerRedux.push('/authority/manage_file'));
          break;
        default:
          break;
      }
    } // 跳转到文档上传页面当中
    if (condition === 10) {
      dispatch(routerRedux.push('/authority/manage_group'));
    } // 跳转到权限管理页面当中
  };

  judgeButton = id => {
    const { AdminUser } = this.props;
    if (JSON.stringify(AdminUser) !== '{}' && AdminUser !== null) {
      switch (id) {
        case 1:
          return AdminUser.auth1 === 'true';
        case 2:
          return AdminUser.auth2 === 'true';
        case 3:
          return AdminUser.auth3 === 'true';
        case 4:
          return AdminUser.auth4 === 'true';
        case 5:
          return AdminUser.auth5 === 'true';
        case 6:
          return AdminUser.auth6 === 'true';
        case 7:
          return AdminUser.auth7 === 'true';
        case 8:
          return AdminUser.auth8 === 'true';
        case 9:
          return AdminUser.auth9 === 'true';
        case 10:
          return AdminUser.auth10 === 'true';
        default:
          return false;
      }
    }
    return false;
  };

  showContent() {
    const { loading } = this.props;
    const { condition } = this.state;
    if (condition === 0) {
      return (
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              bordered={false}
              loading={loading}
              bodyStyle={{ padding: 0 }}
            >
              {sourceData.map(item => (
                <div key={item.id}>
                  {this.judgeButton(item.id) === true && (
                    <Card.Grid className={styles.projectGrid} key={item.id}>
                      <Card
                        bodyStyle={{ textAlign: 'center', padding: 0 }}
                        bordered={false}
                        onClick={() => this.setCondition(item.id)}
                      >
                        <Card.Meta
                          style={{ padding: 0 }}
                          title={
                            <div className={styles.cardTitle}>
                              <Avatar size="large" icon={item.icon} style={item.color} />
                            </div>
                          }
                        />
                        <div style={{ paddingTop: 10 }}>
                          <b>{item.title}</b>
                        </div>
                      </Card>
                    </Card.Grid>
                  )}
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      );
    } else {
      return (
        <div>
          <Card
            extra={
              <Button type="primary" onClick={() => this.setCondition(0)}>
                <Icon type="rollback" />
              </Button>
            }
          >
            此处应有数据
          </Card>
        </div>
      );
    }
  }

  render() {
    return <PageHeaderLayout>{this.showContent()}</PageHeaderLayout>;
  }
}
