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
    device_length : 2,
    marginleft: 0,
    equipment_length: 0,
    equipment: [{
      key: 1,
      type: 'swift',
      position: 0,
      node: '',   //存储节点 
    },{
      key: 2,
      type: 'slider',
      position: 0,
      node: '',   //存储节点 
    },{
      key: 3,
      type: 'panel',
      position: 0,
      node: '',   //存储节点 
    },{
      key: 4,
      type: 'input',
      position: 0,
      node: '',   //存储节点 
    },
    ],
    position: [],   //标示位置的数组
    type_number: 0, //标示选定的容器
    clicknumber: 0,
    canvas_height: 1000,
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'monitor/fetchTags',
    });
  }
  /****** */
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
    this.state.equipment.push({
      key: this.state.equipment.length + 1,
      type: type,
      position: 0,
      node: '',
    });
    this.state.position.push( 0 );
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
        height={240}
        percent={value}
     />
    );
  }

  changePosition_right = () => {
    const { type_number, position }=this.state;
    this.state.position.fill(position[type_number]+10, type_number, type_number+1);
    this.setState({clicknumber: this.state.clicknumber+1});
  }
  changePosition_left =() => {
    const { type_number, position }=this.state;
    if(position[type_number]>0)
    this.state.position.fill(position[type_number]-10, type_number,type_number+1);
    this.setState({clicknumber: this.state.clicknumber+1});
  }
  //选择标定的容器
  position_type = (key) =>{
    const { type_number, position }=this.state;
    //this.setState({(equipment[key]).position: '' ,});
    if(key>=1)
    this.setState({type_number: key-1});
  }
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
        {/*<Button type='primary' onClick={() =>this.changePosition_right()}>
          右移
        </Button>
        <Divider type='vertical'/>
        <Button type='primary' onClick={() => this.changePosition_left()}>
          左移
        </Button>
        <Divider type='vertical'/>*/}
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
      <div
        //content={pageHeaderContent}
        //extraContent={extraContent}
      > 
        {/*<div  
          style={{
            border: ' 1px solid rgba(120, 120, 120, 0.4)', 
            left: 300, top: 240,
            width: 1500, height: 500,
            position: 'absolute'
          }}>
          <Dragger bounds='parent' className='styles'>
            < div>
              我爱学习
            </div>
          </Dragger> 
        </div>*/} 
        <Card 
          title={ this.show_title() }
          extra={ this.extraContent() } 
          //className={ styles.button }
          //style={{ height:this.state.canvas_height,}}
        />
          <div  
            style={{
              
              border: ' 1px solid rgba(120, 120, 120, 0.4)', 
              left: 300, top: 280,
              width: 1500, 
              height: 500,
              position: 'absolute'
            }}>
            { this.state.equipment.length>0
              &&
              this.state.equipment.map(item=> (
                <Dragger  grid={[10, 10]} bounds='parent' key={item.key} type={item.type}>
                  < div  >
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
                      <div>
                        { this.device_panel('', '2', this.state.inputValue)} 
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
          </div>      
      </div>
    );
  }
}
