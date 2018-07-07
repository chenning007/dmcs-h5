import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { routerRedux, Route, Switch } from 'dva/router';
import { Row, Col, Card, Table, Icon, Divider, Menu, Dropdown, Button, Input, List } from 'antd';
import { Layout } from 'antd';
import styles from './FirstPage.less';
const { Header, Footer, Sider, Content} = Layout ;
const {Meta} = Card;

/*const columns = [{
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
}];*/
const design_exam = [{
  key: 1, 
  src: 'http://47.92.126.195:80/image/shili1.png',
  description: 'IPT70135/6/7测控节点电路封装盒',},{
  key: 2,
  src: 'http://47.92.126.195:80/image/shili2.png',
  description: 'IPT10533/10550 3.3V/5.0V非隔离式电源转换模块',},{
  key: 3,
  src: 'http://47.92.126.195:80/image/shili3.png',
  description: 'IPT12105 IPCAN总线供电转换模块',
  },{
  key: 4,
  src: 'http://47.92.126.195:80/image/shili4.png',
  description: 'IPT22105/22106 IPCAN电源转换节点', 
  },/*{
  key: 5,
  src: 'http://47.92.126.195:80/image/shili5.png',  
  description: 'IPT70540 PCB表贴植锡丝印台',
  }*/
];
 

const Search = Input.Search;

/*function trans_description(description) {
　return(
  <div style={{display:, WebkitLineClamp:2,}}>
    {description}
  </div>
);
}*/
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
  /***************************/
  loadmore(type) {
    const { dispatch }=this.props;
    switch(type){
      case 1: {
        dispatch(routerRedux.push({
          pathname: 'pagelist',
          state:{
            key: '4',
            content: 'no',
          }
        }));
      };
      case 2: {
        dispatch(routerRedux.push({
          pathname: 'pagelist',
          state:{
            key: 2,
          }
        }));
      };
      case 3: {
        dispatch(routerRedux.push({
          pathname: 'pagelist',
          state:{
            key: 3,
          }
        }));
      };
      case 4: {
        dispatch(routerRedux.push({
          pathname: 'pagelist',
          state:{
            key: 4,
          }
        }));
      };
    }
  }
  
  Menu_key = (e) => {
    const { dispatch } = this.props;

    switch(e.key){
      case '2': {
        dispatch(routerRedux.push({
          pathname: 'pageinfo',
          state:{
            key:'2',
          }
        }));
        break;
      };
      case 3: {
        dispatch(routerRedux.push({
          pathname: 'pagelist',
          state:{
            key:'3',
          }
        }));
        break;
      };
      case 4: {
        dispatch(routerRedux.push({
          pathname: 'pagelist',
          state:{
            key:'4',
          }
        }));
        break;
      };
      default: break;
    }
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
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
                onClick={this.Menu_key}
              >
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key='1'>DMCS简介</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key='2'>解决方案</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key='3'>科研成果</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="4">设计案例</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="5">合作方式</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="6">更多</Menu.Item>
              </Menu>
            </div>
          </Header>

          <Content style={{marginTop:128, width: '100%', textAlign: 'center'}}>
            <img src="http://47.92.126.195:80/image/u108.png" style={{width:'100%'}}/>
            <div style={{zIndex:0}}>
              <div style={{ background:'#f0f2f5', }} >
                <div style={{marginBottom: 8, marginTop: 16 }}>
                  <span style={{fontSize:28}}><Icon type="question-circle-o"/>&nbsp;&nbsp;设计案例</span>
                  <span style={{float:'right' ,marginRight: 16}}>
                    <div>
                      <Button type='primary' onClick={() => this.loadmore(1)}>
                        <Icon type="plus" />
                        更多
                      </Button>
                    </div>
                  </span>
                </div>  
                <Row>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24}>
                    <Card bordered={false}/>
                  </Col>
                  <Col xl={20} lg={12} md={12} sm={24} xs={24}>
                    <List 
                    grid={{ gutter: 16, lg: 4, md: 2, sm: 1, xs: 1 }}
                    dataSource={design_exam}
                    renderItem={item => (
                    <List.Item key={item.key}>
                      <Card cover={<img alt='cover' src={item.src}/>}>
                        <Meta description={ item.description}/>
                      </Card>
                    </List.Item>)}  
                    />
                  </Col>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24}/>
                </Row>
              </div>
              <div style={{background:'#ffffff'}}>
                <div style={{fontSize:28,marginBottom: 8, marginTop: 16 }}>
                  <img style={{ width:'2%'}} src="http://47.92.126.195:80/image/u2327.png"/>
                  &nbsp;&nbsp;学术交流
                </div>
                <Row>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24} />
                  <Col xl={20} lg={12} md={12} sm={24} xs={24}>
                    <List 
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={design_exam}
                    renderItem={item => (
                    <List.Item key={item.key}>
                      <Card cover={<img alt='cover' src={item.src}/>}>
                        <Meta description={ item.description}/>
                      </Card>
                    </List.Item>)}
                    />
                  </Col>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24}/>
                </Row>
              </div>
              <div style={{ background:'#f0f2f5'}}>
                <div style={{fontSize:28,marginBottom: 8, marginTop: 16 }}>
                  <img style={{ width:'2%'}} src="http://47.92.126.195:80/image/u26.png"/>
                  &nbsp;&nbsp;科研成果
                </div>
                <Row>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24} />
                  <Col xl={20} lg={12} md={12} sm={24} xs={24}>
                    <List 
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={design_exam}
                    renderItem={item => (
                    <List.Item key={item.key}>
                      <Card cover={<img alt='cover' src={item.src}/>}>
                        <Meta description={ item.description}/>
                      </Card>
                    </List.Item>)}
                    />
                  </Col>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24}/>
                </Row>
              </div>
              <div style={{ background:'#ffffff'}}>
                <div style={{fontSize:28,marginBottom: 8, marginTop: 16 }}>
                  <img src="http://47.92.126.195:80/image/u26.png"/>
                  &nbsp;&nbsp;设计案例
                </div>
                <Row>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24} />
                  <Col xl={20} lg={12} md={12} sm={24} xs={24}>
                    <List 
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={design_exam}
                    renderItem={item => (
                    <List.Item key={item.key}>
                      <Card cover={<img alt='cover' src={item.src}/>}>
                        <Meta description={item.description}/>
                      </Card>
                    </List.Item>)}
                    />
                  </Col>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24}/>
                </Row>
              </div>
              <div style={{ background:'#f0f2f5'}}>
                <div style={{fontSize:28,marginBottom: 8, marginTop: 16 }}>
                  <img src="http://47.92.126.195:80/image/u34.png"/>
                  &nbsp;&nbsp;合作方式
                </div>
                <Row>
                  <Col xl={2} lg={12} md={12} sm={24} xs={24} />
                  <Col xl={20} lg={12} md={12} sm={24} xs={24}>
                    <List 
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={design_exam}
                    renderItem={item => (
                    <List.Item key={item.key}>
                      <Card cover={<img alt='cover' src={item.src}/>}>
                        <Meta description={item.description}/>
                      </Card>
                    </List.Item>)}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Content>
        </Layout>  
      </div>
    );
  }
}

