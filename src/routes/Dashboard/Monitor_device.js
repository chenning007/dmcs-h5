import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip, Input, Avatar, Button, Slider, InputNumber, Icon } from 'antd';
import numeral from 'numeral';

import { Pie, WaterWave, Gauge, TagCloud } from '../../components/Charts';
import NumberInfo from '../../components/NumberInfo';
import CountDown from '../../components/CountDown';
import ActiveChart from '../../components/ActiveChart';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Monitor.less';

const targetTime = new Date().getTime() + 3900000;

/******* */
const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
};
/****** */

const device = [{
  key: 1,
  title:'温度',
},{
  key: 2,
  title:'压力',
}
];


@connect(state => ({
  monitor: state.monitor,
}))
export default class Monitor_device extends PureComponent {
  state = {
    inputValue: 37,
    device_length : 2,
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'monitor/fetchTags',
    });
  }
  /****** */
  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  }
  /****** */
  onchangeDevice = () => {
    device.push({
      key: device.length + 1,
      title : ((device.length + 1) % 2 ? '温度': '压力'),
    });
    this.setState({device_length: this.state.device_length+1,});
  }
  /****** */

  device_panel = (device_type, unit, value) => {
    return(
      <Gauge
        format={(val) => {
        switch (parseInt(val, 10)) {
          case 20:
            return '差';
          case 40:
            return '中';
          case 60:
            return '良';
          case 80:
            return '优';
          default:
            return '';
        }
        }}
        title={device_type}
        height={380}
        percent={value}
     />
    );
  }
  
/******** */
  render() {
    const { monitor } = this.props;
    const { tags } = monitor;

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
            style={{ width: 400 }}
          />
        </div>
    );

    return (
      <PageHeaderLayout
        //content={pageHeaderContent}
        //extraContent={extraContent}
      >
       <div>
          <Row gutter={24}>
            <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card title="设备监控" bordered={false}>
                <div className={styles.mapChart}>
                  <Card
                    style={{ marginBottom: 24 }}
                    bodyStyle={{ textAlign: 'center' }}
                    bordered={true}
                  >
                    {this.device_panel('', '2', this.state.inputValue)}
                  </Card>
                </div>
                <Button type="primary" icon="poweroff" 
                  onClick={this.enterIconLoading} >
                  开/关
                </Button>
                <Row>
                  <Col span={12}>
                    <Slider marks={marks}  onChange={this.onChange} value={this.state.inputValue} />
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={0}
                      max={100}
                      style={{ marginLeft: 16 }}
                      value={this.state.inputValue}
                      onChange={this.onChange}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card title="活动情况预测" style={{ marginBottom: 24 }} bordered={false}>
                <ActiveChart />
              </Card>
              <Card
                title="资源剩余"
                bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                bordered={false}
              >
                <WaterWave height={161} title="补贴资金剩余" percent={34} />
              </Card>
            </Col>
          </Row>
              {/*
                <Col xl={12} lg={24} sm={24} xs={24}>
                  <Card
                    title="各品类占比"
                    style={{ marginBottom: 24 }}
                    bordered={false}
                    className={styles.pieCard}
                  >
                    <Row gutter={4} style={{ padding: '16px 0' }}>
                      <Col span={8}>
                        <Pie
                          animate={false}
                          percent={28}
                          subTitle="中式快餐"
                          total="28%"
                          height={128}
                          lineWidth={2}
                        />
                      </Col>
                      <Col span={8}>
                        <Pie
                          animate={false}
                          color="#5DDECF"
                          percent={22}
                          subTitle="西餐"
                          total="22%"
                          height={128}
                          lineWidth={2}
                        />
                      </Col>
                      <Col span={8}>
                        <Pie
                          animate={false}
                          color="#2FC25B"
                          percent={32}
                          subTitle="火锅"
                          total="32%"
                          height={128}
                          lineWidth={2}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
                  <Card title="热门搜索" bordered={false}>
                    <TagCloud data={tags} height={161} />
                  </Card>
                </Col>
              */}
              {/*
                <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
                  <Card
                    title="资源剩余"
                    bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                    bordered={false}
                  >
                    <WaterWave height={161} title="补贴资金剩余" percent={34} />
                  </Card>
              </Col> */}
            {/* </Row>*/}
          <Card bordered={false} title='设备监控'>
            {
              device.map(item =>  (
                    <Card.Grid  key={item.key} >
                      {this.device_panel(item.title, '2', this.state.inputValue)}
                    </Card.Grid>)  
              )
            }
              <Card.Grid>
                <Button type="dashed" className={styles.button} onClick={() =>this.onchangeDevice() }>
                  <Icon type="plus" /> 新增面板
                </Button>
              </Card.Grid>
                  
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
