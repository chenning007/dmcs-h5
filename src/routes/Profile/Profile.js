import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input, Card, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';
import { getAuthority } from '../../utils/authority';

@connect(state => ({
  currentUser: state.login.currentUser,
}))
export default class Profile extends Component {
  handleTabChange = key => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'basic-profile':
        dispatch(routerRedux.push(`${match.url}/basic-profile`));
        break;
      case 'set_up':
        dispatch(routerRedux.push(`${match.url}/set_up`));
        break;
      case 'trace':
        dispatch(routerRedux.push(`${match.url}/trace`));
        break;
      case 'finance':
        dispatch(routerRedux.push(`${match.url}/finance`));
        break;
      default:
        break;
    }
  };

  handleMotivate = () => {
    const { dispatch, currentUser = {} } = this.props;
    if (JSON.stringify(currentUser) !== '{}') {
      dispatch({
        type: 'login/motivate',
        payload: {
          email: currentUser.userEmail,
          username: currentUser.username,
        },
      });
    }
  };

  render() {
    const tabList = [
      {
        key: 'basic-profile',
        tab: '信息',
      },
      {
        key: 'set_up',
        tab: '修改',
      },
      {
        key: 'trace',
        tab: '踪迹',
      },
      {
        key: 'finance',
        tab: '财产',
      },
    ];

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    const { match, routerData, location } = this.props;
    const routes = getRoutes(match.path, routerData);
    let authority = getAuthority();

    return (
      <PageHeaderLayout
        tabList={tabList}
        activeTabKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        {authority === 'amdin' ||
          authority === 'host' ||
          (authority === 'user' && (
            <Switch>
              {routes.map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
            </Switch>
          ))}
        {authority === 'guest' && (
          <Card>
            邮箱尚未激活，暂时无法使用其它功能
            <br />
            <br />
            <Button type="primary" onClick={() => this.handleMotivate()}>
              重新发送激活邮箱
            </Button>
          </Card>
        )}
      </PageHeaderLayout>
    );
  }
}
