import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Upload, message, Icon, Form, Button, Input } from 'antd';
import { routerRedux } from 'dva/router';
import reqwest from 'reqwest';
import { getAuthority } from '../../utils/authority';
import { cookieToJson } from '../../utils/cookieToJson';
/* const source_title = [
  { id: 1, title: 'DMCS简介-管理' },
  { id: 2, title: '解决方案-管理' },
  { id: 3, title: '科研成果-管理' },
  { id: 4, title: '设计案例-管理' },
  { id: 5, title: '合作方式-管理' },
  { id: 6, title: '软件下载-管理' },
  { id: 7, title: '资料下载-管理' },
  { id: 8, title: '合作规则-管理' },
  { id: 9, title: '合作留言-管理' },
]; */

/* const source_data = [
  {
    id: 1,
    image_address: 'http://39.104.208.4/image/firstpage/shili1.png',
    description: 'IPT70135/6/7测控节点电路封装盒',
    document_address: '',
    title: '',
  },
  {
    id: 2,
    image_address: 'http://39.104.208.4/image/firstpage/shili2.png',
    description: 'IPT10533/10550 3.3V/5.0V非隔离式电源转换',
    document_address: '',
    title: '',
  },
  {
    id: 3,
    image_address: 'http://39.104.208.4/image/firstpage/shili3.png',
    description: 'IPT12105 IPCAN总线供电转换模块',
    document_address: '',
    title: '',
  },
  {
    id: 4,
    image_address: 'http://39.104.208.4/image/firstpage/shili4.png',
    description: 'IPT22105/22106 IPCAN电源转换节点',
    document_address: '',
    title: '',
  },
  {
    id: 5,
    image_address: 'http://39.104.208.4/image/firstpage/shili5.png',
    description: 'IPT70540 PCB表贴植锡丝印台',
    document_address: '',
    title: '',
  },
]; */

@connect(state => ({
  document: state.document,
}))
@Form.create()
export default class ManageFile extends PureComponent {
  state = {
    filesList: [],
    imagesList: [],
    uploading: false,
    buAble1: false, // 是否禁止上传图片
    buAble2: false, // 是否禁止上传文件
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

  /* componentWillReceiveProps(nextProps) {
    if ( (nextProps.document.tech_document.length > this.state.documents.length) ) {
      this.setState({ documents: [...nextProps.document.tech_document] });
      this.setState({loading: false});
    }
    if( (nextProps.document.tech_document.length < this.state.documents.length)&&(this.state.add_delete)) {
      this.setState({ documents: [...nextProps.document.tech_document] });
      this.setState({loading: false, add_delete:false,});
    }
  } */

  /* onChangefile(key) {
    const { dispatch, tem_id } = this.props;
    let cookie = cookieToJson();
    dispatch({
      type: 'document/deleteDocument',
      payload: {
        cookie,
        authority: tem_id,
        documentId: key,
      },
    });
    this.setState({add_delete:true, loading: true});
  } */

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
  /**
   *
   */

  render() {
    const { imagesList, filesList, buAble2, buAble1 } = this.state;
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
    const { uploading } = this.state;
    return (
      <div>
        <Card
          title="文件"
          extra={
            <Button type="primary" onClick={() => this.ReturnRouter()}>
              <Icon type="rollback" />
            </Button>
          }
        >
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
        </Card>
        <Card style={{ marginTop: 12 }} title="图片">
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
        </Card>
        <Card style={{ marginTop: 12, textAlign: 'center' }}>
          <Button type="primary" block onClick={() => this.ToFileImage('file')}>
            查看文件
          </Button>
        </Card>
        <Card style={{ marginTop: 12, textAlign: 'center' }}>
          <Button type="primary" block onClick={() => this.ToFileImage('image')}>
            查看图片
          </Button>
        </Card>
      </div>
    );
  }
}
