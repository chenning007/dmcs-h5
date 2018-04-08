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
const columns = [{
  title: '用户',
  dataIndex: 'avator',
  key: 'avator',
  width: '25%',
  render: text => <Avatar src={text}/>,
},{
  title: '用户名',
  dataIndex: 'name',
  key: 'name',
  width:'20%'
}, {
  title: 'Id',
  dataIndex: 'id_number',
  key: 'id_number',
  width: '30',
}, {
  title: '设置',
  key: 'action',
  width: '25%',
  render: '',
}];

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
  avator: avatar[1],
  id_number: '123456',
  name: 'John',
}, {
  key: '2',
  avator: avatar[2],
  id_number: '123457',
  name: 'Jim',
}, {
  key: '3',
  avator: avatar[3],
  id_number: '123458',
  name: 'Sara',
},{
  key: '4',
  avator: avatar[4],
  id_number: '123459',
  name: '茅军', 
},{
  key: '5',
  avator: avatar[5],
  id_number: '123459',
  name: '刘军',
},{
  key: '6',
  avator: avatar[6],
  id_number: '123451',
  name: '胡军',
}
];
/*** */

@connect(state => ({
  friend: state.friend,
}))

@Form.create()
export default class Friend_list extends PureComponent {
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
    
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const extraContent = (
      <div className=" ">
      <div className="   "> 
         <Icon type="plus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} />
      </div>
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
              //style={{ marginBottom: 24 }} 
            >
            {/*
              <List loading={activitiesLoading} size="large">
                   <div className={styles.activitiesList}>
                      {this.renderActivities()} 
                   </div>
              </List>
           </Card>*/}
              <div>
               <Table columns={columns} dataSource={data} pagination={false}/>
              </div>
            </Card>
         </Col>
        </Row>
    );
  }
}
