import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { routerRedux, Route, Switch } from 'dva/router';
import { Row, Col, Card, Table, Icon, Divider, Menu, Dropdown, Button, Input, List } from 'antd';
import { Layout } from 'antd';
import styles from './FirstPage.less';
const { Header, Footer, Sider, Content} = Layout ;
const {Meta} = Card;

@connect(state=>({}))
export default class Pageinfo extends PureComponent {
    /**this.props.location.state. */
    /********* */
    Menu_key(e) {
        const { dispatch } = this.props;
        switch(e.key){
          case 1: {
            dispatch(routerRedux.push({
              pathname: 'user/pageinfo',
              state:{
                key:1,
              }
            }));
          };
          case 2: {
            dispatch(routerRedux.push({
              pathname: 'user/pagelist',
              state:{
                key:2,
              }
            }));
          };
          case 3: {
            dispatch(routerRedux.push({
              pathname: 'user/pagelist',
              state:{
                key:3,
              }
            }));
          };
          case 4: {
            dispatch(routerRedux.push({
              pathname: 'user/pagelist',
              state:{
                key:4,
              }
            }));
          };
        }
    }

    render() {
        const { key = 1 } = this.props.location.state===undefined ? 1:this.props.location.state;
        return(
            <Layout>
                <Header style={{position: 'fixed', marginTop:8 ,width:'100%' ,zIndex:1 , background:'#ffffff'}}>
                    <div>
                        <Menu
                            theme="black"
                            mode="horizontal"
                            defaultSelectedKeys={[`key`]}
                            style={{ lineHeight: '64px' }}
                            onClick={this.Menu_key}
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

                <Content style={{marginTop:80, width: '100%', textAlign: 'center'}}>
                    <div style={{zIndex:0, background:'#f0f2f5',}}>
                        <Row>
                            <Col xl={2} lg={12} md={12} sm={24} xs={24}>
                                <Card bordered={false}/>
                            </Col>
                            <Col xl={20} lg={12} md={12} sm={24} xs={24}>
                                <Card title='DMCS简介'>
                                   本网站由清华大学DMCS(Distributed Measurement & Control System)课题组主办，目的在于课题组的新技术推广和实质性学术交流。
                                   清华大学DMCS课题组长期从事分布式测控系统及其相关技术研究。经过多年的坚持和努力，基于课题组曾提出的"IPT (Information Pipe Technology)"信息管道技术，研制出了IPT系列多种新技术产品，可满足多数新型分布式测控系统的设计和应用需求。在热、机、电等应用领域的分布式测控技术方面，有望探索出一条技术和市场高度相结合的科技发展道路。欢迎更多的有识之士支持或加入我们团队。  
                                </Card>
                            </Col>
                            <Col xl={2} lg={12} md={12} sm={24} xs={24}/>
                        </Row>
                    </div>
                </Content>
            </Layout>
        );
    }
}