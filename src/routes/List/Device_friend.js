import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Input, Button, Icon, Modal, Form, Popconfirm, Select } from 'antd';

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

 /**** */ 
  renderActivities() {
    const {
      activities: { list_activities },
    } = this.props;
　　 const default_action = (
      <div>
        <Select defaultValue="权限设置" style={{ width: 120 }} >
          <Option value="１">权限1</Option>
          <Option value="２">权限2</Option>
          <Option value="３" >权限3</Option>
          <Option value="４">权限4</Option>
          <Option value="５">权限5</Option>
          <Option value="６">权限6</Option>
          <Option value="７" >权限7</Option>
          <Option value="makebyself">自定义</Option>
        </Select>
      </div>
    );

    return list_activities.map((item) => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
   //      if (item[key]) {
   //       return <a href={item[key].link} key={item[key].name}>{item[key].name}</a>;
  //      }
        return key;
     });
      return (
        <List.Item key={item.id} /*actions={[<a>设置</a>, 
            <Popconfirm title="是否要删除此行？">
               <a>删除</a>
            </Popconfirm>]}*/
            actions={[default_action]}
        >
          <List.Item.Meta
            avatar={<Link to="/dashboard/monitor_device">{<Avatar src={item.user.avatar} /> }</Link>}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      activities: { loading: activitiesLoading },
      form,
    } = this.props;
    
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const extraContent = (
      <div className={styles.extraContent}>
      <div className={styles.statItem} >
         <Icon type="minus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/>
      </div>
      <div className={styles.statItem}> 
         <Icon type="plus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} />
      </div>
      </div>
    );

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
              extra={extraContent}
              style={{ marginBottom: 24 }} 
            >
              <List loading={activitiesLoading} size="large">
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
          
      {/*   <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup
                onAdd={() => {}}
                links={links}
                linkElement={Link}
              />
            </Card>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="XX 指数"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
            </Card>
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="团队"
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {
                    members.map(item => (
                      <Col span={12} key={`members-item-${item.id}`}>
                        <Link to={item.link}>
                          <Avatar src={item.logo} size="small" />
                          <span className={styles.member}>{item.title}</span>
                        </Link>
                      </Col>
                    ))
                  }
                </Row>
              </div>
            </Card>
                </Col>*/}
        </Row>
    );
  }
}
