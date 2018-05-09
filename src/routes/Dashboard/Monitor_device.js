import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip, Input, Avatar, Button, Slider, InputNumber, Icon, Menu, Dropdown, Divider } from 'antd';
import numeral from 'numeral';

import { Pie, WaterWave, Gauge, TagCloud } from '../../components/Charts';
import NumberInfo from '../../components/NumberInfo';
import CountDown from '../../components/CountDown';
import ActiveChart from '../../components/ActiveChart';
import Dragger from '../../components/Dragger';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';


import styles from './Monitor_device.less';

import './Monitor_device.less';

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
    equipment_length: 0,
    canvas_height: 1000,
    equipment: [{
      key: 1,
      type: 'swift',
      position_x: 550,
      position_y: 340,
      range: null,
      measurement: '',
      node: '',   //存储节点 
    },{
      key: 2,
      type: 'slider',
      position_x: 570,
      position_y: 290,
      range: null,
      measurement: '',
      node: '',   //存储节点 
    },{
      key: 3,
      type: 'panel',
      position_x: 550,
      position_y: 50,
      range: null,
      measurement: '',
      node: '',   //存储节点 
    },{
      key: 4,
      type: 'input',
      position_x: 810,
      position_y: 340,
      range: null,
      measurement: '',
      node: '',   //存储节点 
    },
    ],
    //存储临时的各变量的位置信息
    temporary_position: [{ 
      key: 1,
      temporary_x: null,
      temporary_y: null,     
    },{
      key: 2,
      temporary_x: null,
      temporary_y: null,     
    },{
      key: 3,
      temporary_x: null,
      temporary_y: null,     
    },{
      key: 4,
      temporary_x: null,
      temporary_y: null,     
    },
    ],
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'monitor/fetchTags',
    });
  }
  /****** */
  /****** */
  onchangeEquipment = (type) => {
    //在这里进行判断返回的equipment是否有值
    this.state.equipment.push({
      key: this.state.equipment.length + 1,
      type: type,
      position_x: 0,
      position_y: 0,
      range: null,
      measurement: null,
      node: '',
    });
    this.state.temporary_position.push({
      key: this.state.temporary_position.length + 1,
      temporary_x: null,
      temporary_y: null,
    });
    this.setState({equipment_length: this.state.equipment_length+1,});
  }
  /****** */

  /*device_panel = (device_type, unit, value) => {
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
        height={240}
        percent={value}
     />
    );
  }*/
  //改变画布的大小
  changecanvas_height = (type) =>{
    if(type){
      this.setState({ canvas_height: this.state.canvas_height + 100,})
    }
    else {
      if(this.state.canvas_height > 500){
        this.setState({ canvas_height: this.state.canvas_height - 100,})
      }
    }
  }
 /******** */
  handleMenuClick = (e) => {
    this.onchangeEquipment(e.key);
  }
  condition = (e) => {
    if(e !==undefined){
      let element = {key: e.key, temporary_x: e.x, temporary_y: e.y};
      this.state.temporary_position.splice(e.key-1,1,element);
    }
    console.log(this.state.temporary_position);
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
        <Menu.Item key="input">
          输入
        </Menu.Item>
      </Menu>
    );   //正常情况下
    return (
      <div>
        <Button type='primary' onClick={() =>this.changecanvas_height(true)}>
          增长
        </Button>
        <Divider type='vertical'/> 
        <Button type='primary' onClick={() =>this.changecanvas_height(false)}>
          减小
        </Button>
        <Divider type='vertical'/>
        <Dropdown overlay={menu}>
          <Button>
            添加 <Icon type="down" />
          </Button>
        </Dropdown>
      </div>    
    );   
  }
 
  show_title() {
  if(this.props.location.state !== undefined ){
    return(
      <div>
        <Avatar src={this.props.location.state.avatar} size='large'/>
        {this.props.location.state.title}
      </div>
    );
  }
  else
    return(
      <div>
        <span><Avatar size= 'large' src=''/></span>
      </div>
    )
  }

  /******* */
  render() {
    const { monitor } = this.props;
    const { tags } = monitor;
    const {equipment = []} = this.state;

    /*const pageHeaderContent = (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>早安，蔡志军，祝你开心每一天！</div>
          </div>
          
        </div>
    );*/

    return (
      <div>          
        <Card 
          title={ this.show_title() }
          extra={ this.extraContent() } 
        />
          <Card  
            style={{   
              height: 500,
            }}>
            { equipment.length>0
              &&
              equipment.map(item=> (
                < Dragger  grid={[10, 10]} bounds='parent'
                  id={item.key} 
                  key={item.key} type={item.type}
                  style={{left: item.position_x, top: item.position_y}}
                  onchange={this.condition}
                >
                  <div>
                    { item.type === 'swift'
                      &&
                      <Button type="primary" icon="poweroff" 
                        onClick={this.enterIconLoading} >
                        开/关
                      </Button>  
                    }
                    { item.type === 'slider'
                      &&
                      <div>
                        <Slider marks={marks}  /*onChange={this.onChange}*/ value={this.state.inputValue} />
                      </div>
                    }
                    { item.type === 'panel'
                      &&
                      <div style={{width: 360}}>
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
                          title=''
                          height={240}
                          percent={37}
                        />
                      </div>
                    }
                    { item.type === 'input'
                      &&
                      <div>
                        <InputNumber min={1} max={20}/> 
                      </div>
                    }
                  </div> 
                </Dragger>
              ))
            }
          </Card> 
            {/*<div >
              <div style={{marginTop: 540, border: '1px solid rgba(120, 120, 120, 0.4)',width: 240,}}> 
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
                  title=''
                  height={240}
                  percent={37}
                />  
              </div> 
            </div>*/}
      </div>
    );
  }
}
