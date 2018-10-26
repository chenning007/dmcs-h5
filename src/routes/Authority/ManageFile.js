import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Upload, message, Icon, Form, Button, Input, Menu } from 'antd';
import { routerRedux } from 'dva/router';
import reqwest from 'reqwest';
import { getAuthority } from '../../utils/authority';
import { cookieToJson } from '../../utils/cookieToJson';

@connect(state => ({
  loding: state.document.loading,
  fileloding: state.document.fileloading,
  imageloading: state.document.imageloading,
  files: state.document.files,
  images: state.document.images,
  fileImages: state.document.fileImages,
}))
@Form.create()
export default class ManageFile extends PureComponent {
  state = {
    filesList: [],
    imagesList: [],
    uploading: false,
    buAble1: false, // 是否禁止上传图片
    buAble2: false, // 是否禁止上传文件
    contentType: 'file',
    showType: 'nofile',
  };

  componentWillMount() {
    const { dispatch } = this.props;
    const authority = getAuthority();
    const cookie = cookieToJson();
    if ((authority !== 'admin' && authority !== 'host') || cookie.admin_token === undefined) {
      dispatch(routerRedux.push('/exception/403'));
      message.error('权限错误或身份无法验证');
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'document/getFileToken',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'document/clear',
    });
  }

  handleMenuClick = e => {
    const key = e.key;
    this.setState({
      contentType: key,
    });
  };

  handleShowClick = e => {
    const key = e.key;
    const { dispatch } = this.props;
    this.setState({
      showType: key,
    });
    if (key === 'file') {
      dispatch({
        type: 'document/getFilelist',
      });
    }
    if (key === 'image') {
      dispatch({
        type: 'document/getImagelist',
      });
    }
    if (key === 'fileimage') {
      dispatch({
        type: 'document/getCommonFileImage',
      });
    }
  };

  handleUpload = type => {
    const { filesList, imagesList } = this.state;
    const { form } = this.props;
    let title = null;
    let description = null;

    if (type === 'file') {
      title = form.getFieldValue('filename');
      description = form.getFieldValue('filedescription');
    }

    if (type === 'image') {
      title = form.getFieldValue('imagename');
      description = form.getFieldValue('imagedescription');
    }

    if (!title || !description) {
      return message.error('未完整输入文档信息!!!');
    }

    const formData = new FormData();
    if (type === 'file') {
      filesList.forEach(file => {
        formData.append('file', file);
      });
    }
    if (type === 'image') {
      imagesList.forEach(file => {
        formData.append('file', file);
      });
    }
    formData.append('title', title);
    formData.append('description', description);
    this.setState({ uploading: true });

    reqwest({
      url: '/api/v1/file/addFile',
      method: 'post',
      processData: false,
      data: formData,

      success: () => {
        this.setState({
          filesList: [],
          imagesList: [],
          uploading: false,
          buAble1: false,
          buAble2: false,
        });
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

  ToFileImage = type => {
    const { dispatch } = this.props;
    if (type === 'file') {
      dispatch({
        type: 'document/getFilelist',
      });
      dispatch(routerRedux.push('/authority/fileList'));
    }
    if (type === 'image') {
      dispatch({
        type: 'document/getImagelist',
      });
      dispatch(routerRedux.push('/authority/imageList'));
    }
  };

  ReturnRouter() {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/authority/manage_list'));
  }

  render() {
    const { imagesList, filesList, buAble2, buAble1, contentType } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} mode="horizontal" defaultSelectedKeys={['file']}>
        <Menu.Item key="file">文件上传</Menu.Item>
        <Menu.Item key="image">图片上传</Menu.Item>
        <Menu.Item key="fileImage">文件与图片绑定</Menu.Item>
      </Menu>
    );

    const showMenu = (
      <Menu onClick={this.handleShowClick} mode="horizontal">
        <Menu.Item key="file">文件显示</Menu.Item>
        <Menu.Item key="image">图片显示</Menu.Item>
        <Menu.Item key="fileImage">文件图片显示</Menu.Item>
      </Menu>
    );

    const props1 = {
      action: '/api/v1/file/addFile',
      accept: 'image/*',
      onRemove: file => {
        this.setState(() => {
          const index = imagesList.indexOf(file);
          const newFileList = imagesList.slice();
          newFileList.splice(index, 1);
          return {
            imagesList: newFileList,
            buAble1: false,
          };
        });
      },
      beforeUpload: file => {
        this.setState({ buAble1: true });
        this.setState({
          imagesList: [...imagesList, file],
        });
        return false;
      },
      fileList: imagesList,
    };
    const props2 = {
      action: '/api/v1/file/addFile',
      accept: 'text/html, .pdf',
      onRemove: file => {
        this.setState(() => {
          const index = filesList.indexOf(file);
          const newFileList = filesList.slice();
          newFileList.splice(index, 1);
          return {
            filesList: newFileList,
            buAble2: false,
          };
        });
      },
      beforeUpload: file => {
        this.setState({ buAble2: true });
        this.setState({
          filesList: [...filesList, file],
        });
        return false;
      },
      fileList: filesList,
    };
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { uploading, showType } = this.state;
    return (
      <div>
        <Card
          title={menu}
          extra={
            <Button type="primary" onClick={() => this.ReturnRouter()}>
              <Icon type="rollback" />
            </Button>
          }
        >
          {contentType === 'file' && (
            <div>
              <Upload {...props2}>
                <Button disabled={buAble2 || buAble1}>
                  <Icon type="upload" />
                  上传文件
                </Button>
              </Upload>
              <Form>
                <Form.Item
                  colon={false}
                  labelCol={{ span: 4, offset: 0 }}
                  wrapperCol={{ span: 8, offset: 2 }}
                  label={<b>标题:</b>}
                >
                  {getFieldDecorator('filename', {
                    rules: [
                      {
                        required: true,
                        message: '输入文档标题',
                      },
                    ],
                  })(<Input placeholder="输入文档标题" />)}
                </Form.Item>
                <Form.Item
                  colon={false}
                  labelCol={{ span: 4, offset: 0 }}
                  wrapperCol={{ span: 8, offset: 2 }}
                  label={<b>描述:</b>}
                >
                  {getFieldDecorator('filedescription', {
                    rules: [
                      {
                        required: true,
                        message: '输入描述内容',
                      },
                    ],
                  })(<Input placeholder="简要描述文档内容" />)}
                </Form.Item>
              </Form>
              <Button
                type="primary"
                onClick={() => this.handleUpload('file')}
                disabled={filesList.length === 0}
                loading={uploading}
              >
                {uploading ? '上传' : '开始上传'}
              </Button>
            </div>
          )}
          {contentType === 'image' && (
            <div>
              <Upload {...props1}>
                <Button disabled={buAble2 || buAble1}>
                  <Icon type="upload" />
                  上传图片
                </Button>
              </Upload>
              <Form>
                <Form.Item
                  colon={false}
                  labelCol={{ span: 4, offset: 0 }}
                  wrapperCol={{ span: 8, offset: 2 }}
                  label={<b>标题:</b>}
                >
                  {getFieldDecorator('imagename', {
                    rules: [
                      {
                        required: true,
                        message: '输入图片标题',
                      },
                    ],
                  })(<Input placeholder="输入图片标题" />)}
                </Form.Item>
                <Form.Item
                  colon={false}
                  labelCol={{ span: 4, offset: 0 }}
                  wrapperCol={{ span: 8, offset: 2 }}
                  label={<b>描述:</b>}
                >
                  {getFieldDecorator('imagedescription', {
                    rules: [
                      {
                        required: true,
                        message: '输入图片描述内容',
                      },
                    ],
                  })(<Input placeholder="简要描述图片内容" />)}
                </Form.Item>
                <Button
                  type="primary"
                  onClick={() => this.handleUpload('image')}
                  disabled={imagesList.length === 0}
                  loading={uploading}
                >
                  {uploading ? '上传' : '开始上传'}
                </Button>
              </Form>
            </div>
          )}
        </Card>
        <Card style={{ marginTop: 12 }} title={showMenu}>
          {showType === 'nofile' && <span>选择显示的内容</span>}
        </Card>
      </div>
    );
  }
}
