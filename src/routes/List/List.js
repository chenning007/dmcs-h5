import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

@connect()
export default class SearchList extends Component {
  handleTabChange = (key) => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'friend_list':
        dispatch(routerRedux.push(`${match.url}/friend_list`));
        break;
      case 'device_list':
        dispatch(routerRedux.push(`${match.url}/device_list`));
        break;
      case 'data_list':
        dispatch(routerRedux.push(`${match.url}/data_list`));
        break;
      case 'file_list':
        dispatch(routerRedux.push(`${match.url}/file_list`));
        break;
      default:
        break;
    }
  }

  render() {
    const tabList = [{
      key: 'device_list',
      tab: '设备',
    },
    {
      key: 'friend_list',
      tab: '朋友',
    },  
    {
      key: 'data_list',
      tab: '数据',
    },
    {
      key: 'file_list',
      tab: '文件',
    }
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

    return (
      <PageHeaderLayout
        //content={mainSearch}
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
