import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, List, Avatar, Upload, message, Icon, Form, Button, Input } from 'antd';
import { routerRedux } from 'dva/router';
import reqwest from 'reqwest';
import { getAuthority } from '../../utils/authority';
import { cookieToJson } from '../../utils/cookieToJson';

const source_title = [
  { id: 1, title: 'DMCS简介-管理' },
  { id: 2, title: '解决方案-管理' },
  { id: 3, title: '科研成果-管理' },
  { id: 4, title: '设计案例-管理' },
  { id: 5, title: '合作方式-管理' },
  { id: 6, title: '软件下载-管理' },
  { id: 7, title: '资料下载-管理' },
  { id: 8, title: '合作规则-管理' },
  { id: 9, title: '合作留言-管理' },
];

const source_data = [
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
];

@connect(state => ({
  tem_id: state.tem_store.tem_id,
  document: state.document,
}))
@Form.create()
export default class Manage_file extends PureComponent {
  state = {
    data: [],
    add_delete:false, //判断上传还是删除操作
    loading: true,
    fileList: [],
    imageList: [],
    uploading: false,
    bu_able_1: false, //是否禁止上传图片
    bu_able_2: false, //是否禁止上传文件
    documents: [],
  };

  componentWillMount() {
    const { dispatch } = this.props;
    let authority = getAuthority();
    let cookie = cookieToJson();
    if ((authority !== 'admin' && authority !== 'host') || cookie.admin_token === undefined) {
      dispatch(routerRedux.push('/exception/403'));
      message.error('权限错误或身份无法验证');
    }
  }

  componentDidMount() {
    const { tem_id, dispatch } = this.props;
    if (tem_id === undefined) {
      dispatch(routerRedux.push('/authority/manage_list'));
      message.error('权限验证错误, 无法访问该页面');
    }
    if (tem_id !== undefined) {
      dispatch({
        type: 'document/getDocument',
        payload: {
          authority: tem_id,
        },
      });
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tem_store/clear',
    });
    dispatch({
      type: 'document/clear',
    });
  }

  componentWillReceiveProps(nextProps) {
    if ( (nextProps.document.tech_document.length > this.state.documents.length) ) {
      this.setState({ documents: [...nextProps.document.tech_document] });
      this.setState({loading: false});
    }
    if( (nextProps.document.tech_document.length < this.state.documents.length)&&(this.state.add_delete)) {
      this.setState({ documents: [...nextProps.document.tech_document] });
      this.setState({loading: false});
    }
  }

  onChangefile(key) {
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
    this.setState({add_delete:true});
  }

  handleUpload = () => {
    const { fileList, imageList } = this.state;
    const { form, tem_id, dispatch } = this.props;
    const title = form.getFieldValue('title');
    const description = form.getFieldValue('description');
    if (tem_id === undefined) {
      dispatch(routerRedux.push('/authority/manage_list'))
      return message.error('页面模式载入出现错误!!!');
    }
    if (!title || !description) {
      return message.error('未完整输入文档信息!!!');
    }
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file);
    });
    imageList.forEach(file => {
      formData.append('image', file);
    });
    let cookie = cookieToJson();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('identityNumber', tem_id);
    //formData.append('cookie', cookie);
    this.setState({ uploading: true });

    reqwest({
      url: '/api/v1/admin/addocument',
      method: 'post',
      processData: false,
      data: formData,

      success: resp => {
        this.setState({
          fileList: [],
          imageList: [],
          uploading: false,
          bu_able_1: false,
          bu_able_2: false,
          add_delete:false,
        });
        this.setState({
          documents: resp.data,
        })
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
  /**
   *
   */
  render() {
    const props1 = {
      action: '/api/v1/admin/addocument',
      accept: 'image/*',
      //listType: 'picture',
      beforeUpload: file => {
        this.setState({ bu_able_1: true });
        this.setState(({ imageList }) => ({
          imageList: [...imageList, file],
        }));
        return false;
      },
      fileList: this.state.imageList,
    };
    const props2 = {
      action: '/api/v1/tech_document/addocument',
      beforeUpload: file => {
        this.setState({ bu_able_2: true });
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };
    const { tem_id } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { uploading, documents } = this.state;
    return (
      <div>
        <Card>
          <List
            loading={this.state.loading}
            header={
              tem_id===undefined? '未知': source_title[tem_id-1].title
            }
            itemLayout="horizontal"
            dataSource={documents}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button type="danger" onClick={() => this.onChangefile(item.id)}>
                    删除
                  </Button>,
                ]}
              >
                <span>
                  <List.Item.Meta
                    avatar={<Avatar src={item.image_address} size="large" />}
                    title={item.title}
                  />
                </span>
                <span style={{ marginLeft: 200, width: 300 }}>
                  <h3>{item.description}</h3>
                </span>
              </List.Item>
            )}
          />
        </Card>
        <Card style={{ marginTop: 28 }} title="上传文件">
          <Upload {...props1}>
            <Button disabled={this.state.bu_able_1}>
              <Icon type="upload" />
              上传图片
            </Button>
          </Upload>
          <Upload {...props2}>
            <Button disabled={this.state.bu_able_2}>
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
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '输入文档标题',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              colon={false}
              labelCol={{ span: 4, offset: 0 }}
              wrapperCol={{ span: 8, offset: 2 }}
              label={<b>描述:</b>}
            >
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '简要描述内容',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Form>
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={this.state.imageList.length === 0 || this.state.fileList.length === 0}
            loading={uploading}
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>
        </Card>
      </div>
    );
  }
}
