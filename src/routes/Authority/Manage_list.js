import React, { PureComponent } from 'react';
import { Card, List, Button, Icon, Row, Col, message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getAuthority } from '../../utils/authority';
import { cookieToJson } from '../../utils/cookieToJson';

const source_data = [
  { id: 1, title: '文件操作-管理' },
  { id: 2, title: '文件绑定-管理' },
  { id: 3, title: '文件可视性-管理' },
  { id: 4, title: '窗口设计-管理' },
  { id: 5, title: '网站公告-管理' },
  { id: 6, title: '未确定-管理' },
  { id: 7, title: '未确定-管理' },
  { id: 8, title: '未确定-管理' },
  { id: 9, title: '未确定-管理' },
];

@connect(state => ({
  currentUser: state.login.currentUser,
  manage_group: state.manage_group,
}))
export default class Manage_list extends PureComponent {
  state = {
    condition: 0,
    data: [],
    loading: false,
    bu_status: false,
    User: false, //用于刷新界面，只有state发生变化的时候，界面才能刷新
  };

  componentWillMount() {
    const { dispatch } = this.props;
    let authority = getAuthority();
    if (authority !== 'admin' && authority !== 'host') {
      dispatch(routerRedux.push('/exception/403'));
    }
  } //对权限进行判断

  componentDidMount() {
    const { currentUser = {}, dispatch } = this.props;
    let cookie = cookieToJson();
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
        payload: cookie, //直接将cookie发送过去
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.manage_group.AdminUser) !== '{}') {
      this.setState({ User: true });
    }
  }

  /*componentWillUnmount() {
    }*/
  set_condition = condition => {
    //这里需要完成路由操作；
    //只需要完成路由操作
    const { dispatch } = this.props;
    this.setState({ condition: condition });
    if (condition && condition < 10) {
      dispatch({
        type: 'tem_store/addid',
        payload: source_data[condition - 1].id,
      });
      switch (condition) {
        case 1:
          dispatch(routerRedux.push('/authority/manage_file'));
          break;
        case 2:
          dispatch(routerRedux.push('/authority/manage_file'));
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
    } //跳转到文档上传页面当中
    if (condition === 10) {
      dispatch(routerRedux.push('/authority/manage_group'));
    } //跳转到权限管理页面当中
  };
  judge_button = id => {
    const { manage_group } = this.props;
    if (id < 10) {
      if (JSON.stringify(manage_group.AdminUser) !== '{}' && manage_group.AdminUser !== null)
        //判断某一位的值的情况
        return (
          (manage_group.AdminUser.authorityNumber & Math.pow(2, id - 1)) !== Math.pow(2, id - 1)
        );
      return true;
    }
    if (id === 10) {
      let authority = getAuthority();
      if (authority !== 'host') return true;
      if (authority === 'host') return false;
    }
  };
  show_content() {
    const { condition } = this.state;
    if (condition === 0) {
      return (
        <Row>
          <Col xl={2} lg={24} md={24} sm={24} xs={24} />
          <Col xl={20} lg={24} md={24} sm={24} xs={24}>
            <List
              loading={this.state.loading}
              grid={{ gutter: 20, column: 1 }}
              itemLayout="horizontal"
              dataSource={source_data}
              renderItem={item => (
                <List.Item key={item.id}>
                  <Card style={{ textAlign: 'center' }}>
                    <Button
                      type="primary"
                      block
                      onClick={() => this.set_condition(item.id)}
                      disabled={this.judge_button(item.id)}
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
                onClick={() => this.set_condition(10)}
                disabled={this.judge_button(10)}
              >
                进入权限管理
              </Button>
            </Card>
          </Col>
        </Row>
      );
    } else {
      const { dispatch } = this.props;
      const { condition } = this.state;
      return (
        <div>
          <Card
            extra={
              <Button type="primary" onClick={() => this.set_condition(0)}>
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
    return <PageHeaderLayout>{this.show_content()}</PageHeaderLayout>;
  }
}
