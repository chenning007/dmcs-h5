import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { routerRedux, Route, Switch } from 'dva/router';
import { Row, Col, Card, Table, Icon, Divider, Menu, Dropdown,Button,message, Avatar, Input } from 'antd';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content} = Layout ;
const {Meta} = Card;

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
const design_exam = [{
  key: 1, 
  src: 'http://47.92.126.195:80/image/shili1.png',
  description: 'IPT70135/6/7测控节点电路封装盒',},{
  key: 2,
  src: 'http://47.92.126.195:80/image/shili2.png',
  description: 'IPT10533/10550 3.3V/5.0V输出非隔离式电源转换模块',},{
  key: 3,
  src: 'http://47.92.126.195:80/image/shili3.png',
  description: 'IPT12105 IPCAN总线供电转换模块',
  },{
  key: 4,
  src: 'http://47.92.126.195:80/image/shili4.png',
  description: 'IPT22105/22106 IPCAN电源转换节点', 
  },{
  key: 5,
  src: 'http://47.92.126.195:80/image/shili5.png',  
  description: 'IPT70540 PCB表贴植锡丝印台',
  }
];
 
const Search = Input.Search;

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
            <img style={{marginLeft:-56,}} src="http://47.92.126.195:80/image/u110.png" alt='logo'/>
            <div style={{float: 'right'}} >
              <Button type='primary' onClick={()=>this.changeRouterLogin()}>登录</Button>
              <Divider type='vertical'/>
              <Button type='primary' /*style={{marginRight:0}}*/ onClick={()=>this.changeRouterRegister()}>注册</Button>
              <Search
                placeholder="input search text"
                style={{width:'40%',marginLeft:120}}/> 
            </div>
            {/*<Search
              placeholder="input search text"
              style={{width:'20%',marginLeft:160}} 
            />*/}
          </Header>
          <Header style={{position: 'fixed', marginTop:60 ,width:'100%' ,zIndex:1 , background:'#ffffff'}}>
            <div>
              <Menu
                theme="black"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="1">DMCS简介</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="2">解决方案</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="3">科研成果</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="4">设计案例</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="5">合作方式</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="6">更多</Menu.Item>
              </Menu>
            </div>
          </Header>

          <Content style={{marginTop:128, width: '100%', /*textAlign: 'center'*/}}>
            <img src="http://47.92.126.195:80/image/u108.png" style={{width:'100%'}}/>
            <div style={{zIndex:0}}>
              <div style={{ background:'#f0f2f5', }} >
                <div style={{fontSize:24,marginBottom:4, marginLeft:4}}><Icon type="question-circle-o"/>&nbsp;&nbsp;设计案例</div>
                {/*<img style={{marginBottom:20, marginLeft:4}}src="http://47.92.126.195:80/image/u110.png" alt='picture'/>*/}
                {design_exam.map(item=>(
                  <Card id ={item.key} cover={<img alt='cover' src={item.src}/>}>
                    <Meta description={item.description}
                    />
                  </Card>
                ))}

              </div>
              <div style={{background:'#ffffff'}}>
                <div style={{fontSize:24,marginBottom:4, marginLeft:4}}>
                  <img style={{ width:'2%'}} src="http://47.92.126.195:80/image/u2327.png"/>
                  &nbsp;&nbsp;学术交流
                </div>
                <img style={{marginBottom:20, marginLeft:4,}}src="http://47.92.126.195:80/image/u110.png"/>
              </div>
              <div style={{ background:'#f0f2f5'}}>
                <div style={{fontSize:24,marginBottom:4, marginLeft:4}}>
                  <img style={{ width:'2%'}} src="http://47.92.126.195:80/image/u26.png"/>
                  &nbsp;&nbsp;科研成果
                </div>
                <img style={{marginBottom:20, marginLeft:4,}}src="http://47.92.126.195:80/image/u110.png"/>
              </div>
              <div style={{ background:'#ffffff'}}>
                <div style={{fontSize:24,marginBottom:4, marginLeft:4}}>
                  <img src="http://47.92.126.195:80/image/u26.png"/>
                  &nbsp;&nbsp;设计案例
                </div>
                <img src="http://47.92.126.195:80/image/u2699.png" style={{marginBottom:20, marginLeft:4,width:'20%'}}/>
              </div>
              <div style={{ background:'#f0f2f5'}}>
                <div style={{fontSize:24,marginBottom:4, marginLeft:4}}>
                  <img src="http://47.92.126.195:80/image/u34.png"/>
                  &nbsp;&nbsp;合作方式
                </div>
                <img src="http://47.92.126.195:80/image/u2443.png" style={{marginBottom:20, marginLeft:4, width:'50%'}}/>
              </div>
            </div>
          </Content>
        </Layout>  
      </div>
    );
  }
}

