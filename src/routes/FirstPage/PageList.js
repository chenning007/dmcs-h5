import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { enquireScreen } from 'enquire-js';
import { routerRedux, Route, Switch } from 'dva/router';
import { Row, Col, Card, Table, Icon, Divider, Menu, Dropdown, Button, Input, List } from 'antd';
import { Layout } from 'antd';
import styles from './FirstPage.less';
const { Header, Footer, Sider, Content} = Layout ;
const {Meta} = Card;

const data2 = [];
const data3 = [];
const data4 = [];
const data5 = [];
const data6 = [];
const Search = Input.Search;

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

function KeytoName(key) {
    switch(key){
        case '1' : return '首页'; break;
        case '2' : return 'DMCS简介'; break;
        case '3' : return '解决方案' ; break;
        case '4' : return '科研成果' ; break;
        case '5' : return '设计案例' ; break;
        case '6' : return '合作方式' ; break;
        case '7' : return '软件下载' ;break;
        case '8' : return '资料下载'  ; break;
        case '9' :  return '合作规则' ; break;
        case '10' :  return '合作留言' ; break;
        default : return '首页' ; break;
    }
}

@connect(state=>({}))
export default class PageList extends PureComponent {
    state = {isMobile, keynum:'1'};
  
    componentDidMount() {
        const { key ='1' } = this.props.location.state === undefined ? '1':this.props.location.state ;

        enquireScreen((mobile) => {
        this.setState({
        isMobile : mobile,
        });
        });
        this.setState({keynum:key});

    }
    
    componentWillUnmount() {
        this.setState({isMobile: undefined, keynum:'1'});
    }
    /******** */

    Linkpage(key) {
        const {dispatch} =this.props;
        if(key==='1'){
          dispatch(routerRedux.push(`firstpage`));
        }
        if(key==='2'){
            dispatch(routerRedux.push({
                pathname: 'pageinfo',
                state: {
                    key: '2',
                    id: 1,
                }
            }))
        }
        if(key!=='1'&&key!=='2'){
            this.setState({keynum: key});
        }
    }

    Menu_key = (e) => {
        const { dispatch } = this.props;

        switch(e.key){
          case '1': {
            dispatch(routerRedux.push(`firstpage`));
            break;
          };
          case '2': {
            dispatch(routerRedux.push({
              pathname: 'pageinfo',
              state:{
                key:'2',
                id: 1,
              }
            }));
            break;
          };
          case '3' : 
          case '4' :
          case '5' :
          case '6' :
          case '7' :
          case '8' :
          case '9' :
          case '10':
          {
            this.setState({keynum: e.key});
            break;
          }
          default: break;
        }
    }
    /******* */
    Content(key) {
       if(key!==undefined){
            /*** */
            switch(key){
                case '3':{
                    return (
                        <Card>
                            解决方案
                        </Card>
                    );
                    break;
                }
                case '4':{
                    return (
                        <Card>
                            科研成果
                        </Card>
                    );
                    break;
                }
                case '5':{
                    return (
                        <Card>
                            设计案例
                        </Card>
                    );
                    break;
                }
                case '6':{
                    return (
                        <Card>
                            合作方式
                        </Card>
                    );
                    break;}
                case '7':{
                    return (
                        <Card>
                            软件下载
                        </Card>
                    );
                    break;
                }
                case '8':{
                    return (
                        <Card>
                            资料下载
                        </Card>
                    );
                    break;
                }
                case '9':{
                    return (
                        <Card>
                            合作规则
                        </Card>
                    );
                    break;
                }
                case '10':{
                    return (
                        <Card>
                        　　　合作留言
                        </Card>
                    );
                    break;
                }
                default: {
                    return (
                        <Card>
                            暂无内容
                        </Card>
                    );
                    break;}
            }
            
       }
       else {
           return(
               <Card>
                  暂无内容
               </Card>
            )
        }
    }

    Header() {
        const { isMobile, keynum } = this.state;
        
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
                    defaultSelectedKeys={[keynum]}
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
                    defaultSelectedKeys={[keynum]}
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

    Position() {
        const { keynum } = this.state; 
        if(keynum === '1') {
          return(
              <div style={{background:'#4B0082', color:'#ffffff'}}>
                  <Icon type="home" style={{marginLeft:24,fontSize:28,}}/>
                  <span style={{paddingLeft:24, fontSize:18}}>
                    您当前的位置:&nbsp;&nbsp;
                    <a onClick={() => this.Linkpage('1')}>首页</a>&nbsp;&nbsp;>&nbsp;&nbsp;
                  </span>
              </div>
          );
        }
        if(keynum!=='1') {
          return(
            <div style={{background:'#4B0082', color:'#ffffff'}}>
              <Icon type="home" style={{marginLeft:24,fontSize:28,}}/>
              <span style={{paddingLeft:24, fontSize:18}}>
                您当前的位置:&nbsp;&nbsp;
                <a onClick={() => this.Linkpage('1')}>首页</a>&nbsp;&nbsp;>&nbsp;&nbsp;
                <a onClick={() => this.Linkpage(keynum)}>{KeytoName(keynum)}</a>&nbsp;&nbsp;
              </span>
            </div>
          );
        }
      }

    render() {
        const { key ='1' } = this.props.location.state === undefined ? '1':this.props.location.state ; 
        return (
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
                                {this.Position()}
                                {this.Content(this.state.keynum)}
                            </Col>
                            <Col xl={2} lg={12} md={12} sm={24} xs={24}/>
                        </Row>
                    </div>
                </Content>    
            </Layout>
        );
    }
}