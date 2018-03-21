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
      case 'articles':
        dispatch(routerRedux.push(`${match.url}/articles`));
        break;
      case 'mail_list':
        dispatch(routerRedux.push(`${match.url}/mail_list`));
        break;
      case 'projects':
        dispatch(routerRedux.push(`${match.url}/projects`));
        break;
      default:
        break;
    }
  }

  render() {
    const tabList = [{
      key: 'mail_list',
      tab: '通讯录',
    },
    {
      key: 'articles',
      tab: '朋友圈',
    }, 
    //{
    //  key: 'applications',
    //  tab: '应用',
    //}, 
    {
      key: 'projects',
      tab: '朋友群',
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
        title="搜索列表"
        content={mainSearch}
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
