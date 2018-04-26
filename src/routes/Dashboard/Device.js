import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Input, Button, Icon, Modal, Form } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditableLinkGroup from '../../components/EditableLinkGroup';
import { Radar } from '../../components/Charts';

import styles from './Device.less';

const FormItem = Form.Item;

@connect(state => ({
  project: state.project,
  activities: state.activities,
  chart: state.chart, 
}))
export default class Device extends PureComponent {
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
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>早安，蔡志军，祝你开心每一天！</div>
        </div>
      </div>
    );

    const extraContent = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          //onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    return (
      <PageHeaderLayout
      >
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
                        <Button ghost={true} className={styles.button} 
                          href="/#/dashboard/monitor_device"
                        >
                            <Row>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4}/>
                                <Col xl={16} lg={16} md={16} sm={16} xs={16}>
                                    <Card 
                                    bodyStyle={{ padding: 0}} 
                                    bordered={false}
                                    >
                                    <Card.Meta
                                        title={(
                                        <div className={styles.cardTitle}>
                                            <Avatar size="large" src={item.logo}/>
                                        </div>
                                        )}
                                        // description={item.description}
                                    />
                                        <div className={styles.projectItemContent}>
                                            <Link to="/dashboard/monitor_device">{item.member || ''}</Link>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Button>
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
      </PageHeaderLayout>
    );
  }
}
