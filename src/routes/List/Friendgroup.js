import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Input, Button, Icon, Modal, Form } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditableLinkGroup from '../../components/EditableLinkGroup';
import { Radar } from '../../components/Charts';

import styles from './Friendgroup.less';

const FormItem = Form.Item;

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
  project: state.project,
  activities: state.activities,
  chart: state.chart, 
}))
export default class Friendgroup extends PureComponent {
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
        <List.Item key={item.id} actions={[<a>删除</a>]}>
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
      activities: { loading: activitiesLoading },
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
          {/*<div>交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</div>*/}
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
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="共享设备"
              bordered={false}
              //extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus"
               onClick={() => this.handleModalVisible(true)}
              >
               添加
              </Button>
              {
                notice.map(item => (
                  <Card.Grid className={styles.projectGrid} key={item.id}
                  >
                    <Card 
                    bodyStyle={{ padding: 0 }} 
                    bordered={false}
                    >
                      <Card.Meta
                        title={(
                          <div className={styles.cardTitle}>
                            <Avatar size="small" src={item.logo} />
                            {/*<Link to="/dashboard/monitor_device">{item.title}</Link>*/}
                          </div>
                        )}
                       // description={item.description}
                      />
                      <div className={styles.projectItemContent}>
                        <Link to="/dashboard/monitor_device">{item.member || ''}</Link>
                        {item.updatedAt && (
                          <span className={styles.datetime} title={item.updatedAt}>
                            {moment(item.updatedAt).fromNow()}
                          </span>
                        )}
                      </div>
                    </Card>
                  </Card.Grid>
                ))
              }
            </Card>
            <Modal
               title="添加设备"
               visible={modalVisible}
               onOk={this.handleAdd}
               onCancel={() => this.handleModalVisible()}
            >
             <FormItem
                 labelCol={{ span: 5 }}
                 wrapperCol={{ span: 15 }}
                 label="描述"
              >
                 <Input placeholder="请输入设备编号" onChange={this.handleAddInput} value={addInputValue} />
              </FormItem>
            </Modal>


            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="共享文件"
              bordered={false}
              //extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus"
               onClick={() => this.handleModalVisible(true)}
              >
               添加
              </Button>
              {
                notice.map(item => (
                  <Card.Grid className={styles.projectGrid} key={item.id}
                  >
                    <Card 
                    bodyStyle={{ padding: 0 }} 
                    bordered={false}
                    >
                      <Card.Meta
                        title={(
                          <div className={styles.cardTitle}>
                            <Avatar size="small" src={item.logo} />
                            {/*<Link to="/dashboard/monitor_device">{item.title}</Link>*/}
                          </div>
                        )}
                       // description={item.description}
                      />
                      <div className={styles.projectItemContent}>
                        <Link to="/dashboard/monitor_device">{item.member || ''}</Link>
                        {item.updatedAt && (
                          <span className={styles.datetime} title={item.updatedAt}>
                            {moment(item.updatedAt).fromNow()}
                          </span>
                        )}
                      </div>
                    </Card>
                  </Card.Grid>
                ))
              }
            </Card>
            <Modal
               title="上传文件"
               visible={modalVisible}
               onOk={this.handleAdd}
               onCancel={() => this.handleModalVisible()}
            >
             <FormItem
                 labelCol={{ span: 5 }}
                 wrapperCol={{ span: 15 }}
                 label="描述"
              >
                 <Input placeholder="请输入文件编号" onChange={this.handleAddInput} value={addInputValue} />
              </FormItem>
            </Modal>


           <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="共享成员"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>
                 {/*<Link to="/dashboard/analysis">{this.renderActivities()} </Link>*/}
                       {this.renderActivities()} 
                </div>
              </List>
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
