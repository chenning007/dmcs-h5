import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Button, Card, Icon, Row, Col, Upload, message, Modal } from 'antd';
import reqwest from 'reqwest';
import Cropper from 'react-cropper';
import FooterToolbar from '../../components/FooterToolbar';

const FormItem = Form.Item;

function engCN(sex) {
  switch (sex) {
    case 'man':
      return '男';
    case 'woman':
      return '女';
    case 'man_woman':
      return '无';
    default:
      return '待补充';
  }
}
/* ***** */
@connect(state => ({
  currentUser: state.login.currentUser,
}))
export default class BasicProfiles extends PureComponent {
  state = {
    fileList: [],
    uploading: false,
    currentuser: {},
    visible: true,
  };

  onChangestate = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`set_up`));
  };

  getCurrentUser() {
    const { currentuser } = this.state;
    const { currentUser } = this.props;
    if (currentuser === null || JSON.stringify(currentuser) === '{}') {
      return currentUser;
    } else return currentuser;
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file);
    });

    this.setState({
      uploading: true,
    });

    reqwest({
      url: 'api/v1/user/image',
      method: 'post',
      processData: false,
      data: formData,

      success: resp => {
        this.setState({
          fileList: [],
          uploading: false,
          currentuser: resp.data,
        });
        // console.log(resp);
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  };

  oKfunc() {
    this.setState({ visible: false });
  }

  Cancelfunc() {
    this.setState({ visible: false });
  }

  renderInfo() {
    const { currentUser } = this.props;
    return (
      <Form hideRequiredMark style={{ marginTop: 8 }}>
        <FormItem
          colon={false}
          labelCol={{ span: 4, offset: 0 }}
          wrapperCol={{ span: 8, offset: 2 }}
          label={<b>用户&nbsp;&nbsp;&nbsp;名:</b>}
        >
          <h3>{currentUser.username ? currentUser.username : '未命名'}</h3>
        </FormItem>
        <FormItem
          colon={false}
          labelCol={{ span: 4, offset: 0 }}
          wrapperCol={{ span: 8, offset: 2 }}
          label={<b>用户&nbsp;&nbsp;&nbsp;号:</b>}
        >
          <h3>{currentUser.userid ? currentUser.userid : '待补充'}</h3>
        </FormItem>
        <FormItem
          colon={false}
          labelCol={{ span: 4, offset: 0 }}
          wrapperCol={{ span: 8, offset: 2 }}
          label={<b>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</b>}
        >
          <h3>{currentUser.realname ? currentUser.realname : '待补充'}</h3>
        </FormItem>
        <FormItem
          colon={false}
          labelCol={{ span: 4, offset: 0 }}
          wrapperCol={{ span: 8, offset: 2 }}
          label={<b>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</b>}
        >
          <h3>{currentUser.usersex ? engCN(currentUser.usersex) : '待补充'}</h3>
        </FormItem>
        <FormItem
          colon={false}
          labelCol={{ span: 4, offset: 0 }}
          wrapperCol={{ span: 8, offset: 2 }}
          label={<b>身份证号:</b>}
        >
          <h3>{currentUser.userIdnumber ? currentUser.userIdNumber : '待补充'}</h3>
        </FormItem>
        <FormItem
          colon={false}
          labelCol={{ span: 4, offset: 0 }}
          wrapperCol={{ span: 8, offset: 2 }}
          label={<b>工作单位:</b>}
        >
          <h3>{currentUser.userworkPlace ? currentUser.userworkPlace : '待补充'}</h3>
        </FormItem>
      </Form>
    );
  }

  render() {
    const currentUser = this.getCurrentUser();
    const { uploading, fileList, visible } = this.state;
    const props = {
      action: '/api/v1/user/image',
      accept: 'image/*',
      onRemove: file => {
        this.setState(() => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(() => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList,
    };
    return (
      <div>
        <Card
          title={
            <div className="basic_info">
              <b>基本信息</b>
            </div>
          }
          bordered="true"
          style={{ marginBottom: 24 }}
        >
          <Row>
            <Col span={6} className="image">
              <Card
                // bordered={true}
                style={{ marginTop: 10, textAlign: 'center', width: 240, marginLeft: 30 }}

                // title='个人头像'
              >
                <div className="image">
                  <img
                    src={
                      currentUser.avatar
                        ? currentUser.avatar
                        : 'http://39.104.208.4:80/image/ZiESqWwCXBRQoaPONSJe.png'
                    }
                    alt="图像"
                    width="80%"
                  />
                </div>
                <div className="headimage" style={{ marginTop: 16 }}>
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" />
                      更改头像
                    </Button>
                  </Upload>
                  <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                  >
                    {uploading ? '上传中...' : '开始上传'}
                  </Button>
                </div>
              </Card>
              <Modal
                visible={fileList.length !== 0 && visible}
                onOk={() => this.oKfunc()}
                onCancel={() => this.Cancelfunc()}
              >
                <Cropper
                  // ref="cropper"
                  src="/image/ZiESqWwCXBRQoaPONSJe.png"
                  style={{ height: 800, width: '100%' }}
                  aspectRatio={16 / 9}
                  guides={false}
                />
              </Modal>
            </Col>
            <Col span={12}>
              <Card style={{ marginTop: -10 }} bordered={false}>
                {this.renderInfo()}
              </Card>
            </Col>
          </Row>
        </Card>
        <Card
          // className='link_method'
          title={
            <div>
              <b>联系方式</b>
            </div>
          }
          bordered="true"
          style={{ marginBottom: 24 }}
        >
          <Row>
            <Col span={6} />
            <Col span={12}>
              <Form hideRequiredMark style={{ marginTop: 8 }}>
                <FormItem
                  colon={false}
                  labelCol={{ span: 4, offset: 0 }}
                  wrapperCol={{ span: 8, offset: 2 }}
                  label={<b>邮箱:</b>}
                >
                  <h3>{currentUser.userEmail ? currentUser.userEmail : '待补充'}</h3>
                </FormItem>
                {currentUser.userEmail_1 && (
                  <FormItem
                    colon={false}
                    labelCol={{ span: 4, offset: 0 }}
                    wrapperCol={{ span: 8, offset: 2 }}
                    label={<b>备注邮箱:</b>}
                  >
                    <h3>{currentUser.userEmail_1}</h3>
                  </FormItem>
                )}
                <FormItem
                  colon={false}
                  labelCol={{ span: 4, offset: 0 }}
                  wrapperCol={{ span: 8, offset: 2 }}
                  label={<b>手机号:</b>}
                >
                  <h3>{currentUser.userTelephone ? currentUser.userTelephone : '待补充'}</h3>
                </FormItem>
                {currentUser.userTelephone_1 && (
                  <FormItem
                    colon={false}
                    labelCol={{ span: 4, offset: 0 }}
                    wrapperCol={{ span: 8, offset: 2 }}
                    label={<b>备注手机:</b>}
                  >
                    <h3>{currentUser.userTelephone_1}</h3>
                  </FormItem>
                )}
                <FormItem
                  colon={false}
                  labelCol={{ span: 4, offset: 0 }}
                  wrapperCol={{ span: 8, offset: 2 }}
                  label={<b>微信号:</b>}
                >
                  <h3>{currentUser.userWeixin ? currentUser.userWeixin : '待补充'}</h3>
                </FormItem>
                <FormItem
                  colon={false}
                  labelCol={{ span: 4, offset: 0 }}
                  wrapperCol={{ span: 8, offset: 2 }}
                  label={<b>QQ号:</b>}
                >
                  <h3>{currentUser.userQq ? currentUser.userQq : '待补充'}</h3>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </Card>
        <Card
          title={
            <div>
              <b>邮寄地址</b>
            </div>
          }
          bordered="true"
        >
          <Row className="address">
            <Col span={4} />
            <Col span={16}>
              {currentUser.address !== undefined &&
                currentUser.address.map(item => {
                  if (item.area !== null) {
                    return (
                      <Card
                        bordered="true"
                        key={item.key}
                        title={item.title ? item.title : item.name ? item.name : ''}
                        style={{ marginBottom: 12 }}
                      >
                        <p style={{ paddingLeft: 24 }}>
                          收件人: &nbsp; <b> {item.name}</b>
                        </p>
                        <p style={{ paddingLeft: 24 }}>
                          所在地区: &nbsp; <b> {item.area}</b>
                        </p>
                        <p style={{ paddingLeft: 24 }}>
                          地址: &nbsp; <b> {item.place}</b>
                        </p>
                        <p style={{ paddingLeft: 24 }}>
                          手机: &nbsp; <b> {item.mobilephone}</b>
                        </p>
                        <p style={{ paddingLeft: 24 }}>
                          固定电话: &nbsp; <b> {item.fixedphone}</b>
                        </p>
                        <p style={{ paddingLeft: 24 }}>
                          邮箱: &nbsp; <b> {item.emial}</b>
                        </p>
                      </Card>
                    );
                  }
                  return null;
                })}
            </Col>
            <Col span={4} />
          </Row>
        </Card>
        <FooterToolbar>
          <Button type="primary" size="large" onClick={() => this.onChangestate()}>
            修改
          </Button>
        </FooterToolbar>
      </div>
    );
  }
}
