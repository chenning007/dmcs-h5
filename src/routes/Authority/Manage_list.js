import React, { PureComponent } from 'react';
import {Card, List, Button, Icon, Row, Col} from 'antd';
import {connect} from 'dva';
import { routerRedux, Route, Switch } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const source_data = [
    { id:1, title: 'DMCS简介-管理'},
    { id:2, title: '解决方案-管理'},
    { id:3, title: '科研成果-管理'},
    { id:4, title: '设计案例-管理'},
    { id:5, title: '合作方式-管理'},
    { id:6, title: '软件下载-管理'},
    { id:7, title: '资料下载-管理'},
    { id:8, title: '合作规则-管理'},
    { id:9, title: '合作留言-管理'},
]
@connect()
export default class Manage_list extends PureComponent {
    state = {
        condition: 0,
        data: [],
        loading: false,
        bu_status: false,
    }
    componentWillUnmount() {
        this.setState({
            condition: 0,
            data: [],
            loading: false,
            bu_status: false,
        });
    }
    set_condition = (condition) => {
        //这里需要完成路由操作；
        //只需要完成路由操作
        const { dispatch } = this.props;
        this.setState({condition:condition});
        if(condition && condition <10 ){
            dispatch(routerRedux.push({
                pathname: `manage_file`,
                state: {
                    id: source_data[condition-1].id,
                    title: source_data[condition-1].title,
                }
            }));
        } //跳转到文档上传页面当中
        if(condition===10){
            dispatch(routerRedux.push(`manage_group`));
        } //跳转到权限管理页面当中
    }
    judge_button (user , rank) {
        return false;
    }
    show_content(){
        const { condition } = this.state;
        if(condition===0) {
            return (
            <Row>
            <Col xl={2} lg={24} md={24} sm={24} xs={24}></Col>
            <Col xl={20} lg={24} md={24} sm={24} xs={24}>
            <List
                loading={this.state.loading} 
                grid={{ gutter: 20, column:1}}
                itemLayout='horizontal' dataSource={source_data}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <Card style={{textAlign: 'center'}}>
                        < Button type='primary' block='true' onClick={() => this.set_condition(item.id)} 
                          disabled={this.judge_button('admin',item.id)}
                        >
                            {item.title}
                        </Button>
                        </Card>  
                    </List.Item>
                )}
            />
            <Card style={{textAlign: 'center'}}>
               <Button type='primary'size='large' disabled={this.judge_button('admin', 10)}>
                  进入权限管理
               </Button> 
            </Card>
            </Col>
            </Row>
            );
        }
        else {
            const { dispatch } = this.props;
            const { condition } = this.state;
            return (
                <div>
                    <Card extra={<Button type='primary' onClick={() => this.set_condition(0) }>
                        <Icon type="rollback" /></Button>}>
                        此处应有数据
                    </Card>
                </div>
            );
        }
    };
    render() {
        return(
            <PageHeaderLayout>
              {this.show_content()}
            </PageHeaderLayout>
        
        );
    }
}