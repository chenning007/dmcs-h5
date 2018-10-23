import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Icon, Button, Table, Avatar, message } from 'antd';
import { routerRedux } from 'dva/router';
import { getAuthority } from '../../utils/authority';
import { cookieToJson } from '../../utils/cookieToJson';
import { getSmpFormatDateByLong } from '../../utils/getFormDate';
import { httpAddress } from '../../../public/constant';

@connect(state => ({
  images: state.document.images,
  document: state.document,
}))
export default class ImageList extends PureComponent {
  state = {
    loading: true,
    images: [],
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

  componentWillReceiveProps(nextProps) {
    const { fuzhi } = this.state;

    if (fuzhi && nextProps.document.images.length > 0) {
      this.setState({ images: [...nextProps.document.images], loading: false, fuzhi: false });
    }
  }

  DeleteFile(fileid) {
    let Images = [];
    const { dispatch } = this.props;
    const { images } = this.state;
    this.setState({ loading: true });
    Images = [...images];
    for (let i = 0; i < Images.length; i += 1) {
      if (Images[i].fileid === fileid) Images.splice(i, 1);
      break;
    }
    dispatch({
      type: 'document/deleteFile',
      payload: {
        fileid,
      },
    });
    this.setState({ images: [...Images], loading: false });
  }

  ReturnRouter() {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/authority/manage_file'));
  }

  render() {
    const { images = [], loading } = this.state;

    const columns = [
      {
        key: 'avatar',
        dataIndex: 'filesrc',
        render: text => <Avatar src={httpAddress + text} shape="square" size="large" />,
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
          <a href={httpAddress + text} target="_blank" rel="noopener noreferrer">
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

    return (
      <Card
        title="上传图片"
        extra={
          <Button type="primary" onClick={() => this.ReturnRouter()}>
            <Icon type="rollback" />
          </Button>
        }
      >
        <Table columns={columns} dataSource={images} loading={loading} rowKey="fileid" />
      </Card>
    );
  }
}
