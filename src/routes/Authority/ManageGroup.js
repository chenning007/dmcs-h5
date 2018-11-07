import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Avatar,
  Button,
  Icon,
  Modal,
  Form,
  Tooltip,
  Table,
  Divider,
  message,
} from 'antd';
import styles from './ManageGroup.less';
import TableFriend from './TableFriend';
import { getAuthority } from '../../utils/authority';

const columns = [
  {
    title: '管理员',
    dataIndex: 'avatar',
    key: 'avatar',
    width: '10%',
    render: text => <Avatar src={text} />,
  },
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
    width: '20%',
  },
  {
    title: '用户号',
    dataIndex: 'userid',
    key: 'userid',
    width: '20',
  },
  {
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
  },
];

@connect(state => ({
  listFriend: state.friend.listFriend,
  adminusers: state.manage_group.adminusers,
  currentUser: state.login.currentUser,
  loading: state.manage_group.loading,
  fileloding: state.friend.loading,
}))
@Form.create()
export default class ManageGroup extends PureComponent {
  state = {
    contentCondition: 0, // 用于设置content部分的内容,其中1时权限管理，2时添加人员,0为正常状态/******************* *********/
    selectedRowkeys: [], // 用于列表的选择，可以通过该部分信息得到权限情况
    modalVisible1: false, // 用于显示删除的信息
    modalVisible2: false, // 用于显示提示的信息
    editCondition: false,
    selectedUser: [], // 显示朋友列表
    adminAuthority: [],
  };

  componentWillMount() {
    const { dispatch } = this.props;
    const authority = getAuthority();
    if (authority !== 'admin' && authority !== 'host') {
      dispatch(routerRedux.push('/exception/403'));
    }
  }

  componentDidMount() {
    const { dispatch, currentUser = {} } = this.props;
    if (JSON.stringify(currentUser) !== '{}') {
      dispatch({
        type: 'manage_group/getadminuser',
        payload: {
          Userid: currentUser.userid,
        },
      });

      dispatch({
        type: 'friend/getUser',
        payload: {
          Userid: currentUser.userid,
        },
      });
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'manage_group/clear',
    });
  }

  setCondition(contentCondition) {
    this.setState({ contentCondition });
  }

  setModalvisible1(visible) {
    if (!visible) {
      this.setState({ modalVisible1: visible });
      this.setState({
        contentCondition: 0,
        selectedRowkeys: [],
        modalVisible1: false,
        modalVisible2: false,
      });
    }
    if (visible) {
      this.setState({ modalVisible1: visible });
    }
  }

  setModalvisible2(visible) {
    if (!visible) {
      this.setState({ modalVisible2: visible });
    }
    if (visible) {
      this.setState({ modalVisible2: visible });
    }
  }

  onSelectedChange = selectedRowkeys => {
    this.setState({ selectedRowkeys });
  };

  onSelecteduser = selectedRowkeys => {
    this.setState({ selectedUser: selectedRowkeys });
  };

  addAdmin = selectedUser => {
    const { dispatch, currentUser = {} } = this.props;
    const userids = [];
    userids.push({
      userid: selectedUser[0],
    });
    if (JSON.stringify(currentUser) !== '{}') {
      dispatch({
        type: 'manage_group/addAdminuser',
        payload: {
          Userid: currentUser.userid,
          userids,
        },
      });
    }
    this.resetCondition();
  };

  resetCondition = () => {
    this.setState({
      contentCondition: 0,
      selectedRowkeys: [],
      selectedUser: [],
      modalVisible1: false,
      modalVisible2: false,
      editCondition: false,
    });
  };

  deleteAdmin(selectedRowkeys) {
    const { dispatch, currentUser = {} } = this.props;
    const userids = [];
    let i = 0;
    for (; i < selectedRowkeys.length; i += 1) {
      userids.push({
        userid: selectedRowkeys[i],
      });
    }
    if (JSON.stringify(currentUser) !== '{}') {
      dispatch({
        type: 'manage_group/deleteAdminuser',
        payload: {
          userids,
          Userid: currentUser.userid,
        },
      });
      this.setState({ modalVisible1: false });
      this.setState({
        contentCondition: 0,
        selectedRowkeys: [],
        modalVisible1: false,
        modalVisible2: false,
      });
    } else {
      message.error('用户信息缺失，请重新刷新页面');
    }
  }

  authorityShow(contentCondition) {
    const { adminusers } = this.props;
    const { adminAuthority } = this.state;
    const Authority = [];

    if (adminAuthority.length === 0) {
      if (JSON.stringify(adminusers) !== '[]') {
        let i = 0;
        for (; i < adminusers.length; i += 1)
          Authority.push({
            key: i,
            avatar: adminusers[i].avatar,
            username: adminusers[i].username,
            userid: adminusers[i].userid,
            auth1: adminusers[i].auth1 === 'true',
            auth2: adminusers[i].auth2 === 'true',
            auth3: adminusers[i].auth3 === 'true',
            auth4: adminusers[i].auth4 === 'true',
            auth5: adminusers[i].auth5 === 'true',
            auth6: adminusers[i].auth6 === 'true',
            auth7: adminusers[i].auth7 === 'true',
            auth8: adminusers[i].auth8 === 'true',
            auth9: adminusers[i].auth9 === 'true',
          });
        this.setState({
          adminAuthority: [...Authority],
        });
      }
    }
    this.setState({ contentCondition });
  }

  submitAuthority() {
    const { dispatch, currentUser, form } = this.props;

    const { validateFieldsAndScroll } = form;

    validateFieldsAndScroll((error, values) => {
      if (!error && JSON.stringify(currentUser) !== '{}') {
        const Users = [];
        let i = 0;
        for (; i < values.authorize.length; i += 1) {
          const Auth = values.authorize[i];
          Users.push({
            userid: Auth.userid,
            auth1: Auth.auth1 ? 'true' : 'false',
            auth2: Auth.auth2 ? 'true' : 'false',
            auth3: Auth.auth3 ? 'true' : 'false',
            auth4: Auth.auth4 ? 'true' : 'false',
            auth5: Auth.auth5 ? 'true' : 'false',
            auth6: Auth.auth6 ? 'true' : 'false',
            auth7: Auth.auth7 ? 'true' : 'false',
            auth8: Auth.auth8 ? 'true' : 'false',
            auth9: Auth.auth9 ? 'true' : 'false',
          });
        }
        dispatch({
          type: 'manage_group/changeAuthority',
          payload: {
            Users,
            Userid: currentUser.userid,
          },
        });
        this.setState({ adminAuthority: [...values.authorize] });
      }
    });
  }

  resetSubmit() {
    this.submitAuthority();
    this.resetCondition();
  }

  extraContent(selectedRowkeys, contentCondition) {
    if (selectedRowkeys.length > 0) {
      return (
        <div>
          <Tooltip placement="topRight" title="删除人员">
            <Button type="primary" onClick={() => this.setModalvisible1(true)}>
              删除
            </Button>
          </Tooltip>
        </div>
      );
    }
    if (selectedRowkeys.length === 0) {
      if (contentCondition === 0) {
        return (
          <div>
            <span>
              <Tooltip placement="topLeft" title="添加人员">
                <Button type="primary" onClick={() => this.setCondition(2)}>
                  添加
                </Button>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip placement="top" title="删除人员">
                <Button type="primary" onClick={() => this.setModalvisible2(true)}>
                  删除
                </Button>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip placement="topRight" title="权限管理">
                <Button type="primary" onClick={() => this.authorityShow(1)}>
                  权限
                </Button>
              </Tooltip>
            </span>
          </div>
        );
      }
      if (contentCondition === 1) {
        const { editCondition } = this.state;
        if (!editCondition) {
          return (
            <div>
              <Tooltip placement="top" title="返回">
                <Button type="primary" onClick={() => this.resetCondition()}>
                  <Icon type="rollback" />
                </Button>
              </Tooltip>
            </div>
          );
        }
        return (
          <div>
            <Tooltip placement="topLeft" title="保存权限更改">
              <Button type="primary" onClick={() => this.resetSubmit()}>
                保存
              </Button>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip placement="topRight" title="取消权限更改">
              <Button type="primary" onClick={() => this.resetCondition()}>
                取消
              </Button>
            </Tooltip>
          </div>
        );
      }
    }
  }

  extraContent3(length) {
    const { selectedUser } = this.state;
    if (length) {
      return (
        <div>
          <Tooltip placement="top" title="加入管理员">
            <Button type="primary" onClick={() => this.addAdmin(selectedUser)}>
              加入管理员
            </Button>
          </Tooltip>
        </div>
      );
    } else {
      return (
        <div>
          <Tooltip placement="top" title="返回">
            <Button type="primary" onClick={() => this.resetCondition()}>
              <Icon type="rollback" />
            </Button>
          </Tooltip>
        </div>
      );
    }
  }

  editCondition(e, editEnable) {
    this.setState({ editCondition: editEnable });
  }
  // 从这里可以获取人员列表的信息;
  /* *** */

  renderActivities() {
    const { listFriend = [], adminusers = [], form, loading, fileloding } = this.props;
    const { getFieldDecorator } = form;
    const {
      contentCondition,
      selectedRowkeys = [],
      modalVisible1,
      modalVisible2,
      selectedUser = [],
      adminAuthority = [],
    } = this.state;
    const rowSelection = {
      selectedRowkeys,
      onChange: this.onSelectedChange,
      hideDefaultSelections: true,
    };
    const adduserSelction = {
      selectedRowkeys,
      onChange: this.onSelecteduser,
      hideDefaultSelections: true,
      type: 'radio',
    };
    if (contentCondition !== 2) {
      // 2时显示朋友列表,在此状态，显示正常模式＋权限管理模式＋删除模式
      return (
        <div style={{ padding: 10 }}>
          {(contentCondition === 0 || selectedRowkeys.length !== 0) && (
            <div>
              <Table
                columns={columns}
                dataSource={adminusers}
                pagination={false}
                rowSelection={rowSelection}
                loading={loading}
                rowKey="userid"
              />
            </div>
          )
          // 这里直接显示出了人员的列表,只有在选择人数不为0或要求显示的内容不为２时，才显示出来
          }
          {contentCondition === 1 &&
            selectedRowkeys.length === 0 && (
              <Card bordered={false} style={{ marginTop: 12 }} loading={loading}>
                {getFieldDecorator('authorize', {
                  initialValue: adminAuthority,
                })(<TableFriend onChange={(e, editEnable) => this.editCondition(e, editEnable)} />)}
              </Card>
            )
          // 此时显示权限情况
          }
          {selectedRowkeys.length > 0 &&
            contentCondition === 0 && (
              <Modal
                title="删除下列人员"
                visible={modalVisible1} // 删除人员时
                onOk={() => this.deleteAdmin(selectedRowkeys)}
                onCancel={() => this.setModalvisible1(false)}
                okText="确认"
                cancelText="取消"
              >
                <Form>
                  {selectedRowkeys.map(item => {
                    return (
                      <Form.Item key={item}>
                        <span>{item}</span>
                      </Form.Item>
                    );
                  })}
                </Form>
              </Modal>
            )}
          {selectedRowkeys.length === 0 && (
            <Modal
              visible={modalVisible2}
              onOk={() => this.setModalvisible2(false)}
              onCancel={() => this.setModalvisible2(false)}
              title="请选择需要删除的人员"
            />
          )}
        </div>
      );
    }
    if (contentCondition === 2) {
      return (
        <Card
          title="朋友列表"
          bodyStyle={{ padding: 0 }}
          extra={this.extraContent3(selectedUser.length)}
        >
          <div style={{ padding: 10 }}>
            <Table
              columns={columns}
              dataSource={listFriend}
              pagination={false}
              rowSelection={adduserSelction}
              rowKey="userid"
              loading={fileloding}
            />
          </div>
        </Card>
      );
    }
  }

  render() {
    const { selectedRowkeys, contentCondition } = this.state;

    return (
      <Row gutter={24}>
        {contentCondition !== 2 && ( // 在3状态下，需要完全的更换界面，故选择了采用两种状态下之间的转换形式。
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ padding: 0 }}
              title="权限管理"
              bordered={false}
              className={styles.activeCard}
              // loading={loading}
              extra={this.extraContent(selectedRowkeys, contentCondition)}
              style={{ marginBottom: 24 }}
            >
              <div className={styles.activitiesList}>{this.renderActivities()}</div>
            </Card>
          </Col>
        )}
        {contentCondition === 2 && this.renderActivities()}
      </Row>
    );
  }
}
