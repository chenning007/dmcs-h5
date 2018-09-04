import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

@connect()
export default class Profile extends Component {
  handleTabChange = (key) => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'basic-profile':
        dispatch(routerRedux.push(`${match.url}/basic-profile`));
        break;
      case 'set_up':
        dispatch(routerRedux.push(`${match.url}/set_up`))
        break;
      case 'basic':
        dispatch(routerRedux.push(`${match.url}/trace`));
        break;
      case 'advanced':
        dispatch(routerRedux.push(`${match.url}/finance`));
        break;
      default:
        break;
    }
  }

  render() {
    const tabList = [{
      key: 'basic-profile',
      tab: '信息',
    },
    {
        key: 'set_up',
        tab: '修改',
      },
    {
      key: 'basic',
      tab: '踪迹',
    }, 
    //{
    //  key: 'applications',
    //  tab: '应用',
    //}, 
    {
      key: 'advanced',
      tab: '财产',
    }];

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

    return (
      <PageHeaderLayout
       // title="搜索列表"
       // content={mainSearch}
        tabList={tabList}
        activeTabKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        <Switch>
          {
            routes.map(item =>
              (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              )
            )
          }
        </Switch>
      </PageHeaderLayout>
    );
  }
}
