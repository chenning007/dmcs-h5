import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Card } from 'antd';  
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';
import { getAuthority } from '../../utils/authority';

@connect()
export default class List extends Component {
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


    const { match, routerData, location } = this.props;
    const routes = getRoutes(match.path, routerData);
    let authority = getAuthority();

    return (
      <PageHeaderLayout
        tabList={tabList}
        activeTabKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
      { authority === 'host' || authority ==='admin' || authority ==='user'
        &&
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
      }
      { authority ==='guest'
        &&
        <Card>
          邮箱未激活，功能暂时无法使用。
          如需激活或重新设置邮箱，请到“个人管理”进行激活邮件重发送或邮箱设置
        </Card>
      }
      </PageHeaderLayout>
    );
  }
}
