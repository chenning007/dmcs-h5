import React, { PureComponent, Fragment } from 'react';
import { Table, Avatar, Button, Icon, Tooltip } from 'antd';

import { httpAddress } from '../../../public/constant';

export default class FileView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: Array.isArray(props.value) ? props.value : [],
      loading: false,
    };
  }

  // 这里还需要对数组进行重排才可以

  handleUp(record) {
    const { data = [] } = this.state;
    const newData = data.map(item => ({ ...item }));

    if (data.length !== undefined && data.length !== null && data.length > 0) {
      if (record.orderid !== 1 && record.orderid !== 0) {
        const id = record.orderid;
        newData[id - 2].orderid = id;
        newData[id - 1].orderid = id - 1;
        this.setState({ data: newData });
      }
    }
  }

  handleDown(record) {
    const { data = [] } = this.state;
    const newData = data.map(item => ({ ...item }));

    if (data.length !== undefined && data.length !== null && data.length > 0) {
      if (record.orderid !== data.length) {
        const id = record.orderid;
        newData[id - 1].orderid = id + 1;
        newData[id].orderid = id;
        this.setState({ data: newData });
      }
    }
  }

  render() {
    const { loading, data = [] } = this.state;
    const columns = [
      {
        key: 'avatar',
        dataIndex: 'imagesrc',
        width: '10%',
        render: text => <Avatar src={httpAddress + text} shape="square" size="large" />,
      },
      {
        title: '简介',
        key: 'fileimagedescrip',
        width: '20%',
        dataIndex: 'fileimagedescrip',
      },
      {
        title: '文件名',
        key: 'filename',
        width: '15%',
        dataIndex: 'filename',
        render: (text, record) => (
          <a href={httpAddress + record.filesrc} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ),
      },
      {
        title: '图片名',
        key: 'imagename',
        width: '15%',
        dataIndex: 'imagename',
        render: (text, record) => (
          <a href={httpAddress + record.imagesrc} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ),
      },
      {
        title: '可视性',
        key: 'viewed',
        width: '15%',
        dataIndex: 'viewed',
      },
      {
        title: '排序',
        key: 'orderid',
        width: '5%',
        dataIndex: 'orderid',
        sortOrder: 'ascend', // 这里在后台需要处理一下
        render: (text, record) => (
          <div>
            <Tooltip placement="top" title="上升">
              <Button disabled={record.orderid === 1} onClick={() => this.handleUp(record)}>
                <Icon type="up" />
              </Button>
            </Tooltip>
            <Tooltip placement="bottom" title="下降">
              <Button
                disabled={record.orderid === data.length}
                onClick={() => this.handleDown(record)}
              >
                <Icon type="down" />
              </Button>
            </Tooltip>
          </div>
        ),
      },
      {
        title: '操作',
        key: 'action',
        width: '20%',
        dataIndex: 'action',
        render: (_, record) => (
          <Button type="danger" onClick={() => this.DeleteFileImage(record)}>
            删除
          </Button>
        ),
      },
    ];
    return (
      <Fragment>
        <Table loading={loading} columns={columns} dataSource={data} rowKey="createid" />
      </Fragment>
    );
  }
}
