import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip, Input, Avatar, Button, Slider, InputNumber, Icon, Menu, Dropdown } from 'antd';
import numeral from 'numeral';

import { Pie, WaterWave, Gauge, TagCloud } from '../../components/Charts';
import NumberInfo from '../../components/NumberInfo';
import CountDown from '../../components/CountDown';
import ActiveChart from '../../components/ActiveChart';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Monitor_device.less';

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

const equipment = [
];


@connect(state => ({
  monitor: state.monitor,
}))
export default class Monitor_device extends PureComponent {
  state = {
    inputValue: 37,
    device_length : 2,
    equipment_length: 0,

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
  onchangeEquipment = (type) => {
    //在这里进行判断返回的equipment是否有值
    equipment.push({
      key: equipment.length + 1,
      type: type,
      position: '',
      node: '',
    });
    this.setState({equipment_length: this.state.equipment_length+1,});
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
handleMenuClick = (e) => {
  this.onchangeEquipment(e.key);
}

extraContent() {
  const menu = (
    <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
      <Menu.Item key="swift">
        开关 
      </Menu.Item>
      <Menu.Item key="slider">
        滑条
      </Menu.Item>
      <Menu.Item key="panel">
        表盘
      </Menu.Item>
    </Menu>
   );   //正常情况下
   return (
     <div > 
      <Dropdown overlay={menu}>
        <Button>
          添加 <Icon type="down" />
        </Button>
      </Dropdown>
     </div>    
   );   
 }
/******* */
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
          <Card bordered={false} title='设备监控' style={{marginBottom:24}}>
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
          <Card extra={this.extraContent()}>
            { equipment.length>0
              &&
              equipment.map(item=> (
                <Card key={item.key} className={styles.card}>
                  { item.type === 'swift'
                    &&
                    <Button type="primary" icon="poweroff" 
                      onClick={this.enterIconLoading} >
                      开/关
                    </Button>
                  }
                  { item.type === 'slider'
                    &&
                    <Slider marks={marks}  /*onChange={this.onChange}*/ value={this.state.inputValue} />
                  }
                  { item.type === 'panel'
                    &&
                    <div>
                      { this.device_panel('', '2', this.state.inputValue)} 
                    </div>
                  }
                </Card>
              ))

            }
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
