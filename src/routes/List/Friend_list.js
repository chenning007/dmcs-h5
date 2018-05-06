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
  width:'6%'
}, {
  title: '用户号',
  dataIndex: 'useridNumber',
  key: 'useridNumber',
  width: '20',
}, {
  title: '姓名',
  key: 'userTitle',
  width: '20%',
  dataIndex: 'userTitle',
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
}];
/*** */

@connect(state => ({
  list_friend: state.friend.list_friend,
  loading: state.friend.loading,
}))
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

  render() {
    const { list_friend,loading} = this.props;
    const { selectedRowkeys } = this.state;

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

    return (
      <Row gutter={24}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card
            bodyStyle={{ padding: 0 }}
            bordered={false}
            className={styles.activeCard}
            title="朋友列表"
            loading={ loading }
            extra={extraContent}
            style={{ marginBottom: 24 }} 
          >
            <div style={{padding: 10}}>
              <Table columns={columns} dataSource={ list_friend } 
                pagination={false} rowSelection={rowSelection}
                loading={ loading }
                />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}
