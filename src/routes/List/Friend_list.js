import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Input, Button, Icon, Modal, Form, Popconfirm, Select } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditableLinkGroup from '../../components/EditableLinkGroup';
import { Radar } from '../../components/Charts';

import styles from './Device_friend.less';

const FormItem = Form.Item;
const Option=Select.Option;

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
            //actions={[default_action]}
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

   /* const extraContent = (
      <div className={styles.extraContent}>
      <div className={styles.statItem} >
         <Icon type="minus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}}/>
      </div>
      <div className={styles.statItem}> 
         <Icon type="plus" style={{fontSize: 32, color: 'rgb(0, 129, 204)'}} />
      </div>
      </div>
    ); */

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
              title="共享成员"
              loading={activitiesLoading}
              //extra={extraContent}
              style={{ marginBottom: 24 }} 
            >
              <List loading={activitiesLoading} size="large">
                   <div className={styles.activitiesList}>
                      {this.renderActivities()} 
                   </div>
              </List>
            </Card>
         </Col>
        </Row>
    );
  }
}
