import React, { PureComponent } from 'react';
import { Card, List, Button, Icon, Row, Col, message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getAuthority } from '../../utils/authority';
import { cookieToJson } from '../../utils/cookieToJson';

import { sourceData } from '../../../public/constant';

/* const source_data = [
  { id: 1, title: '文件操作-管理' },
  { id: 2, title: '文件绑定-管理' },
  { id: 3, title: '文件可视性-管理' },
  { id: 4, title: '窗口设计-管理' },
  { id: 5, title: '网站公告-管理' },
  { id: 6, title: '未确定-管理' },
  { id: 7, title: '未确定-管理' },
  { id: 8, title: '未确定-管理' },
  { id: 9, title: '未确定-管理' },
]; */

@connect(state => ({
  currentUser: state.login.currentUser,
  AdminUser: state.manage_group.AdminUser,
}))
export default class ManageList extends PureComponent {
  state = {
    condition: 0,
    loading: false,
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
  /* componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.manage_group.AdminUser) !== '{}') {
      this.setState({ User: true });
    }
  } */

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
        payload: { id: sourceData[condition - 1].id },
      });
      switch (condition) {
        case 1:
          dispatch(routerRedux.push('/authority/manage_file'));
          break;
        case 2:
          dispatch(routerRedux.push('/authority/filewindow'));
          break;
        case 3:
          dispatch(routerRedux.push('/authority/manage_file'));
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
    if (id < 10) {
      if (JSON.stringify(AdminUser) !== '{}' && AdminUser !== null)
        // 判断某一位的值的情况。当为1时，则判断权限正常。
        return (AdminUser.authorityNumber & (2 ** (id - 1))) !== 2 ** (id - 1);
      return true;
    }
    if (id === 10) {
      const authority = getAuthority();
      if (authority !== 'host') return true;
      if (authority === 'host') return false;
    }
  };

  showContent() {
    const { condition, loading } = this.state;
    if (condition === 0) {
      return (
        <Row>
          <Col xl={2} lg={24} md={24} sm={24} xs={24} />
          <Col xl={20} lg={24} md={24} sm={24} xs={24}>
            <List
              loading={loading}
              grid={{ gutter: 20, column: 1 }}
              itemLayout="horizontal"
              dataSource={sourceData}
              renderItem={item => (
                <List.Item key={item.id}>
                  <Card style={{ textAlign: 'center' }}>
                    <Button
                      type="primary"
                      block
                      onClick={() => this.setCondition(item.id)}
                      disabled={this.judgeButton(item.id)}
                    >
                      {item.title}
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
            <Card style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                size="large"
                onClick={() => this.setCondition(10)}
                disabled={this.judgeButton(10)}
              >
                进入权限管理
              </Button>
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
