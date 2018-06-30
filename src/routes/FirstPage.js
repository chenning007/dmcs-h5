import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { routerRedux, Route, Switch } from 'dva/router';
import { Row, Col, Card, Table, Icon, Divider, Menu, Dropdown,Button,message } from 'antd';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content} = Layout ;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="">Delete</a>
      <Divider type="vertical" />
      <a href="" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

@connect(state => ({}))
export default class FirstPage extends PureComponent {

  changeRouterLogin() {
    const { dispatch }=this.props;
    dispatch(routerRedux.push(`login`));
  }

  changeRouterRegister(){
    const { dispatch }=this.props;
    dispatch(routerRedux.push(`register`));
  }

  render() {
    return (
      <div>
        <Layout>
          <Header style={{position: 'fixed', marginTop:0 ,width:'100%',zIndex:1 , background:'#f0f2f5'}}>  
            <img src="http://47.92.126.195:80/image/u110.png"/>
            <div style={{float: 'right'}}>
              <Button type='primary' onClick={()=>this.changeRouterLogin()}>登录</Button>
              <Divider type='vertical'/>
              <Button type='primary' onClick={()=>this.changeRouterRegister()}>注册</Button>
            </div>
          </Header>
          <Header style={{position: 'fixed', marginTop:60 ,width:'100%' ,zIndex:1 , color:'#FFFAFA'}}>
            <div>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="1">关于我们</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="2">学术交流</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="3">科研成果</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="4">设计案例</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="5">合作方式</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="6">关注更多</Menu.Item>
              </Menu>
            </div>
          </Header>

          <Content style={{marginTop:128, width: '100%', textAlign: 'center'}}>
            <img src="http://47.92.126.195:80/image/u108.png"/>
            <Card style={{zIndex:0}}>
              <Card title={<span><Icon type="question-circle-o"/>&nbsp;&nbsp;关于我们</span>} style={{marginBottom:24}}>
                <img src="http://47.92.126.195:80/image/u110.png"/>
              </Card>
              <Card title={<span><img style={{width:'2%'}} src="http://47.92.126.195:80/image/u2327.png"/>&nbsp;&nbsp;学术交流</span>} style={{marginBottom:24}}>
                <img src="http://47.92.126.195:80/image/u110.png"/>
              </Card>
              <Card title={<span><img src="http://47.92.126.195:80/image/u26.png"/>&nbsp;&nbsp;科研成果</span>} style={{marginBottom:24}}>
                <img src="http://47.92.126.195:80/image/u110.png"/> 
              </Card>
              <Card title={<span><img src="http://47.92.126.195:80/image/u26.png"/>&nbsp;&nbsp;设计案例</span>} style={{marginBottom:24}}>
                <img src="http://47.92.126.195:80/image/u2699.png"style={{width:'20%'}}/>
              </Card>
              <Card title={<span><img src="http://47.92.126.195:80/image/u34.png"/>&nbsp;&nbsp;合作方式</span>}>
                <img src="http://47.92.126.195:80/image/u2443.png"style={{width:'50%'}}/>
              </Card>
              <Card title={<span><img src="http://47.92.126.195:80/image/u34.png"/>&nbsp;&nbsp;关注更多</span>}>
                <img src="http://47.92.126.195:80/image/u2416.png"style={{width:'50%'}}/> 
              </Card>
            </Card>
          </Content>
        </Layout>  
      </div>
    );
  }
}

