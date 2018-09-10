import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Avatar, Button, Slider, InputNumber, Icon, Menu, Dropdown, Divider, Form, Modal, Select } from 'antd';
import { Gauge,} from '../../components/Charts';
import Dragger from '../../components/Dragger';
import './Monitor_device.less';

const { Option } = Select;
const FormItem = Form.Item;
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
@Form.create()
export default class Monitor_device extends PureComponent {
  state = {
    inputValue: 37,
    equipment_length: 0,
    canvas_height: 1000,
    equipment: [{
      id: 1,
      type: 'swift',
      position_x: 550,
      position_y: 340,
      range: null,
      measurement: null,
      node: null,   //存储节点 
    },{
      id: 2,
      type: 'slider',
      position_x: 570,
      position_y: 290,
      range: null,
      measurement: null,
      node: null,   //存储节点 
    },{
      id: 3,
      type: 'panel',
      position_x: 550,
      position_y: 50,
      range: null,
      measurement: null,
      node: null,   //存储节点 
    },{
      id: 4,
      type: 'input',
      position_x: 810,
      position_y: 340,
      range: null,
      measurement: null,
      node: null,   //存储节点 
    },
    ],
    //存储临时的各变量的位置信息
    temporary_position: [{ 
      id: 1,
      temporary_x: 0,
      temporary_y: 0,     
    },{
      id: 2,
      temporary_x: 0,
      temporary_y: 0,     
    },{
      id: 3,
      temporary_x: 0,
      temporary_y: 0,     
    },{
      id: 4,
      temporary_x: 0,
      temporary_y: 0,     
    },],
    edit_enable: false,    //判断表盘页面是否进入到编辑状态
    modalVisible: false,    //属性控制界面是否可见
    component_key: null,　　　//在第一次会出现问题
    
    tem: null,

    range_tem: null,       //用于存储临时的变量, range,measurement,node三个变量
    measurement_tem: null,
    node_tem: null,
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
      id: this.state.equipment.length + 1,
      type: type,
      position_x: 0,
      position_y: 0,
      range: null,
      measurement: null,
      node: null,
    });
    this.state.temporary_position.push({
      id: this.state.temporary_position.length + 1,
      temporary_x: 0,
      temporary_y: 0,
    });
    this.setState({equipment_length: this.state.equipment_length+1,});
  }
  /****** */
  /****** */
  getElementBykey(id,newequipment) {
    return (newequipment || this.state.equipment).filter(item => item.id === id)[0];
  }
  /****** */
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
  //
  //
  //
  //
 /******** */
  handleMenuClick = (e) => {
    this.onchangeEquipment(e.key);
  }
  //这里存在第一次调用的时候为空值
  
  checkNode = (rule, value, callback) => {
    if(value){
      this.setState({tem: null });
    if(this.state !==undefined){
    const newequipment = this.state.equipment.map(item => ({...item}));
    const target = this.getElementBykey(this.state.component_key, newequipment);
    
    if(target){
      if(value){
        if((target.type === 'swift') || (target.type === 'input')){
          if(value.slice(0,1) === 's'){
            callback();
          }
          else {callback('error');}
        }
        if((target.type === 'panel') || (target.type === 'Slider')){
          if(value.slice(0,1) === 'r'){
            callback('');
          }
          else {callback('error');}
        }
      }
      else {
        callback();
      }
    }
    callback('error');
    }
    callback('error');
    }
    else if(!value){
      callback();
    }
  }
  ////
  setInputValue(){
    const { setFieldsValue, getFieldValue }=this.props.form;
    if((setFieldsValue)&&(getFieldValue('range')!==undefined))
    {setFieldsValue({
        range: this.state.range_tem!==null ? this.state.range_tem : null,
        measurement: this.state.measurement_tem!==null ? this.state.measurement_tem : null,
        node: this.state.node_tem!==null ?  this.state.node_tem : null,
      });
    }
  }
  //改变位置信息
  //这部分的错误自己还是没有好好的解决掉
  condition = (e) => {
    const { setFieldsValue }=this.props.form;

    if(e !==undefined){
      let element = {id: e.key, temporary_x: e.x, temporary_y: e.y};
      this.state.temporary_position.splice(e.key-1,1,element);
      let target = this.getElementBykey(e.key,this.state.equipment);
      this.setState({ 
        component_key: e.key, 
        range_tem: target.range,
        measurement_tem: target.measurement,
        node_tem: target.node,
      });
      if(setFieldsValue){
        this.setInputValue();
      }
      
    }
    //顺序,当点击属性展示modal时，该程序已经执行完成。对于搜集数据时，则在保存时完成操作。
    //console.log(this.state.temporary_position);
  }
  Edit_enable = (value) => {
    if(value){
      this.setState({edit_enable: value})
    }
    const { component_key } = this.state;
    if((!value)&&!(component_key)) //这样的话，是必须选中才能进行编辑，但是希望是在任何情况下都编辑
    {
      const newequipment = this.state.equipment.map(item => ({...item}));
      const target_equipment = this.getElementBykey(component_key, newequipment);
      let target_position = this.getElementBykey(component_key, this.state.temporary_position);
        if((target_equipment)&&(target_position)) {
          target_equipment.position_x = target_equipment.position_x+target_position.temporary_x;
          target_equipment.position_y = target_equipment.position_y+target_position.temporaty_y;
          //this.setState({equipment: newequipment});
        }
    }
    this.setState({edit_enable: value});//这里存在一些问题，因为这样在任何时候都能进行编辑保存了
  }
  extraContent() {
    const {edit_enable} =this.state;
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
   
    if(edit_enable) {
      return (
        <div>
          <Button type='primary' onClick={() => this.Edit_enable(false)}>
            保存
          </Button>
          <Divider type='vertical'/>
          <Button type='primary' onClick={() => this.setModalvisible(true)}>
            属性
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
    else{
      return(
        <div>
          <Button type='primary' onClick={() => this.Edit_enable(true)}>
            编辑
          </Button>
        </div>
      );
    } 
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
/***** */

  setModalvisible(type) {
    this.setState({modalVisible: type});
  }
  
  component_control(value, key) {//这部分主要是实现各种逻辑的控制，完成数据的传递过程
    const newequipment = this.state.equipment.map(item => ({...item}));
    const target = this.getElementBykey(key, newequipment);
    if(target){
      target.range=value.range;
      target.measurement=value.measurement;
      target.node=value.node;
      //target.position_x=value.position_x;
      //target.position_y=value.position_y;
      this.setState({equipment: newequipment});
    }
  }

  modal_temp(component_key){
    const { getFieldValue } = this.props.form;
    let target_equipment = this.getElementBykey(component_key, this.state.equipment);
    let target_position = this.getElementBykey(component_key,this.state.temporary_position);
    if((getFieldValue('range')!==undefined)&&(getFieldValue('measurement')!==undefined)&&(getFieldValue('node')!==undefined))
    if((target_equipment)&&(target_position)){{ 
      let value ={
        range: getFieldValue('range'),
        measurement: getFieldValue('measurement'),
        node: getFieldValue('node'),
        //position_x: (target_position.temporary_x)+(target_equipment.position_x),//重新进行位置的计算
        //position_y: (target_position.temporary_y)+(target_equipment.position_y),//重新进行位置的计算
      }
      this.component_control(value, component_key);
      this.setModalvisible(false);
    }}
  }
  //这里遇到了一个小问题就是，如何解决数据的modal的更新问题，因为一直使用同一个的modal
  //导致modal无法及时的更新
  //value为onchange值
  modal_show(component_key) { //这部分主要完成数据的展示功能，并完成数据的获取
    const { modalVisible, equipment }=this.state;
    const { getFieldDecorator } = this.props.form;
    let target=this.getElementBykey(component_key, equipment);
    if(target){
      return(
        <Modal
          title={target.type}
          visible={modalVisible}
          onOk={()=>this.modal_temp(component_key)}
          onCancel={()=>this.setModalvisible(false)}
          okText='确认'
          cancelText='取消'
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="量程"
          >
            {getFieldDecorator('range', {
              initialValue: target.range,
              })( <Select placeholder="量程" style={{width: '50%'}} >
                    <Option value= '5'>0~5</Option>
                    <Option value = '10'>0~10</Option>
                    <Option value= '100' >0~100</Option>
                    <Option value='1000'>0~1000</Option>
                  </Select>)
            }
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="单位"
          >
            {getFieldDecorator('measurement', {
              initialValue: target.measurement,
              })( <Select placeholder="单位" style={{width: '50%'}} >
                    <Option value= 'current' >A</Option>
                    <Option value= 'voltage' >V</Option>
                    <Option value= 'resistance'>Ω</Option>
                    <Option value= 'force' >F</Option>
                  </Select>)
            }
          </FormItem>  
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="端点"
          >
            {getFieldDecorator('node', {
              //initialValue: target.node,
              rules: [{validator: this.checkNode}],
              })( <Select placeholder="单位" style={{width: '50%'}} >
                    <Option value= 's1'>S1</Option>
                    <Option value= 's2'>S2</Option>
                    <Option value= 's3'>S3</Option>
                    <Option value= 's4'>S4</Option>
                    <Option value= 'r1'>R1</Option>
                    <Option value= 'r2'>R2</Option>
                    <Option value= 'r3'>R3</Option>
                    <Option value= 'r4'>R4</Option>
                  </Select>)
            }
          </FormItem>
        </Modal>
      );
    }
  }
  /**
   * rules: [
              {
                validator: this.checkPassword,
              },
            ],
   * * */
  /******* */
  render() {
    const { monitor } = this.props;
    const { tags } = monitor;
    const {equipment = [], component_key} = this.state;
    return (
      <div>          
        <Card 
          title={ this.show_title() }
          extra={ this.extraContent() } 
        />
        <Card  
          style={{   
            height: this.state.canvas_height,
          }}>
          { equipment.length>0
            &&
            equipment.map(item=> (
              < Dragger  grid={[10, 10]} bounds='parent'
                id={item.id} 
                key={item.id} type={item.type}
                style={{left: item.position_x, top: item.position_y}}
                static={!this.state.edit_enable}
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
        <div> 
          { component_key !==null
            &&
            this.modal_show(component_key)
          }
        </div>
      </div>
    );
  }
}
