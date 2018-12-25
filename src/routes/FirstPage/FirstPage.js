import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { enquireScreen } from 'enquire-js';
import { routerRedux, Link } from 'dva/router';
import { Row, Col, Card, Icon, Divider, Menu, Button, Input, List, Carousel, Layout } from 'antd';

import { ModuleToModuleid } from '../../utils/KeyToName';
// import {  /* designExam */ httpAddress } from '../../../public/constant';

const { Header, Content } = Layout;
const { Meta } = Card;
const Search = Input.Search;

@connect(state => ({
  loading: state.system.loading,
  webShowInfos: state.system.webShowInfos,
  currentUser: state.login.currentUser,
  pagelistloading: state.firstpage.pagelistloading,
  firstpagelist: state.firstpage.firstpagelist,
}))
export default class FirstPage extends PureComponent {
  state = { isMobile: false };

  componentDidMount() {
    enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'firstpage/getFirstPageList',
    });
    dispatch({
      type: 'firstpage/getPageList',
      payload: {
        valueSelect: 'b',
      },
    });
  }

  componentWillUnmount() {
    this.setState = () => {
      return null;
    };
  }

  MenuKey = e => {
    const { dispatch } = this.props;

    switch (e.key) {
      case '2': {
        dispatch(
          routerRedux.push({
            pathname: 'pageinfoextend',
            state: {
              key: '2',
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

  changeRouterRegister() {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`register`));
  }

  showDetailInfo(createid, keynum) {
    const { dispatch } = this.props;
    dispatch({
      type: 'firstpage/setCreateid',
      payload: {
        createid,
        moduleid: keynum,
      },
    });
    dispatch(routerRedux.push(`pageinfo`));
  }

  /*  *************************  */

  loadmore(type) {
    const { dispatch } = this.props;
    switch (type) {
      case 1: {
        dispatch(
          routerRedux.push({
            pathname: 'pagelist',
            state: {
              key: '5',
              content: 'no',
            },
          })
        );
        break;
      }
      case 2: {
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
      case 3: {
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
      case 4: {
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
      default:
        break;
    }
  }

  FilterData(module) {
    const { firstpagelist } = this.props;

    return firstpagelist.filter(item => item.moduleid === ModuleToModuleid(module));
  }

  changeRouterLogin() {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`login`));
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
    const { isMobile } = this.state;
    if (isMobile === true) {
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
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px', background: 'f0f2f5' }}
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
    if (isMobile === false || isMobile === undefined) {
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
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px', background: 'f0f2f5' }}
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

  // /////////

  showWebinfos() {
    const { webShowInfos } = this.props;
    const { isMobile } = this.state;
    if (isMobile || !Array.isArray(webShowInfos)) return null;
    else {
      return (
        <div>
          {webShowInfos.map(item => (
            <span>{item.inftxt}</span>
          ))}
        </div>
      );
    }
  }

  /* ******** */
  Linkpage(id, mode) {
    const { dispatch } = this.props;
    dispatch(
      routerRedux.push({
        pathname: 'pageinfo',
        state: {
          key: mode,
          id,
        },
      })
    );
  }

  render() {
    const { loading, webShowInfos, pagelistloading } = this.props;

    return (
      <div>
        <Layout>
          {/* 这里需要加入判断手机和电脑屏幕的程序* */}
          {this.Header()}
          <Content style={{ marginTop: 128, width: '100%' /* textAlign: 'center' */ }}>
            <Carousel autoplay style={{ marginBottom: 12 }} loading={pagelistloading}>
              {this.FilterData('ae').map(item => (
                <img
                  key={item.createid}
                  style={{ width: '100%' }}
                  src={item.imagesrc}
                  alt="img"
                  onClick={() => this.showDetailInfo(item.createid, '1')}
                />
              ))}
              {/* <img
                src={imgData[0].img_src}
                style={{ width: '100%' }}
                onClick={() => this.Linkpage(imgData[0].id, imgData[0].mode)}
                alt="img"
              />
              <img
                src={imgData[1].img_src}
                style={{ width: '100%' }}
                onClick={() => this.Linkpage(imgData[1].id, imgData[1].mode)}
                alt="img"
              />
              <img
                src={imgData[2].img_src}
                style={{ width: '100%' }}
                onClick={() => this.Linkpage(imgData[2].id, imgData[2].mode)}
                alt="img"
              />
              {
                <img
                  src={imgData[3].img_src}
                  style={{ width: '100%' }}
                  onClick={() => this.Linkpage(imgData[3].id, imgData[3].mode)}
                  alt="img"
                />
              } */}
            </Carousel>
            <Divider orientation="left">
              <span style={{ fontSize: 22 }}>网站公告</span>
            </Divider>
            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <Carousel autoplay dots="false" loading={loading}>
                {webShowInfos.map(item => (
                  <span key={item.infid}> {item.inftxt} </span>
                ))}
              </Carousel>
            </div>
            <Divider />
            <div style={{ zIndex: 0 }}>
              <div style={{ background: '#f0f2f5' }}>
                <div style={{ marginBottom: 8, marginTop: 12 }}>
                  <span style={{ fontSize: 28, paddingLeft: '4%' }}>
                    <Icon type="question-circle-o" />
                    &nbsp;&nbsp;设计案例
                  </span>
                  <span style={{ float: 'right', marginRight: 16, marginTop: 8 }}>
                    <Button type="primary" onClick={() => this.loadmore(1)}>
                      <Icon type="plus" />
                      更多
                    </Button>
                  </span>
                </div>
                <Row>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24} />
                  <Col xl={20} lg={12} md={12} sm={24} xs={24}>
                    <List
                      grid={{ gutter: 16, lg: 4, md: 2, sm: 1, xs: 1 }}
                      dataSource={this.FilterData('aa')}
                      renderItem={item => (
                        <List.Item key={item.createid}>
                          <Card
                            cover={
                              <img
                                alt="cover"
                                src={item.imagesrc}
                                onClick={() => this.showDetailInfo(item.createid, '5')}
                              />
                            }
                          >
                            <Meta description={item.fileimagedescrip} />
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24} />
                </Row>
              </div>

              <div style={{ background: '#ffffff' }}>
                <div style={{ marginBottom: 8, marginTop: 12 }}>
                  <span style={{ fontSize: 28, paddingLeft: '4%' }}>
                    <img
                      style={{ width: '2%' }}
                      src="http://39.104.208.4/image/firstpage/u2327.png"
                      alt="img"
                    />
                    &nbsp;&nbsp;解决方案
                  </span>
                  <span style={{ float: 'right', marginRight: 16, marginTop: 8 }}>
                    <Button type="primary" onClick={() => this.loadmore(2)}>
                      <Icon type="plus" />
                      更多
                    </Button>
                  </span>
                </div>
                <Row>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24} />
                  <Col xl={20} lg={12} md={12} sm={24} xs={24}>
                    <List
                      grid={{ gutter: 16, column: 4 }}
                      dataSource={this.FilterData('ab')}
                      renderItem={item => (
                        <List.Item key={item.createid}>
                          <Card
                            cover={
                              <img
                                alt="cover"
                                src={item.imagesrc}
                                onClick={() => this.showDetailInfo(item.createid, '3')}
                              />
                            }
                          >
                            <Meta description={item.fileimagedescrip} />
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24} />
                </Row>
              </div>

              <div style={{ background: '#f0f2f5' }}>
                <div style={{ marginBottom: 8, marginTop: 16 }}>
                  <span style={{ fontSize: 28, paddingLeft: '4%' }}>
                    <img
                      style={{ width: '2%' }}
                      src="http://39.104.208.4/image/firstpage/u26.png"
                      alt="img"
                    />
                    &nbsp;&nbsp;科研成果
                  </span>
                  <span style={{ float: 'right', marginRight: 16, marginTop: 8 }}>
                    <Button type="primary" onClick={() => this.loadmore(3)}>
                      <Icon type="plus" />
                      更多
                    </Button>
                  </span>
                </div>
                <Row>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24} />
                  <Col xl={20} lg={12} md={12} sm={24} xs={24}>
                    <List
                      grid={{ gutter: 16, column: 4 }}
                      dataSource={this.FilterData('ac')}
                      renderItem={item => (
                        <List.Item key={item.createid}>
                          <Card
                            cover={
                              <img
                                alt="cover"
                                src={item.imagesrc}
                                onClick={() => this.showDetailInfo(item.createid, '4')}
                              />
                            }
                          >
                            <Meta description={item.fileimagedescrip} />
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24} />
                </Row>
              </div>
              {/* <div style={{ background: '#ffffff' }}>
                <div style={{ marginBottom: 8, marginTop: 16 }}>
                  <span style={{ fontSize: 28, paddingLeft: '4%' }}>
                    <img src="http://39.104.208.4/image/firstpage/u26.png" alt="img" />
                    &nbsp;&nbsp;合作方式
                  </span>
                  <span style={{ float: 'right', marginRight: 16, marginTop: 8 }}>
                    <Button type="primary" onClick={() => this.loadmore(3)}>
                      <Icon type="plus" />
                      更多
                    </Button>
                  </span>
                </div>
                <Row>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24} />
                  <Col xl={20} lg={12} md={12} sm={24} xs={24}>
                    <List
                      grid={{ gutter: 16, column: 4 }}
                      dataSource={designExam}
                      renderItem={item => (
                        <List.Item key={item.key}>
                          <Card cover={<img alt="cover" src={item.src} />}>
                            <Meta description={item.description} />
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24} />
                </Row>
              </div> */}
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}
