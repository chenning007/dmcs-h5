import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

@connect()
export default class Monitor_dgo extends Component {
  handleTabChange = (key) => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'monitor_device':
        dispatch(routerRedux.push(`${match.url}/monitor_device`));
        break;
      case 'monitor_graph':
        dispatch(routerRedux.push(`${match.url}/monitor_graph`));
        break;
      case 'monitor_data':
        dispatch(routerRedux.push(`${match.url}/monitor_data`));
        break;
      default:
        break;
    }
  }

  render() {
    const tabList = [{
      key: 'monitor_device',
      tab: '面板',
    },
    {
      key: 'monitor_graph',
      tab: '数据',
    },  
    {
      key: 'monitor_data',
      tab: '原始',
    },
  ];



    const { match, routerData, location } = this.props;
    const routes = getRoutes(match.path, routerData);

    return (
      <PageHeaderLayout
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
