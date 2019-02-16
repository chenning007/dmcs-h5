import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Upload, message, Icon, Form, Button, Input, Menu, Table, Avatar } from 'antd';
import { routerRedux } from 'dva/router';
import reqwest from 'reqwest';
import { getAuthority } from '../../utils/authority';
import { cookieToJson } from '../../utils/cookieToJson';
import { getSmpFormatDateByLong } from '../../utils/getFormDate';
// import { httpAddress } from '../../../public/constant';

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
    shortImageList: [],
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
    const { shortImageList } = this.state;
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

    if (type === 'fileimage') {
      title = form.getFieldValue('fileimagedescrip');
      description = form.getFieldValue('fileimagedescrip');
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

    // 对于图片大小的限制

    if (type === 'fileimage') {
      filesList.forEach(file => {
        formData.append('file', file);
      });
      imagesList.forEach(file => {
        formData.append('image', file);
      });
      shortImageList.forEach(file => {
        formData.append('shortimage', file);
      });
    }

    formData.append('title', title);
    formData.append('description', description);
    this.setState({ uploading: true });

    reqwest({
      url: type === 'fileimage' ? '/api/v1/file/addFileImage' : '/api/v1/file/addFile',
      method: 'post',
      processData: false,
      data: formData,

      success: () => {
        this.setState({
          filesList: [],
          imagesList: [],
          shortImageList: [],
          uploading: false,
          buAble1: false,
          buAble2: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          filesList: [],
          imagesList: [],
          uploading: false,
          buAble1: false,
          buAble2: false,
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

  DeleteFile(fileid) {
    const { dispatch } = this.props;
    dispatch({
      type: 'document/deleteFile',
      payload: {
        fileid,
        type: 'file',
      },
    });
  }

  DeleteImage(fileid) {
    const { dispatch } = this.props;
    dispatch({
      type: 'document/deleteImage',
      payload: {
        fileid,
        type: 'image',
      },
    });
  }

  DeleteFileImage(record) {
    const { dispatch } = this.props;
    if (record.createid !== undefined) {
      dispatch({
        type: 'document/deleteFileImage',
        payload: {
          createid: record.createid,
        },
      });
    }
  }

  render() {
    const { imagesList, filesList, shortImageList, buAble2, buAble1, contentType } = this.state;

    const { files, images, fileloading, imageloading, fileImages, loading } = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick} mode="horizontal" defaultSelectedKeys={['file']}>
        <Menu.Item key="file">文件上传</Menu.Item>
        <Menu.Item key="image">图片上传</Menu.Item>
        <Menu.Item key="fileimage">文件与图片绑定</Menu.Item>
      </Menu>
    );

    const showMenu = (
      <Menu onClick={this.handleShowClick} mode="horizontal">
        <Menu.Item key="file">文件显示</Menu.Item>
        <Menu.Item key="image">图片显示</Menu.Item>
        <Menu.Item key="fileimage">文件图片显示</Menu.Item>
      </Menu>
    );

    const filecolumns = [
      {
        title: '文件名称',
        key: 'filename',
        dataIndex: 'filename',
      },
      {
        title: '文件编号',
        key: 'fileid',
        dataIndex: 'fileid',
      },
      {
        title: '文件简介',
        key: 'filedescription',
        dataIndex: 'filedescription',
        render: text => <span style={{ textAlign: 'center' }}>{text}</span>,
      },
      {
        title: '添加时间',
        key: 'insertTime ',
        dataIndex: 'insertTime',
        render: text => {
          if (text !== null) {
            return <span>{getSmpFormatDateByLong(text, false)}</span>;
          } else {
            return <div />;
          }
        },
      },
      {
        title: '查看文件',
        key: 'filesrc',
        dataIndex: 'filesrc',
        render: text => (
          <a href={text} target="_blank" rel="noopener noreferrer">
            点击查看
          </a>
        ),
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: (_, record) => (
          <Button type="danger" onClick={() => this.DeleteFile(record.fileid)}>
            删除
          </Button>
        ),
      },
    ];

    const imagecolumns = [
      {
        key: 'avatar',
        dataIndex: 'filesrc',
        render: text => <Avatar src={text} shape="square" size="large" />,
      },
      {
        title: '图片名称',
        key: 'filename',
        dataIndex: 'filename',
      },
      {
        title: '图片编号',
        key: 'fileid',
        dataIndex: 'fileid',
      },
      {
        title: '图片简介',
        key: 'filedescription',
        dataIndex: 'filedescription',
        render: text => <span style={{ textAlign: 'center' }}>{text}</span>,
      },
      {
        title: '添加时间',
        key: 'insertTime ',
        dataIndex: 'insertTime',
        render: text => {
          if (text !== null) {
            return <span>{getSmpFormatDateByLong(text, false)}</span>;
          } else {
            return <div />;
          }
        },
      },
      {
        title: '图片查看',
        key: 'filesrc',
        dataIndex: 'filesrc',
        render: text => (
          <a href={text} target="_blank" rel="noopener noreferrer">
            点击查看
          </a>
        ),
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: (_, record) => (
          <Button type="danger" onClick={() => this.DeleteImage(record.fileid)}>
            删除
          </Button>
        ),
      },
    ];

    const fileimagecolumns = [
      {
        key: 'avatar',
        dataIndex: 'imagesrc',
        render: text => <Avatar src={text} shape="square" size="large" />,
      },
      {
        title: '简介',
        key: 'fileimagedescrip',
        dataIndex: 'fileimagedescrip',
      },
      {
        title: '查看文件',
        key: 'filename',
        dataIndex: 'filename',
        render: (text, record) => (
          <a href={record.filesrc} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ),
      },
      {
        title: '查看图片',
        key: 'imagename',
        dataIndex: 'imagename',
        render: (text, record) => (
          <a href={record.imagesrc} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ),
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: (_, record) => (
          <Button type="danger" onClick={() => this.DeleteFileImage(record)}>
            删除
          </Button>
        ),
      },
    ];

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

    const props3 = {
      action: '/api/v1/file/addFile',
      accept: 'image/*',
      onRemove: file => {
        this.setState(() => {
          const index = shortImageList.indexOf(file);
          const newFileList = shortImageList.slice();
          newFileList.splice(index, 1);
          return {
            shortImageList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState({
          shortImageList: [...shortImageList, file],
        });
        return false;
      },
      fileList: shortImageList,
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
          {contentType === 'fileimage' && (
            <div>
              <Upload {...props2}>
                <Button disabled={buAble2}>
                  <Icon type="upload" />
                  上传文件
                </Button>
              </Upload>
              <Upload {...props3}>
                <Button disabled={!buAble2 || buAble1}>
                  <Icon type="upload" />
                  文件附加图片
                </Button>
              </Upload>
              <Upload {...props1}>
                <Button disabled={buAble1}>
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
                  {getFieldDecorator('fileimagedescrip', {
                    rules: [
                      {
                        required: true,
                        message: '绑定关系说明',
                      },
                    ],
                  })(<Input placeholder="文件与图片关系说明" />)}
                </Form.Item>
                <Button
                  type="primary"
                  onClick={() => this.handleUpload('fileimage')}
                  disabled={imagesList.length === 0 || filesList.length === 0}
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
          {showType === 'file' && (
            <Table columns={filecolumns} dataSource={files} loading={fileloading} rowKey="fileid" />
          )}
          {showType === 'image' && (
            <Table
              columns={imagecolumns}
              dataSource={images}
              loading={imageloading}
              rowKey="fileid"
            />
          )}
          {showType === 'fileimage' && (
            <Table
              columns={fileimagecolumns}
              dataSource={fileImages}
              loading={loading}
              rowKey="createid"
            />
          )}
        </Card>
      </div>
    );
  }
}
