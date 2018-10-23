import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Icon, Divider, Menu, Button, Input, Layout } from 'antd';
import { enquireScreen } from 'enquire-js';
import { routerRedux, Link } from 'dva/router';

const { Header, Content } = Layout;
const Search = Input.Search;

function KeytoName(key) {
  switch (key) {
    case '1':
      return '首页';
    case '2':
      return 'DMCS简介';
    case '3':
      return '解决方案';
    case '4':
      return '科研成果';
    case '5':
      return '设计案例';
    case '6':
      return '合作方式';
    case '7':
      return '软件下载';
    case '8':
      return '资料下载';
    case '9':
      return '合作规则';
    case '10':
      return '合作留言';
    default:
      return '首页';
  }
}

@connect(state => ({
  currentUser: state.login.currentUser,
}))
export default class Pageinfo extends PureComponent {
  state = { screenMobile: undefined };

  componentDidMount() {
    enquireScreen(mobile => {
      this.setState({
        screenMobile: mobile,
      });
    });
  }

  componentWillUnmount() {
    this.setState({ screenMobile: undefined });
  }

  MenuKey = e => {
    const { dispatch } = this.props;

    switch (e.key) {
      case '1': {
        dispatch(
          routerRedux.push({
            pathname: 'firstpage',
            state: {
              key: '1',
            },
          })
        );
        break;
      }
      case '3': {
        dispatch(
          routerRedux.push({
            pathname: 'pagelist',
            state: {
              key: '3',
            },
          })
        );
        break;
      }
      case '4': {
        dispatch(
          routerRedux.push({
            pathname: 'pagelist',
            state: {
              key: '4',
            },
          })
        );
        break;
      }
      case '5': {
        dispatch(
          routerRedux.push({
            pathname: 'pagelist',
            state: {
              key: '5',
            },
          })
        );
        break;
      }
      case '6': {
        dispatch(
          routerRedux.push({
            pathname: 'pagelist',
            state: {
              key: '6',
            },
          })
        );
        break;
      }
      case '7': {
        dispatch(
          routerRedux.push({
            pathname: 'pagelist',
            state: {
              key: '7',
            },
          })
        );
        break;
      }
      case '8': {
        dispatch(
          routerRedux.push({
            pathname: 'pagelist',
            state: {
              key: '8',
            },
          })
        );
        break;
      }
      case '9': {
        dispatch(
          routerRedux.push({
            pathname: 'pagelist',
            state: {
              key: '9',
            },
          })
        );
        break;
      }
      case '10': {
        dispatch(
          routerRedux.push({
            pathname: 'pagelist',
            state: {
              key: '10',
            },
          })
        );
        break;
      }
      default:
        break;
    }
  };

  changeRouterLogin() {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`login`));
  }

  changeRouterRegister() {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`register`));
  }

  Linkpage(key) {
    const { dispatch } = this.props;
    if (key === '1') {
      dispatch(routerRedux.push(`firstpage`));
    } else {
      dispatch(
        routerRedux.push({
          pathname: 'pagelist',
          state: {
            key,
          },
        })
      );
    }
  }

  ButtonContent() {
    const { currentUser } = this.props;
    if (currentUser === undefined || JSON.stringify(currentUser) === '{}') {
      return (
        <div>
          <Button type="primary" onClick={() => this.changeRouterLogin()}>
            登录
          </Button>
          <Divider type="vertical" />
          <Button type="primary" onClick={() => this.changeRouterRegister()}>
            注册
          </Button>
          <Search
            placeholder="input search text"
            style={{ width: '40%', marginRight: 120, paddingLeft: 12 }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/dashboard/device">
            <Button type="primary">用户管理</Button>
          </Link>
          <Search placeholder="input search text" style={{ width: '40%', marginLeft: 120 }} />
        </div>
      );
    }
  }

  Header() {
    const { screenMobile } = this.state;
    const { location } = this.props;
    const { key = '1' } = location.state === undefined ? '1' : location.state;
    if (screenMobile === true) {
      return (
        <Layout>
          <Header
            style={{
              position: 'fixed',
              marginTop: 0,
              width: '100%',
              zIndex: 1,
              background: '#ffffff',
            }}
          >
            <img
              style={{ marginLeft: -56 }}
              src="http://39.104.208.4/image/firstpage/u110.png"
              alt="logo"
            />
            <div style={{ float: 'right', marginRight: 240 }}>{this.ButtonContent()}</div>
          </Header>

          <Header
            style={{
              position: 'fixed',
              marginTop: 60,
              width: '100%',
              zIndex: 1,
              background: '#f0f2f5',
            }}
          >
            <div>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[key]}
                style={{ lineHeight: '64px' }}
                onClick={this.MenuKey}
              >
                <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="1">
                  首页
                </Menu.Item>
                <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="2">
                  DMCS简介
                </Menu.Item>
                <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="3">
                  解决方案
                </Menu.Item>
                <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="4">
                  科研成果
                </Menu.Item>
                <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="5">
                  设计案例
                </Menu.Item>
                <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="6">
                  合作方式
                </Menu.Item>
                <Menu.SubMenu
                  key="sub1"
                  title={<text style={{ textAlign: 'center', fontSize: 18 }}>更多</text>}
                >
                  <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="7">
                    软件下载
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="8">
                    资料下载
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="9">
                    合作规则
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="10">
                    合作留言
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
          </Header>
        </Layout>
      );
    }
    if (screenMobile === undefined) {
      return (
        <Layout>
          <Header
            style={{
              position: 'fixed',
              marginTop: 0,
              width: '100%',
              zIndex: 1,
              background: '#ffffff',
            }}
          >
            <img
              style={{ marginLeft: -56 }}
              src="http://39.104.208.4/image/firstpage/u110.png"
              alt="logo"
            />
            <div style={{ float: 'right' }}>{this.ButtonContent()}</div>
          </Header>

          <Header
            style={{
              position: 'fixed',
              marginTop: 60,
              width: '100%',
              zIndex: 1,
              background: '#f0f2f5',
            }}
          >
            <div>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[key]}
                style={{ lineHeight: '64px' }}
                onClick={this.MenuKey}
              >
                <Menu.Item style={{ width: '14%', textAlign: 'center', fontSize: 18 }} key="1">
                  首页
                </Menu.Item>
                <Menu.Item style={{ width: '14%', textAlign: 'center', fontSize: 18 }} key="2">
                  DMCS简介
                </Menu.Item>
                <Menu.Item style={{ width: '14%', textAlign: 'center', fontSize: 18 }} key="3">
                  解决方案
                </Menu.Item>
                <Menu.Item style={{ width: '14%', textAlign: 'center', fontSize: 18 }} key="4">
                  科研成果
                </Menu.Item>
                <Menu.Item style={{ width: '14%', textAlign: 'center', fontSize: 18 }} key="5">
                  设计案例
                </Menu.Item>
                <Menu.Item style={{ width: '14%', textAlign: 'center', fontSize: 18 }} key="6">
                  合作方式
                </Menu.Item>
                <Menu.SubMenu
                  style={{ width: '14%', textAlign: 'center', fontSize: 18 }}
                  key="sub1"
                  title="更多"
                >
                  <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="7">
                    软件下载
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="8">
                    资料下载
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="9">
                    合作规则
                  </Menu.Item>
                  <Menu.Item style={{ textAlign: 'center', fontSize: 18 }} key="10">
                    合作留言
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
          </Header>
        </Layout>
      );
    }
  }

  ContentData() {
    const { location } = this.props;
    const { id = 1 } = location.state === undefined ? 1 : location.state;
    switch (id) {
      case 1:
      case 3:
      case 5:
      case 7: {
        return <Card>内容</Card>;
      }
      case 8:
      case 9:
      case 10:
      case 11: {
        return <Card>暂无</Card>;
      }
      default: {
        return (
          // {/* <Card>
          //    本网站由清华大学DMCS(Distributed Measurement & Control System)课题组主办，目的在于课题组的新技术推广和实质性学术交流。 清华大学DMCS课题组长期从事分布式测控系统及其相关技术研究。
          //    经过多年的坚持和努力，基于课题组曾提出的"IPT (Information Pipe Technology)"信息管道技术，研制出了IPT系列多种新技术产品，可满足多数新型分布式测控系统的设计和应用需求。在热、机、电等应用领域的分布式测控技术方面，有望探索出一条技术和市场高度相结合的科技发展道路。欢迎更多的有识之士支持或加入我们团队。
          // </Card> */}
          <div>
            <iframe
              title="content_frame"
              src="http://39.104.208.4/image/1.html"
              style={{ width: '100%', height: 200, border: 0 }}
              frameBorder="no"
              scrolling="no"
            />
          </div>
        );
      }
    }
  }

  Position() {
    const { location } = this.props;
    const { key = '1' } = location.state === undefined ? '1' : location.state;
    const { id = 1 } = location.state === undefined ? 1 : location.state;
    if (key === '1') {
      return (
        <div style={{ background: '#4B0082', color: '#ffffff' }}>
          <Icon type="home" style={{ marginLeft: 24, fontSize: 28 }} />
          <span style={{ paddingLeft: 24, fontSize: 18 }}>
            您当前的位置:&nbsp;&nbsp;
            <a onClick={() => this.Linkpage('1')}>首页</a>
            &nbsp;&nbsp;
            {'>'}
            &nbsp;&nbsp;
            {id}
          </span>
        </div>
      );
    }
    if (key !== '1') {
      return (
        <div style={{ background: '#4B0082', color: '#ffffff' }}>
          <Icon type="home" style={{ marginLeft: 24, fontSize: 28 }} />
          <span style={{ paddingLeft: 24, fontSize: 18 }}>
            您当前的位置:&nbsp;&nbsp;
            <a onClick={() => this.Linkpage('1')}>首页</a>
            &nbsp;&nbsp;
            {'>'}
            &nbsp;&nbsp;
            <a onClick={() => this.Linkpage(key)}>{KeytoName(key)}</a>
            &nbsp;&nbsp;
            {'>'}
            &nbsp;&nbsp;
            {id}
          </span>
        </div>
      );
    }
  }

  render() {
    return (
      <Layout>
        {this.Header()}
        <Content style={{ marginTop: 128, width: '100%' /* textAlign: 'center' */ }}>
          <div style={{ zIndex: 0, background: '#f0f2f5' }}>
            <Row>
              <Col xl={2} lg={12} md={12} sm={24} xs={24}>
                <Card bordered={false} />
              </Col>
              <Col xl={20} lg={12} md={12} sm={24} xs={24}>
                <img
                  src="http://39.104.208.4/image/firstpage/background.png"
                  style={{ width: '100%' }}
                  alt="背景图片"
                />
                {this.Position()}
                {this.ContentData()}
              </Col>
              <Col xl={2} lg={12} md={12} sm={24} xs={24} />
            </Row>
          </div>
        </Content>
      </Layout>
    );
  }
}
