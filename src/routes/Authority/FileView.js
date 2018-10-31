import React, { PureComponent, Fragment } from 'react';
import { Table, Avatar, Button, Icon, Tooltip, Switch } from 'antd';

import { httpAddress } from '../../../public/constant';

export default class FileView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: Array.isArray(props.value) ? props.value : [],
      loading: false,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  // 这里还需要对数组进行重排才可以

  handleUp(record) {
    const { data = [] } = this.state;
    const newData = data.map(item => ({ ...item }));

    if (data.length !== undefined && data.length !== null && data.length > 0) {
      if (record.orderid !== 1 && record.orderid !== 0) {
        const id = record.orderid;
        const fileWindow = { ...newData[id - 1] };

        newData[id - 1] = newData[id - 2];
        newData[id - 2] = fileWindow;

        newData[id - 1].orderid += 1;
        newData[id - 2].orderid -= 1;

        this.setState({ data: [...newData] });
      }
    }
  }

  handleDown(record) {
    const { data = [] } = this.state;
    const newData = data.map(item => ({ ...item }));

    if (data.length !== undefined && data.length !== null && data.length > 0) {
      if (record.orderid !== data.length) {
        const id = record.orderid;
        const fileWindow = { ...newData[id - 1] };

        newData[id - 1] = newData[id];
        newData[id] = fileWindow;

        newData[id - 1].orderid -= 1;
        newData[id].orderid += 1;

        this.setState({ data: [...newData] });
      }
    }
  }

  handleChangeView(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e ? 'true' : 'false';
      this.setState({ data: newData });
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
        render: (view, record) => (
          <span>
            <Switch
              checkedChildren={<Icon type="check" />}
              defaultChecked={view !== 'false'}
              unCheckedChildren={<Icon type="cross" />}
              onChange={e => this.handleChangeView(e, 'viewed', record.key)}
            />
          </span>
        ),
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
