import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card,  Table, } from 'antd';

/* eslint react/no-array-index-key: 0 */
const R_endpoint= [
    {key : '1', type: 'R1', data:1 , unit: '℃', physical: '温度',　position: '北京市海淀区四环到五环之间＃清华的大学精密仪器系国家重点实验室401房间', node: '节点1'},
    {key : '2', type: 'R2', data:3 , unit: 'Pa', physical: '压力',　position: '实验室402房间', node: '节点3'},
    {key : '3', type: 'R3', data:2 , unit: 'm/s', physical: '速度',　position: '实验室403房间', node: '节点1'},
    {key : '4', type: 'R4', data:5 , unit: 'm', physical: '位移',　position: '实验室401房间', node: '节点4'},
    {key : '5', type: 'R5', data:7 , unit: 'm/s²', physical: '加速度',　position: '实验室405房间', node: '节点１'},
    {key : '6', type: 'R6', data:8 , unit: 'dB', physical: '分贝',　position: '实验室407房间', node: '节点2'},
    {key : '7', type: 'R7', data:10, unit: 'A', physical: '电流',　position: '实验室402房间', node: '节点3'},
    {key : '8', type: 'R8', data:5 , unit: 'N', physical: '力',　position: '实验室401房间', node: '节点4'},
    ];
const S_endpoint= [
    {key : '1', type: 'S1', data:2 , unit: 'Hz', physical: '频率',　position: '实验室401房间', node: '节点1'},
    {key : '2', type: 'S2', data:3 , unit: 'W', physical: '功率',　position: '实验室403房间', node: '节点2'},
    {key : '3', type: 'S3', data:7 , unit: 'J', physical: '能量',　position: '实验室402房间', node: '节点4'},
    {key : '4', type: 'S4', data:6 , unit: 'cd', physical: '光照强度',　position: '实验室401房间', node: '节点3'},
    {key : '5', type: 'S5', data:5 , unit: 'L', physical: '体积',　position: '实验室402房间', node: '节点2'},
    {key : '6', type: 'S6', data:4 , unit: 'mol', physical: '物质的量',　position: '实验室405房间', node: '节点1'},
    {key : '7', type: 'S7', data:3 , unit: 'kg', physical: '质量',　position: '实验室404房间', node: '节点3'},
    {key : '8', type: 'S8', data:2 , unit: 'T', physical: '磁场强度',　position: '实验室406房间', node: '节点4'},
    ];
const columns= [
    {title: '端点',width: 100, dataIndex: 'type', key: 'type', fixed: 'left',},
    {title: '数据',width: 100, dataIndex: 'data', key: 'data', fixed: 'left',},
    {title: '单位',width: 80, dataIndex: 'unit', key: 'unit'},
    {title: '物理含义',width: 100, dataIndex: 'physical', key: 'physical'},
    {title: '位置信息',width: 200, dataIndex: 'position', key: 'position'},
    {title: '节点号',width: 120, dataIndex: 'node', key: 'node'},
    ];
 /***** */
function getActiveData() {
    const activeData =[];
    for(let i = 0; i < 16 ; i ++){
      activeData.push(
        Math.floor(Math.random()*10)+1
      );
    }
    return activeData;
}

function getdevice_data(choice) {
    const activeData = getActiveData();
    var Device_data = [];
    if((activeData !==undefined)&&(activeData !==[])&&(activeData.length === 16)){
      if(choice !==undefined){
        if(choice){
        Device_data = [
            {key : '1', type: 'R1', data: activeData[0] , unit: '℃', physical: '温度',　position: '北京市海淀区四环到五环之间＃清华的大学精密仪器系国家重点实验室401房间', node: '节点1'},
            {key : '2', type: 'R2', data: activeData[1] , unit: 'Pa', physical: '压力',　position: '实验室402房间', node: '节点3'},
            {key : '3', type: 'R3', data: activeData[2] , unit: 'm/s', physical: '速度',　position: '实验室403房间', node: '节点1'},
            {key : '4', type: 'R4', data: activeData[3] , unit: 'm', physical: '位移',　position: '实验室401房间', node: '节点4'},
            {key : '5', type: 'R5', data: activeData[4] , unit: 'm/s²', physical: '加速度',　position: '实验室405房间', node: '节点１'},
            {key : '6', type: 'R6', data: activeData[5] , unit: 'dB', physical: '分贝',　position: '实验室407房间', node: '节点2'},
            {key : '7', type: 'R7', data: activeData[6], unit: 'A', physical: '电流',　position: '实验室402房间', node: '节点3'},
            {key : '8', type: 'R8', data: activeData[7] , unit: 'N', physical: '力',　position: '实验室401房间', node: '节点4'}, 
        ];}
        if(!choice){
        Device_data = [
            {key : '1', type: 'S1', data: activeData[8] , unit: 'Hz', physical: '频率',　position: '实验室401房间', node: '节点1'},
            {key : '2', type: 'S2', data: activeData[9] , unit: 'W', physical: '功率',　position: '实验室403房间', node: '节点2'},
            {key : '3', type: 'S3', data: activeData[10] , unit: 'J', physical: '能量',　position: '实验室402房间', node: '节点4'},
            {key : '4', type: 'S4', data: activeData[11] , unit: 'cd', physical: '光照强度',　position: '实验室401房间', node: '节点3'},
            {key : '5', type: 'S5', data: activeData[12] , unit: 'L', physical: '体积',　position: '实验室402房间', node: '节点2'},
            {key : '6', type: 'S6', data: activeData[13] , unit: 'mol', physical: '物质的量',　position: '实验室405房间', node: '节点1'},
            {key : '7', type: 'S7', data: activeData[14] , unit: 'kg', physical: '质量',　position: '实验室404房间', node: '节点3'},
            {key : '8', type: 'S8', data: activeData[15] , unit: 'T', physical: '磁场强度',　position: '实验室406房间', node: '节点4'},  
        ];}

        }

    }
    return Device_data;
}
 /***** */

@connect(state => ({ 
}))
export default class Monitor_data extends PureComponent {
    state = {
        r_endpoint: R_endpoint,
        s_endpoint: S_endpoint,
        
    }
  componentDidMount() {
    this.timer = setInterval(() => {
        this.setState({
          r_endpoint: getdevice_data(true),
          s_endpoint: getdevice_data(false),
        });
      }, 5000);
  }


  render() {

    const formItemLayout = {
        wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        },
    };
    const {r_endpoint = [], s_endpoint = []} = this.state;
    return (
      <div>
        <Card title='device'>
        <Row gutter={24}>　
            <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>　 
            <Card title='信息终端点'>
                <Table columns={columns} dataSource={r_endpoint} scroll={{x:700, y:500}} pagination={false} />
            </Card>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title='信息源端点'>
                <Table columns={columns} dataSource={s_endpoint} scroll={{x:700, y:500}} pagination={false} />
            </Card>
            </Col>
        </Row>    
        </Card>
      </div>
    );
  }
}
