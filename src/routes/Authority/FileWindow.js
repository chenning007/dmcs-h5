import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, Radio, Menu, Dropdown, Table, Avatar, Tooltip, message } from 'antd';
import { routerRedux } from 'dva/router';
import { getAuthority } from '../../utils/authority';
import { ShowTitle } from '../../utils/ShowTitle';
// import { httpAddress } from '../../../public/constant';

function checkValueExist(value) {
  switch (value) {
    case 'aa':
    case 'ab':
    case 'ac':
    case 'ad':
    case 'ae':
    case 'b':
    case 'c':
    case 'd':
    case 'e':
    case 'f':
    case 'g':
    case 'h':
    case 'i':
      return 1;
    default:
      return 0;
  }
}

@connect(state => ({
  temid: state.tem_store.temid,
  fileImages: state.document.fileImages,
  loading: state.document.loading,
  files: state.document.files,
  fileloading: state.document.fileloading,
}))
export default class FileWindow extends PureComponent {
  state = {
    valueSelect: 'a',
    selectFileRowkeys: [],
  };

  componentWillMount() {
    const { temid, dispatch } = this.props;
    const authority = getAuthority();
    if (authority !== 'admin' && authority !== 'host') {
      dispatch(routerRedux.push('/exception/403'));
    } else if (temid !== 2) {
      dispatch(routerRedux.push('/authority/manage_list'));
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'document/getCommonFileImage',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'document/clear',
    });
  }

  /* DeleteFileWindow(createid) {
    this.setState({createid});
    console.log(`${createid}`);
  } */

  handleMenuClick = e => {
    const key = e.key;
    this.setState({
      valueSelect: key,
    });
    this.GetFileImage(key);
  };

  handleRadio = e => {
    this.setState({
      valueSelect: e.target.value,
    });
    this.GetFileImage(e.target.value);
  };

  /* 添加选择按钮 */
  /* 注意到setState()在handleRadio函数中可能不同步 */

  onSelectedFileChange = selectedRowkeys => {
    this.setState({ selectFileRowkeys: [...selectedRowkeys] });
  };

  ReturnRouter() {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/authority/manage_list'));
  }

  GetFileImage(valueSelect) {
    const { dispatch } = this.props;
    if (checkValueExist(valueSelect) === 1)
      dispatch({
        type: 'document/getFileImage',
        payload: {
          module: valueSelect,
        },
      });
  }

  GetNewCommonFileImage() {
    const { dispatch } = this.props;
    dispatch({
      type: 'document/getCommonFileImage',
    });
  }

  DeleteFileImage(record) {
    const { dispatch } = this.props;
    if (record.createid !== undefined) {
      dispatch({
        type: 'document/updateFileImage',
        payload: {
          createid: record.createid,
          valueSelect: 'a',
        },
      });
    }
  }

  AddFileImage() {
    const { dispatch } = this.props;
    const { selectFileRowkeys, valueSelect } = this.state;
    if (checkValueExist(valueSelect) === 0) {
      message.error('选择窗口');
    }
    if (checkValueExist(valueSelect) === 1) {
      if (selectFileRowkeys.length === 1) {
        dispatch({
          type: 'document/updateFileImage',
          payload: {
            createid: selectFileRowkeys[0],
            valueSelect,
          },
        });
        this.setState({ selectFileRowkeys: [] });
      }
    }
  }

  Extracontent() {
    const { selectFileRowkeys } = this.state;
    if (selectFileRowkeys !== null && selectFileRowkeys.length === 1) {
      return (
        <Tooltip placement="top" title="添加">
          <Button type="primary" onClick={() => this.AddFileImage()}>
            添加
          </Button>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip placement="top" title="刷新列表数据">
          <Button type="primary" onClick={() => this.GetNewCommonFileImage()}>
            <Icon type="retweet" />
          </Button>
        </Tooltip>
      );
    }
  }

  render() {
    const { valueSelect, selectFileRowkeys } = this.state;
    const { fileImages, loading, files, fileloading } = this.props;

    const columns = [
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
        title: '文件名',
        key: 'filename',
        dataIndex: 'filename',
        render: (text, record) => (
          <a href={record.filesrc} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ),
      },
      {
        title: '图片名',
        key: 'imagename',
        dataIndex: 'imagename',
        render: (text, record) => (
          <a href={record.imagesrc} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ),
      },
      { title: '可视性', key: 'viewed', dataIndex: 'viewed' },
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

    const othercolumns = [
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
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="ae">模块0</Menu.Item>
        <Menu.Item key="aa">模块1</Menu.Item>
        <Menu.Item key="ab">模块2</Menu.Item>
        <Menu.Item key="ac">模块3</Menu.Item>
        <Menu.Item key="ad">模块4</Menu.Item>
      </Menu>
    );

    const fileimageRowSelection = {
      selectFileRowkeys,
      onChange: this.onSelectedFileChange,
      hideDefaultSelections: true,
      type: 'radio',
    };

    return (
      <div>
        <Card
          title="文件绑定"
          extra={
            <Tooltip placement="top" title="返回">
              <Button type="primary" onClick={() => this.ReturnRouter()}>
                <Icon type="rollback" />
              </Button>
            </Tooltip>
          }
        >
          <Radio.Group value={valueSelect} onChange={this.handleRadio} size="large">
            <Dropdown overlay={menu}>
              <Radio.Button>首页窗口</Radio.Button>
            </Dropdown>
            <Radio.Button value="b">第二窗口 </Radio.Button>
            <Radio.Button value="c">第三窗口 </Radio.Button>
            <Radio.Button value="d">第四窗口 </Radio.Button>
            <Radio.Button value="e">第五窗口 </Radio.Button>
            <Radio.Button value="f">第六窗口 </Radio.Button>
            <Radio.Button value="g">第七窗口 </Radio.Button>
            <Radio.Button value="h">第八窗口 </Radio.Button>
            <Radio.Button value="i">第九窗口 </Radio.Button>
          </Radio.Group>
        </Card>
        <Card style={{ marginTop: 4 }} title={ShowTitle(valueSelect)}>
          <Table columns={columns} dataSource={files} loading={fileloading} rowKey="createid" />
        </Card>
        <Card style={{ marginTop: 4 }} title="未绑定窗口的数据" extra={this.Extracontent()}>
          <Table
            columns={othercolumns}
            dataSource={fileImages}
            loading={loading}
            rowKey="createid"
            rowSelection={fileimageRowSelection}
          />
        </Card>
      </div>
    );
  }
}
