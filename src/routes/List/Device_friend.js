import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Input, Button, Icon, Modal, Form, Popconfirm, Select, Tooltip } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditableLinkGroup from '../../components/EditableLinkGroup';
import { Radar } from '../../components/Charts';

import styles from './Device_friend.less';

const FormItem = Form.Item;
const Option=Select.Option;

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

const members = [
  {
    id: 'members-1',
    title: '科学搬砖组',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    link: '',
  },
  {
    id: 'members-2',
    title: '程序员日常',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
    link: '',
  },
  {
    id: 'members-3',
    title: '设计天团',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
    link: '',
  },
  {
    id: 'members-4',
    title: '中二少女团',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
    link: '',
  },
  {
    id: 'members-5',
    title: '骗你学计算机',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
    link: '',
  },
];

@connect(state => ({
  activities: state.activities,
}))

@Form.create()
export default class Device_friend extends PureComponent {
  state={
    title_condition: 1,
    content_condition: 0,
  }
  componentDidMount() {
    const { dispatch } = this.props;
  //  dispatch({
  //    type: 'project/fetchNotice',
  //  });
    dispatch({
      type: 'activities/fetchList',
    });
   // dispatch({
   //   type: 'chart/fetch',
  //  });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    this.setState({
      title_condition: 1,
      content_condition: 0,
    })
    dispatch({
      type: 'activities/clear',
    });
  }
/**** */

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }
  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }
  onchangeCondition = () => {
    this.setState({
      title_condition: 2,
    });
  }
  resetCondition = () => {
    this.setState({
      title_condition: 1,
      content_condition: 0,
    });
  }
  contentCondition = (content_condition) =>{
    this.setState({content_condition: content_condition});
    this.onchangeCondition();
  }

  
  extraContent(titlecondition) {
     //const titlecondition = titlecondition;
     if(titlecondition===1){
        return (
                <div className={styles.extraContent}>  
                  <div className={styles.statItem}> 
                    <Tooltip title='权限管理'>
                      <a onClick={() => this.contentCondition(1)}>
                        <Icon type="setting" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} />
                      </a>
                    </Tooltip>
                  </div>
                  <div className={styles.statItem} >
                    <Tooltip title='删除人员'>
                      <a onClick={() => this.contentCondition(2)}>
                        <Icon type="minus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/>
                      </a>
                    </Tooltip>
                  </div>
                  <div className={styles.statItem} > 
                    <Tooltip title='添加人员'>
                      <a onClick={()=> this.contentCondition(3)}>
                        <Icon type="plus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} />
                      </a>
                    </Tooltip>
                  </div>
                </div>
            );
    }
    if(titlecondition===2){
      return (
        <div className={styles.extraContent}>  
          <div className={styles.statItem}> 
            <Tooltip title='权限管理'>
              <Button type='primary' 
                 size='large' onClick={()=>this.resetCondition()}
              >
                <Icon type="rollback" />
              </Button>
            </Tooltip>
          </div>
        </div>
    );
    }
    return ;
}


 /**** */ 
  renderActivities() {
    const {
      activities: { list_people },
    } = this.props;
    const {content_condition} =　this.state;
      switch(content_condition){
        case 0 :{
          return list_people.map((item) => {
            return (
              <List.Item key={item.key}>
                <span>
                  <Avatar src={item.avatar}/>
                </span>
                <span style={{paddingLeft: 12, paddingTop: 6}}>{item.name}</span>  
              </List.Item>
            );
          });
        }
        case 1 :{
          return list_activities.map((item) => {
            return (
              <List.Item key={item.key} actions={[<Button type='primary'>保存</Button>]}>
                <span>
                <Avatar
                  src={item.avator} 
                  /*title={
                      <a className={styles.username}>{item.user.name}</a>*/
                /* }*/
                />
                </span>
                <span style={{paddingLeft: 12, paddingTop: 6}}>{item.name}</span>
                  
              </List.Item>
            );
          });
        }
        case 2 :{

        }
        case 3 :{

        }
        default: return;
    }
  }

  render() {
    const {
      activities: { loading: activitiesLoading },
      form,
    } = this.props;
    
    const { getFieldDecorator, getFieldValue } = this.props.form;

    /*const extraContent = (
      <div className={styles.extraContent}>  
        <div className={styles.statItem}> 
          <Tooltip title='权限管理'>
            <Icon type="setting" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} />
          </Tooltip>
        </div>
        <div className={styles.statItem} >
          <Tooltip title='删除人员'>
            <Icon type="minus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/>
          </Tooltip>
        </div>
        
        <div className={styles.statItem} > 
          <Tooltip title='添加人员'>
            <Icon type="plus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} />
          </Tooltip>
        </div>
      </div>
    );*/

    const formItemLayout = {
      labelCol: {
        xs: { span: 24, offset: -10 },
        sm: { span: 7 , offset: -10 }, 
      },
      wrapperCol: {
        xs: { span: 24, offset: 3},
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 10 },
      },
    };

    return (
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
           <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="共享成员"
              loading={activitiesLoading}
              extra={this.extraContent(this.state.title_condition)}
              style={{ marginBottom: 24 }} 
            >
              <List loading={activitiesLoading} size="large" 
                //itemLayout='vertical'
              >
                   <div className={styles.activitiesList}>
                      {this.renderActivities()} 
                   </div>
              </List>
            </Card>
             <Card 
                bordered={true}
                title="设备信息"
                style={{ marginBottom: 36 }}
             >
                <Row>
                <Col span={12}>
                <Form
                   //onSubmit={this.handleSubmit}
                   hideRequiredMark
                   style={{ marginTop: 8 }}
                >  
                <FormItem
                  {...formItemLayout}
                  label="设备id"
                >
                  {getFieldDecorator('id', {
                   initialValue: "2015000000",
                   rules: [{
                      required: false, 
                    }],
                  })(
                      <Input  size="large" placeholder="例如: 2015000000" disabled
                      />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="名称"
                >
                 {getFieldDecorator('number', {
                  initialValue: "conditionar",
                  rules: [{
                    required: false, 
                  }],
                })(
                    <Input  size="large" placeholder="例如: 2015000000" disabled
                    />
                  )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="日期"
                >
                 {getFieldDecorator('date', {
                  initialValue: "2017-08-01",
                  rules: [{
                    required: false, 
                  }],
                })(
                    <Input  size="large" placeholder="例如: 2015000000" disabled
                    />
                  )}
                </FormItem>  
                <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                  <Button type="primary" htmlType="submit" /*loading={submitting}*/>
                     保存
                  </Button>
                    {/*<Button style={{ marginLeft: 8 }}>保存</Button>*/}
                </FormItem>           
                </Form>
                </Col>
                </Row>
              </Card>
              <Card 
                style={{ marginBottom: 36 , textAlign: 'center' }}
              >
                <Button type="danger" htmlType="submit" size="large"/*loading={submitting}*/>
                    权限转让
                </Button> 
             </Card>
              <Card style={{ textAlign: 'center' }}>
                 <Button type="danger" htmlType="submit" size="large"/*loading={submitting}*/>
                    删除并退出
                  </Button>   
              </Card>
            </Col>    
                 {/*       */}
        </Row>
    );
  }
}
