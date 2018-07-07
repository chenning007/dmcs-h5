import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { enquireScreen } from 'enquire-js';
import { routerRedux, Route, Switch } from 'dva/router';
import { Row, Col, Card, Table, Icon, Divider, Menu, Dropdown, Button, Input, List } from 'antd';
import { Layout } from 'antd';
import styles from './FirstPage.less';
const { Header, Footer, Sider, Content} = Layout ;
const {Meta} = Card;
const Search = Input.Search;

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});
@connect(state=>({}))
export default class Pageinfo extends PureComponent {
    state = {isMobile,};
  
    componentDidMount() {
        enquireScreen((mobile) => {
        this.setState({
        isMobile : mobile,
        });
        });
    }

    Menu_key = (e) => {
        const { dispatch } = this.props;
    
        switch(e.key){
          case '1': {
            dispatch(routerRedux.push({
              pathname: 'firstpage',
              state:{
                key:'1',
              }
            }));
            break;
          };
          case '3': {
            dispatch(routerRedux.push({
              pathname: 'pagelist',
              state:{
                key:'3',
              }
            }));
            break;
          };
          case '4': {
            dispatch(routerRedux.push({
              pathname: 'pagelist',
              state:{
                key:'4',
              }
            }));
            break;
          };
          case '5': {
            dispatch(routerRedux.push({
              pathname: 'pagelist',
              state:{
                key:'5',
              }
            }));
            break;
          };
          case '6': {
            dispatch(routerRedux.push({
              pathname: 'pagelist',
              state:{
                key:'6',
              }
            }));
            break;
          };
          case '7': {
            dispatch(routerRedux.push({
              pathname: 'pagelist',
              state:{
                key:'7',
              }
            }));
            break;
          };
          case '8': {
            dispatch(routerRedux.push({
              pathname: 'pagelist',
              state:{
                key:'8',
              }
            }));
            break;
          };
          case '9': {
            dispatch(routerRedux.push({
              pathname: 'pagelist',
              state:{
                key:'9',
              }
            }));
            break;
          };
          case '10': {
            dispatch(routerRedux.push({
              pathname: 'pagelist',
              state:{
                key:'10',
              }
            }));
            break;
          };
          default: break;
        }
    }

    Header() {
        const { isMobile } = this.state;
        const { key ='1' } = this.props.location.state === undefined ? '1':this.props.location.state ;
        if(isMobile===true) {
          return(
            <Layout>
              <Header style={{position: 'fixed', marginTop:0 ,width:'100%',zIndex:1 , background:'#f0f2f5'}}>  
                <img style={{marginLeft:-56,}} src="http://47.92.126.195:80/image/firstpage/u110.png" alt='logo'/>
                <div style={{float: 'right'}} >
                  <Button type='primary' onClick={()=>this.changeRouterLogin()}>登录</Button>
                  <Divider type='vertical'/>
                  <Button type='primary' onClick={()=>this.changeRouterRegister()}>注册</Button>
                  <Search
                    placeholder="input search text"
                    style={{width:'40%',marginLeft:120}}/> 
                </div>
              </Header>
    
              <Header style={{position: 'fixed', marginTop:60 ,width:'100%' ,zIndex:1 , background:'#ffffff'}}>
                <div>
                  <Menu
                    theme="black"
                    mode="horizontal"
                    defaultSelectedKeys={[key]}
                    style={{ lineHeight: '64px' }}
                    onClick={this.Menu_key}
                  >
                    <Menu.Item style={{textAlign: 'center',fontSize:18}} key='1'>首页</Menu.Item>
                    <Menu.Item style={{textAlign: 'center',fontSize:18}} key='2'>DMCS简介</Menu.Item>
                    <Menu.Item style={{textAlign: 'center',fontSize:18}} key='3'>解决方案</Menu.Item>
                    <Menu.Item style={{textAlign: 'center',fontSize:18}} key='4'>科研成果</Menu.Item>
                    <Menu.Item style={{textAlign: 'center',fontSize:18}} key="5">设计案例</Menu.Item>
                    <Menu.Item style={{textAlign: 'center',fontSize:18}} key="6">合作方式</Menu.Item>
                    <Menu.SubMenu key='sub1' title={<text style={{textAlign: 'center',fontSize:18}}>更多</text>}>
                      <Menu.Item style={{textAlign: 'center',fontSize:18}} key='7'>软件下载</Menu.Item>
                      <Menu.Item style={{textAlign: 'center',fontSize:18}} key='8'>资料下载</Menu.Item>
                      <Menu.Item style={{textAlign: 'center',fontSize:18}} key='9'>合作规则</Menu.Item>
                      <Menu.Item style={{textAlign: 'center',fontSize:18}} key='10'>合作留言</Menu.Item>
                    </Menu.SubMenu>
                  </Menu>
                </div>
              </Header>
            </Layout>
          );
        }
        if(isMobile===undefined) {
          return(
            <Layout>
              <Header style={{position: 'fixed', marginTop:0 ,width:'100%',zIndex:1 , background:'#f0f2f5'}}>  
                <img style={{marginLeft:-56,}} src="http://47.92.126.195:80/image/firstpage/u110.png" alt='logo'/>
                <div style={{float: 'right'}} >
                  <Button type='primary' onClick={()=>this.changeRouterLogin()}>登录</Button>
                  <Divider type='vertical'/>
                  <Button type='primary' onClick={()=>this.changeRouterRegister()}>注册</Button>
                  <Search
                    placeholder="input search text"
                    style={{width:'40%',marginLeft:120}}/> 
                </div>
              </Header>
    
              <Header style={{position: 'fixed', marginTop:60 ,width:'100%' ,zIndex:1 , background:'#ffffff'}}>
                <div>
                  <Menu
                    theme="black"
                    mode="horizontal"
                    defaultSelectedKeys={[key]}
                    style={{ lineHeight: '64px' }}
                    onClick={this.Menu_key}
                  >
                    <Menu.Item style={{width: '14%', textAlign: 'center',fontSize:18}} key='1'>首页</Menu.Item>
                    <Menu.Item style={{width: '14%', textAlign: 'center',fontSize:18}} key='2'>DMCS简介</Menu.Item>
                    <Menu.Item style={{width: '14%', textAlign: 'center',fontSize:18}} key='3'>解决方案</Menu.Item>
                    <Menu.Item style={{width: '14%', textAlign: 'center',fontSize:18}} key='4'>科研成果</Menu.Item>
                    <Menu.Item style={{width: '14%', textAlign: 'center',fontSize:18}} key="5">设计案例</Menu.Item>
                    <Menu.Item style={{width: '14%', textAlign: 'center',fontSize:18}} key="6">合作方式</Menu.Item>
                    <Menu.SubMenu style={{width: '14%', textAlign: 'center', fontSize:18}} key='sub1' title='更多'>
                      <Menu.Item style={{textAlign: 'center',fontSize:18}} key='7'>软件下载</Menu.Item>
                      <Menu.Item style={{textAlign: 'center',fontSize:18}} key='8'>资料下载</Menu.Item>
                      <Menu.Item style={{textAlign: 'center',fontSize:18}} key='9'>合作规则</Menu.Item>
                      <Menu.Item style={{textAlign: 'center',fontSize:18}} key='10'>合作留言</Menu.Item>
                    </Menu.SubMenu>
                  </Menu>
                </div>
              </Header>
            </Layout>
          );
        }
    }


    Content_data() {
        const { key ='1' } = this.props.location.state === undefined ? '1':this.props.location.state;
        return(
            <Card>
                本网站由清华大学DMCS(Distributed Measurement & Control System)课题组主办，目的在于课题组的新技术推广和实质性学术交流。 清华大学DMCS课题组长期从事分布式测控系统及其相关技术研究。
                经过多年的坚持和努力，基于课题组曾提出的"IPT (Information Pipe Technology)"信息管道技术，研制出了IPT系列多种新技术产品，可满足多数新型分布式测控系统的设计和应用需求。在热、机、电等应用领域的分布式测控技术方面，有望探索出一条技术和市场高度相结合的科技发展道路。欢迎更多的有识之士支持或加入我们团队。
            </Card>
        );
    }

    render() {
        
        return(
            <Layout>
                {this.Header()}
                <Content style={{marginTop:128, width: '100%', /*textAlign: 'center'*/}}>
                    <div style={{zIndex:0, background:'#f0f2f5',}}>
                        <Row>
                            <Col xl={2} lg={12} md={12} sm={24} xs={24}>
                                <Card bordered={false}/>
                            </Col>
                            <Col xl={20} lg={12} md={12} sm={24} xs={24}>
                                <img src="http://47.92.126.195:80/image/firstpage/background.png" style={{width:'100%'}}/>
                                {this.Content_data()}
                            </Col>
                            <Col xl={2} lg={12} md={12} sm={24} xs={24}/>
                        </Row>
                    </div>
                </Content>
            </Layout>
        );
    }
}