import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Input, Button, Icon, Modal, Form, Popconfirm, Table, Divider } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditableLinkGroup from '../../components/EditableLinkGroup';

import styles from './Friend_list.less';

const FormItem = Form.Item;

/**** */
const columns =  [{
  title: '朋友',
  dataIndex: 'avatar',
  key: 'avatar',
  width: '4%',
  render: text => <Avatar src={text}/>,
},{
  title: '',
  dataIndex: 'userName',
  key: 'userName',
  width:'16%'
}, {
  title: '用户号',
  dataIndex: 'useridNumber',
  key: 'useridNumber',
  width: '30',
}, {
  title: '联系方式',
  dataIndex: 'userTelephone',
  key: 'userTelephone',
  width: '20',
},
{
  title: '单位',
  key: 'userworkPlace',
  width: '30%',
  dataIndex: 'userworkPlace',
  //render: '',
}];;

const avatar = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
];
const data = [{
  key: '1',
  avatar: avatar[1],
  useridNumber: '123456',
  userName: 'John',
  userTelephone: '15701575451',
  userworkPlace: '清华大学',
}, {
  key: '2',
  avatar: avatar[2],
  useridNumber: '123457',
  userName: 'Jim',
  userTelephone: '15701575452',
  userworkPlace: '清华大学',
}, {
  key: '3',
  avatar: avatar[3],
  useridNumber: '123458',
  userName: 'Sara',
  userTelephone: '15701575453',
  userworkPlace: '清华大学',
},{
  key: '4',
  avatar: avatar[4],
  useridNumber: '123459',
  userName: '茅军', 
  userTelephone: '15701575454',
  userworkPlace: '清华大学',
},{
  key: '5',
  avatar: avatar[5],
  useridNumber: '123459',
  userName: '刘军',
  userTelephone: '15701575455',
  userworkPlace: '清华大学',
},{
  key: '6',
  avatar: avatar[6],
  useridNumber: '123451',
  userName: '胡军',
  userTelephone: '15701575456',
  userworkPlace: '清华大学',
}
];
/*** */

@connect(state => ({
  friend: state.friend,
}))

@Form.create()
export default class Friend_list extends PureComponent {
  state = {
    selectedRowkeys: [],
  }
  onSelectedChange = (selectedRowkeys) => {
    this.setState({selectedRowkeys: selectedRowkeys});
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'friend/fetchList',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'friend/clear',
    });
  }
/**** */
 /**** */ 
  renderActivities() {
    const {
      friend: { list_activities },
    } = this.props;

    return list_activities.map((item) => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
        return key;
     });
      return (
        <List.Item key={item.id} /*actions={[<a>设置</a>, 
            <Popconfirm title="是否要删除此行？">
               <a>删除</a>
            </Popconfirm>]}*/
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
      friend: { loading: activitiesLoading },
      form,
    } = this.props;
    const { selectedRowkeys } = this.state;
    
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const rowSelection = {
      selectedRowkeys,
      onChange: this.onSelectedChange,
      hideDefaultSelections: true,
    };

    const extraContent = (
      <div > 
        { selectedRowkeys.length>0 
              &&
              <span >
                <Button type='primary'>删除</Button>
                <Divider  type='vertical'/>
              </span>
        }
         <Button type='primary'>添加</Button>
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
              title="朋友列表"
              loading={activitiesLoading}
              extra={extraContent}
              style={{ marginBottom: 24 }} 
            >
            {/*
              <List loading={activitiesLoading} size="large">
                   <div className={styles.activitiesList}>
                      {this.renderActivities()} 
                   </div>
              </List>
           </Card>*/}
              <div style={{padding: 10}}>
                <Table columns={columns} dataSource={data} 
                  pagination={false} rowSelection={rowSelection}/>
              </div>
            </Card>
         </Col>
        </Row>
    );
  }
}
