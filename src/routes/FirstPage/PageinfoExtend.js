/*  用于显示DMCS部分的内容  */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Divider, Menu, Button, Input, Layout } from 'antd';
import { enquireScreen } from 'enquire-js';
import { routerRedux, Link } from 'dva/router';

const { Header, Content } = Layout;
const Search = Input.Search;

function SetHeight() {
  const subWeb = window.frames;
  let ifm = null;
  if (subWeb.length > 0) ifm = subWeb.frame;

  if (
    ifm !== null &&
    ifm.contentWindow !== null &&
    ifm.contentWindow.document !== null &&
    ifm.contentWindow.document.body !== null
  ) {
    ifm.style.height = 'auto'; // 关键这一句，先取消掉之前iframe设置的高度
    ifm.style.height = `${ifm.contentWindow.document.body.scrollHeight + 100}px`;
  }
}

@connect(state => ({
  pagelist: state.firstpage.pagelist,
}))
export default class PageinfoExtend extends PureComponent {
  state = {
    screenMobile: false,
    // height: 0,
  };

  /* 避免特殊的情况 */

  componentDidMount() {
    const { dispatch } = this.props;
    enquireScreen(mobile => {
      this.setState({
        screenMobile: mobile,
      });
    });
    dispatch({
      type: 'firstpage/getPageList',
      payload: {
        valueSelect: 'b',
      },
    }); // /* 获取第二部分的信息 */

    setTimeout(() => {
      SetHeight();
    }, 100);
  }

  componentWillUnmount() {
    this.setState = () => {
      return null;
    };
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
                defaultSelectedKeys={['2']}
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
                  title={<span style={{ textAlign: 'center', fontSize: 18 }}>更多</span>}
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
                </Menu.SubMenu>
              </Menu>
            </div>
          </Header>
        </Layout>
      );
    }
    if (screenMobile === undefined || screenMobile === false) {
      return (
        <Layout>
          <Header
            style={{
              position: 'fixed',
              marginTop: 0,
              width: '120%',
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
                defaultSelectedKeys={['2']}
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
                </Menu.SubMenu>
              </Menu>
            </div>
          </Header>
        </Layout>
      );
    }
  }

  ContentData() {
    /* const fileWindow = this.getRowByKey(); */

    const { pagelist } = this.props;

    if (pagelist === undefined || pagelist === null || pagelist[0] === undefined)
      return (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Icon style={{ fontSize: '40px' }} type="loading" />
        </div>
      );
    else {
      return (
        <iframe
          style={{ width: '100%', overflow: 'visible' }}
          // src="../../../public/Technique_3.html"
          src={pagelist[0].filesrc}
          // src={httpAddress + fileWindow.filesrc}
          id="frame"
          title="frame"
          height="100px"
          scrolling="no"
          frameBorder="0"
          onLoad={SetHeight()} // 这是为了进行简单的测试
        />
      );
    }
  }

  Position() {
    return (
      <div style={{ background: '#4B0082', color: '#ffffff' }}>
        <Icon type="home" style={{ marginLeft: 24, fontSize: 28 }} />
        <span style={{ paddingLeft: 24, fontSize: 18 }}>
          您当前的位置:&nbsp;&nbsp;
          <a onClick={() => this.Linkpage('1')}>首页</a>
          &nbsp;&nbsp;
          {'>'}
          &nbsp;&nbsp; 介绍
        </span>
      </div>
    );
  }

  render() {
    return (
      <Layout>
        {this.Header()}
        <Content style={{ marginTop: 128, width: '100%' }}>
          <div style={{ zIndex: 0, background: '#f0f2f5' }}>
            <Row>
              <Col xl={2} lg={12} md={12} sm={24} xs={24} />
              <Col xl={20} lg={12} md={12} sm={24} xs={24}>
                <img
                  src="http://39.104.208.4/image/firstpage/background.png"
                  style={{ width: '100%' }}
                  alt="背景图片"
                />
                {this.Position()}
                <div>{this.ContentData()}</div>
              </Col>
              <Col xl={2} lg={12} md={12} sm={24} xs={24} />
            </Row>
          </div>
        </Content>
      </Layout>
    );
  }
}
