import React, { PureComponent } from 'react';
import {Card, List, Button, Icon} from 'antd';
import {connect} from 'dva';
@connect()
export default class Manage_list extends PureComponent {
    state = {
        condition: 0,
        data: [],
    }
    set_condition (condition){
        this.setState({condition: condition});
    }
    show_content(){
        const { condition } = this.state;
        if(condition===0) {
            return (
            <div>
                <Button type='primary' onClick={() => this.set_condition(1)}>
                    DMCS简介
                </Button>
                <Button type='primary' onClick={() => this.set_condition(2)}>
                    解决方案
                </Button>
                <Button type='primary' onClick={() => this.set_condition(3)}>
                    科研成果
                </Button>
                <Button type='primary' onClick={() => this.set_condition(4)}>
                    设计案例
                </Button>
                <Button type='primary' onClick={() => this.set_condition(5)}>
                    合作方式
                </Button>
                <Button type='primary' onClick={() => this.set_condition(6)}>
                    软件下载
                </Button>
                <Button type='primary' onClick={() => this.set_condition(7)}>
                    资料下载
                </Button>
                <Button type='primary' onClick={() => this.set_condition(8)}>
                    合作规则
                </Button>
                <Button type='primary' onClick={() => this.set_condition(9)}>
                    合作留言
                </Button>
            </div>
            );
        }
        else {
            const { dispatch } = this.props;
            const {condition} = this.state;
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
            <div>
              {this.show_content()}
            </div>
        
        );
    }
}