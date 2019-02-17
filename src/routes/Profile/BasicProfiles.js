import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Button, Card, Icon, Row, Col, Upload, message, Modal } from 'antd';
import reqwest from 'reqwest';
import Cropper from 'react-cropper';

import '../../../node_modules/cropperjs/dist/cropper.css';

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
    fileList: [], // 用于存储原图片
    tempfileList: [], // 用于存储裁剪后的图片
    uploading: false,
    currentuser: {},
    visible: false, // 用于控制modal是否可见
    cropResult: null, // 用于显示
    fileName: null, // 用于存储文件名
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
    const { tempfileList } = this.state;
    const formData = new FormData();

    tempfileList.forEach(file => {
      formData.append('file', file);
    });

    // if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
    //   return message.error('信息丢失!!!');
    // }

    //  this.cropper.getCroppedCanvas().toBlob( blob => {
    //   blob.name=fileName
    //   formData.append('file',blob,blob.name);
    //  })

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

  cropImage() {
    const { fileName } = this.state;

    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
      visible: false,
    });

    this.cropper.getCroppedCanvas().toBlob(blob => {
      const temfile = new File([blob], fileName);
      this.setState({ tempfileList: [temfile] });
    });
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
    const { uploading, fileList, visible, cropResult } = this.state;

    const props = {
      action: '/api/v1/user/image',
      accept: 'image/*',
      beforeUpload: file => {
        const isLt10M = file.size / 1024 / 1024 < 1;
        if (!isLt10M) {
          // 添加文件限制
          message.error('图片大小不能超过1M');
          return false;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file); // 读取文件

        reader.onload = e => {
          this.setState({
            fileList: [e.target.result],
            fileName: file.name,
            visible: true,
          });
        };
        return false;
      },
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
                      cropResult ||
                      (currentUser.avatar ||
                        'http://39.104.208.4:80/image/ZiESqWwCXBRQoaPONSJe.png')
                    }
                    alt="图像"
                    width="80%"
                  />
                </div>
                <div className="headimage" style={{ marginTop: 16 }}>
                  <Upload {...props} showUploadList={false}>
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
                onOk={() => this.cropImage()}
                onCancel={() => this.Cancelfunc()}
              >
                <Cropper
                  src={fileList[0]}
                  style={{ height: 400, width: '100%' }}
                  preview=".img-preview"
                  aspectRatio={1 / 1}
                  guides={false}
                  ref={cropper => {
                    this.cropper = cropper;
                  }}
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
