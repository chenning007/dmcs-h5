import React from 'react';
import { Link, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon, Layout } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { getRoutes } from '../utils/utils';

const {Content} = Layout;
const links = [{
  title: '帮助',
  href: '',
}, {
  title: '隐私',
  href: '',
}, {
  title: '条款',
  href: '',
}];

const copyright = <div>Copyright <Icon type="copyright" /> 2018 清华大学出品</div>;

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'DMCS Valley';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - DMCS Valley`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <Layout className={styles.container}>
        
          <Content /*style={{ margin: '24px 24px 0', height: '100%' }}*/>
          <div style={{ minHeight: 'calc(100vh - 260px)' }}>
            {
              getRoutes(match.path, routerData).map(item =>
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
          </div>
            <GlobalFooter
              style={{background:'#000000'}}
              links={[{
                title: '清华大学首页',
                href: 'http://www.tsinghua.edu.cn/',
                blankTarget: true,
              }, {
                title: 'GitHub',
                href: 'https://github.com/chenning007/dmcs-h5',
                blankTarget: true,
              }, {
                title: '清华大学精密仪器系',
                href: 'http://www.tsinghua.edu.cn/publish/dpi/',
                blankTarget: true,
              }]}
              copyright={
                <div>
                  Copyright <Icon type="copyright" /> 2018 清华大学出品
                </div>
              }
            />
          </Content>
        </Layout>
      </DocumentTitle>
    );
  }
}
//className={styles.footer}
export default UserLayout;
