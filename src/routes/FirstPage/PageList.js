import React, { PureComponent } from 'react';
import { connect } from 'dva';

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

@connect(state=>({}))
export default class PageList extends PureComponent {
   
    /******** */
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
          case '2': {
            dispatch(routerRedux.push({
              pathname: 'pageinfo',
              state:{
                key:'2',
              }
            }));
            break;
          };
          /*case 3: {
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
          };*/
          default: break;
        }
    }
    /******* */
    content(key) {
       if(key!==undefined){
            /*** */
            switch(key){
                case '2':{
                    return (
                        <Card>
                            解决方案
                        </Card>
                    );
                    break;
                }
                case '3':{
                    return (
                        <Card>
                            科研成果
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
                            科研成果
                        </Card>
                    );
                    break;}
                case '6':{
                    return (
                        <Card>
                            科研成果
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

    redener() {
        const { key ='1' } = this.props.location.state === undefined ? '1':this.props.location.state ;
        return (
            <Layout>
                <Header style={{position: 'fixed', marginTop:8 ,width:'100%' ,zIndex:1 , background:'#ffffff'}}>
                    <div>
                        <Menu
                            theme="black"
                            mode="horizontal"
                            defaultSelectedKeys={[key]}
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
                                {this.content(key)}
                            </Col>
                            <Col xl={2} lg={12} md={12} sm={24} xs={24}/>
                        </Row>
                    </div>
                </Content>    
            </Layout>
        )
    }
}