import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, Radio, Menu, Dropdown, Table, Avatar, Tooltip, message } from 'antd';
import { routerRedux } from 'dva/router';
import { getAuthority } from '../../utils/authority';
import { httpAddress } from '../../../public/constant';

// const columns = [{ title: '编号' }];

function checkValueExist(value) {
  switch (value) {
    case 'aa':
    case 'ab':
    case 'ac':
    case 'ad':
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
  fileloading: state.document.fileloading,
  imageloading: state.document.imageloading,
  files: state.document.files,
  images: state.document.images,
}))
export default class FileWindow extends PureComponent {
  state = {
    valueSelect: 'a',
    showList: false, // 为false的时候则显示module形式对应的table.如果为true则进行文件的添加操作
    selectFileRowkeys: [],
    selectImageRowkeys: [],
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
      type: 'document/getFilelist',
    });
    dispatch({
      type: 'document/getImagelist',
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
      showList: false,
      selectFileRowkeys: [],
      selectImageRowkeys: [],
    });
    this.GetFileImage(key);
  };

  handleRadio = e => {
    this.setState({
      valueSelect: e.target.value,
      showList: false,
      selectFileRowkeys: [],
      selectImageRowkeys: [],
    });
    this.GetFileImage(e.target.value);
  };

  /* 添加选择按钮 */
  /* 注意到setState()在handleRadio函数中可能不同步 */

  onSelectedFileChange = selectedRowkeys => {
    this.setState({ selectFileRowkeys: [...selectedRowkeys] });
  };

  onSelectedImageChange = selectedRowkeys => {
    this.setState({ selectImageRowkeys: [...selectedRowkeys] });
  };

  showTitle() {
    const { valueSelect } = this.state;

    switch (valueSelect) {
      case 'aa':
        return '第一窗口/第一模块';
      case 'ab':
        return '第一窗口/第二模块';
      case 'ac':
        return '第一窗口/第三模块';
      case 'ad':
        return '第一窗口/第四模块';
      case 'b':
        return '第二窗口';
      case 'c':
        return '第三窗口';
      case 'd':
        return '第四窗口';
      case 'e':
        return '第五窗口';
      case 'f':
        return '第六窗口';
      case 'g':
        return '第七窗口';
      case 'h':
        return '第八窗口';
      case 'i':
        return '第九窗口';
      default:
        return '请选择窗口及模块';
    }
  }

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

  HandleFileWindow() {
    const { valueSelect } = this.state;
    if (checkValueExist(valueSelect) === 1) this.setState({ showList: true });
    else {
      message.error('选择窗口');
    }
  }

  AddFileImage() {
    const { selectFileRowkeys, selectImageRowkeys, valueSelect } = this.state;
    const { dispatch } = this.props;
    const fileid = selectFileRowkeys[0];
    const imageid = selectImageRowkeys[0];
    if (fileid !== undefined && imageid !== undefined && valueSelect !== undefined) {
      dispatch({
        type: 'document/addFileImage',
        payload: {
          valueSelect,
          fileid,
          imageid,
        },
      });
      this.setState({ selectFileRowkeys: [], selectImageRowkeys: [], showList: false });
    }
  }

  render() {
    const { valueSelect, showList, selectFileRowkeys, selectImageRowkeys } = this.state;
    const { fileImages, loading, fileloading, imageloading, files, images } = this.props;
    const columns = [
      { title: '编号', key: 'fileimage', dataIndex: 'fileimage' },
      {
        title: '文件名',
        key: 'filename',
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
        dataIndex: 'imagename',
        render: (text, record) => (
          <a href={httpAddress + record.imagesrc} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ),
      },
      { title: '可视性', key: 'viewed', dataIndex: 'viewed' },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: () => <Button type="danger">删除</Button>,
      },
    ];

    const fileColumns = [
      { title: '文件名称', key: 'filename', dataIndex: 'filename' },
      { title: '文件编号', key: 'fileid', dataIndex: 'fileid' },
      { title: '文件简介', key: 'filedescription', dataIndex: 'filedescription' },
      {
        title: '查看文件',
        key: 'filesrc',
        dataIndex: 'filesrc',
        render: text => (
          <a href={httpAddress + text} target="_blank" rel="noopener noreferrer">
            点击查看
          </a>
        ),
      },
    ];

    const imageColumns = [
      {
        key: 'avatar',
        dataIndex: 'filesrc',
        render: text => <Avatar src={httpAddress + text} shape="square" size="large" />,
      },
      { title: '文件名称', key: 'filename', dataIndex: 'filename' },
      { title: '文件编号', key: 'fileid', dataIndex: 'fileid' },
      { title: '文件简介', key: 'filedescription', dataIndex: 'filedescription' },
      {
        title: '查看图片',
        key: 'filesrc',
        dataIndex: 'filesrc',
        render: text => (
          <a href={httpAddress + text} target="_blank" rel="noopener noreferrer">
            点击查看
          </a>
        ),
      },
    ];

    const fileRowSelection = {
      selectFileRowkeys,
      onChange: this.onSelectedFileChange,
      hideDefaultSelections: true,
      type: 'radio',
    };
    const imageRowSelection = {
      selectImageRowkeys,
      onChange: this.onSelectedImageChange,
      hideDefaultSelections: true,
      type: 'radio',
    };

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="aa">模块1</Menu.Item>
        <Menu.Item key="ab">模块2</Menu.Item>
        <Menu.Item key="ac">模块3</Menu.Item>
        <Menu.Item key="ad">模块4</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Card
          title="文件绑定"
          extra={
            <Button type="primary" onClick={() => this.ReturnRouter()}>
              <Icon type="rollback" />
            </Button>
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
        <div>
          {showList === false && (
            <Card style={{ marginTop: 4 }} title={this.showTitle(valueSelect)}>
              <Table
                columns={columns}
                dataSource={fileImages}
                loading={loading}
                rowKey="createid"
              />
              <Button
                type="primary"
                style={{ marginTop: 8 }}
                onClick={() => this.HandleFileWindow()}
              >
                添加
              </Button>
            </Card>
          )}
          {showList === true && (
            <div>
              <Card
                style={{ marginTop: 4 }}
                title="选择文件"
                extra={
                  <Tooltip title="选择文件和图片">
                    <Button
                      type="primary"
                      disabled={selectFileRowkeys.length === 0 || selectImageRowkeys.length === 0}
                      onClick={() => this.AddFileImage()}
                    >
                      添加
                    </Button>
                  </Tooltip>
                }
              >
                <Table
                  columns={fileColumns}
                  dataSource={files}
                  loading={fileloading}
                  rowKey="fileid"
                  rowSelection={fileRowSelection}
                />
              </Card>
              <Card style={{ marginTop: 4 }} title="选择图片">
                <Table
                  columns={imageColumns}
                  dataSource={images}
                  loading={imageloading}
                  rowKey="fileid"
                  rowSelection={imageRowSelection}
                />
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }
}
