import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Input, Button, Icon, Modal, Form } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditableLinkGroup from '../../components/EditableLinkGroup';
import { Radar } from '../../components/Charts';

import styles from './Workplace.less';

const FormItem = Form.Item;


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
  project: state.project,
  activities: state.activities,
  chart: state.chart, 
}))
export default class Workplace extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchNotice',
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
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
      activities: { list },
    } = this.props;
    return list.map((item) => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
   //      if (item[key]) {
   //       return <a href={item[key].link} key={item[key].name}>{item[key].name}</a>;
  //      }
        return key;
     });
      return (
        <List.Item key={item.id}>
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
      project: { loading: projectLoading, notice },
      activities: { loading: activitiesLoading, list },
      chart: { radarData },
    } = this.props;
    const { modalVisible, addInputValue } = this.state;


    return (
      <div>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="我的设备"
              bordered={false}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {
                notice.map(item => (
                  <Card.Grid className={styles.projectGrid} key={item.id}
                  >
                  <Row>
                    <Col xl={4} lg={4} md={4} sm={4} xs={4}/>
                    <Col xl={16} lg={16} md={16} sm={16} xs={16}>
                    <Card 
                    bodyStyle={{ padding: 10 }} 
                    bordered={false}
                    >
                      <Card.Meta
                        title={(
                          <div className={styles.cardTitle}>
                            <Link to="/dashboard/monitor_device"><Avatar size="large" src={item.logo}/></Link>
                            {/*<Link to="/dashboard/monitor_device">{item.title}</Link>*/}
                          </div>
                        )}
                       // description={item.description}
                      />
                      <div className={styles.projectItemContent}>
                        <Link to="/dashboard/monitor_device">{item.member || ''}</Link>
                       {/* {item.updatedAt && (
                          <span className={styles.datetime} title={item.updatedAt}>
                            {moment(item.updatedAt).fromNow()}
                          </span>
                        )}
                      */}
                      </div>
                    </Card>
                    </Col>
                  </Row>
                  </Card.Grid>
                ))
              }
            </Card>
           <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.projectList}
              title="共享设备"
              loading={activitiesLoading}
            >
            {
                list.map(item => (
                  <Card.Grid className={styles.projectGrid} key={item.id}
                  >
                  <Row>
                    <Col xl={4} lg={4} md={4} sm={4} xs={4}/>
                    <Col xl={16} lg={16} md={16} sm={16} xs={16}>
                    <Card 
                    bodyStyle={{ padding: 10 }} 
                    bordered={false}
                    >
                      <Card.Meta
                        title={(
                          <div className={styles.cardTitle}>
                            <Avatar size="large" src={item.logo} />
                            {/*<Link to="/dashboard/monitor_device">{item.title}</Link>*/}
                          </div>
                        )}
                       // description={item.description}
                      />
                      <div className={styles.projectItemContent}>
                        <Link to="/dashboard/monitor_device">{item.member || ''}</Link>
                       {/* {item.updatedAt && (
                          <span className={styles.datetime} title={item.updatedAt}>
                            {moment(item.updatedAt).fromNow()}
                          </span>
                        )}
                      */}
                      </div>
                    </Card>
                    </Col>
                  </Row>
                  </Card.Grid>
                ))
              }
            </Card>
  
          </Col>
        </Row>
      </div>
    );
  }
}
