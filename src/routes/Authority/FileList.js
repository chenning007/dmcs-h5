import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Table, Icon, Button, message } from 'antd';
import { routerRedux } from 'dva/router';
import { getAuthority } from '../../utils/authority';
import { cookieToJson } from '../../utils/cookieToJson';
import { httpAddress } from '../../../public/constant';

@connect(state => ({
  files: state.document.files,
  document: state.document,
}))
export default class FileList extends PureComponent {
  state = {
    loading: true,
    files: [],
    fuzhi: true,
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

  /* componentDidMount() {
    const { files = [] } = this.props;
    this.setState({ files: [...files], loading: false });
  } */

  componentWillReceiveProps(nextProps) {
    const { fuzhi } = this.state;
    if (fuzhi && nextProps.document.files.length > 0) {
      this.setState({ files: [...nextProps.document.files], loading: false, fuzhi: false });
    }
  }

  DeleteFile(fileid) {
    let Files = [];
    const { dispatch } = this.props;
    const { files } = this.state;
    this.setState({ loading: true });
    // console.log(fileid);
    Files = [...files];
    for (let i = 0; i < Files.length; i += 1) {
      if (Files[i].fileid === fileid) Files.splice(i, 1);
      break;
    }
    dispatch({
      type: 'document/deleteFile',
      payload: {
        fileid,
      },
    });
    this.setState({ files: [...Files], loading: false });
  }

  ReturnRouter() {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/authority/manage_file'));
  }

  render() {
    const { files = [], loading } = this.state;
    const columns = [
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
        title: '查看文件',
        key: 'filesrc',
        dataIndex: 'filesrc',
        render: text => (
          <a href={httpAddress + text} target="_blank" rel="noopener noreferrer">
            {text}
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

    return (
      <Card
        title="文件列表"
        extra={
          <Button type="primary" onClick={() => this.ReturnRouter()}>
            <Icon type="rollback" />
          </Button>
        }
      >
        <Table columns={columns} dataSource={files} loading={loading} rowKey="fileid" />
      </Card>
    );
  }
}
