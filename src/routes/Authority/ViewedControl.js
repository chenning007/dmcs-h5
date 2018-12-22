import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Menu, Radio, Dropdown, Button, Tooltip, Icon, Form, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import FileView from './FileView';
import WebView from './WebView';
import { getAuthority } from '../../utils/authority';
import { ShowTitle } from '../../utils/ShowTitle';

@connect(state => ({
  temid: state.tem_store.temid,
  files: state.document.files,
  fileloading: state.document.fileloading,
  loading: state.system.loading,
  webinfos: state.system.webinfos,
}))
@Form.create()
export default class ViewedControl extends PureComponent {
  state = {
    valueSelect: 'a',
    editEnable: false,
    editWebInfo: false,
  };

  componentWillMount() {
    const { temid, dispatch } = this.props;

    const authority = getAuthority();

    if (authority !== 'admin' && authority !== 'host') {
      dispatch(routerRedux.push('/exception/403'));
    } else if (temid !== 3) {
      dispatch(routerRedux.push('/authority/manage_list'));
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/getWebinfo',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'document/clear',
    });
  }

  handleRadio = e => {
    this.setState({
      valueSelect: e.target.value,
    });
    this.GetFileImage(e.target.value);
  };

  handleMenuClick = e => {
    const key = e.key;
    this.setState({
      valueSelect: key,
    });
    this.GetFileImage(key);
  };

  cancelChange() {
    this.setState({ valueSelect: 'a', editEnable: false });
    this.GetFileImage('a');
  }

  cancelWebInfoChange() {
    this.setState({ editWebInfo: false });
    this.Refresh();
  }

  submitChange() {
    const { dispatch, form } = this.props;
    const { valueSelect } = this.state;

    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        dispatch({
          type: 'document/updaFIOrdVie',
          payload: {
            fileImages: values.fileview,
            module: valueSelect,
          },
        });
      }
    });
    this.setState({ editEnable: false });
  }

  submitWebInfoChange() {
    const { dispatch, form } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        dispatch({
          type: 'system/updateWebinfo',
          payload: {
            webinfos: values.webinfo,
          },
        });
      }
    });
    this.setState({ editWebInfo: false });
  }

  GetFileImage(valueSelect) {
    const { dispatch } = this.props;
    dispatch({
      type: 'document/getFileImage',
      payload: {
        module: valueSelect,
      },
    });
  }

  editState(e, editEnable) {
    this.setState({ editEnable });
  }

  WebinfoEdit(e, editEnable) {
    this.setState({ editWebInfo: editEnable });
  }

  ReturnRouter() {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/authority/manage_list'));
  }

  Refresh() {
    // 重新获取网站信息
    const { dispatch } = this.props;
    dispatch({
      type: 'system/getWebinfo',
    });
  }

  editExtra() {
    const { editEnable } = this.state;
    if (editEnable) {
      return (
        <div>
          <Tooltip placement="topRight" title="保存编辑内容">
            <Button type="primary" onClick={() => this.submitChange()}>
              保存
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip placement="topRight" title="不保存已编辑内容">
            <Button type="primary" onClick={() => this.cancelChange()}>
              取消
            </Button>
          </Tooltip>
        </div>
      );
    } else {
      return <div />;
    }
  }

  webinfoExtra() {
    const { editWebInfo } = this.state;
    if (editWebInfo) {
      return (
        <div>
          <Tooltip placement="topRight" title="保存编辑内容">
            <Button type="primary" onClick={() => this.submitWebInfoChange()}>
              保存
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip placement="topRight" title="不保存已编辑内容">
            <Button type="primary" onClick={() => this.cancelWebInfoChange()}>
              取消
            </Button>
          </Tooltip>
        </div>
      );
    } else {
      return (
        <Tooltip placement="top" title="刷新列表数据">
          <Button type="primary" onClick={() => this.Refresh()}>
            <Icon type="retweet" />
          </Button>
        </Tooltip>
      );
    }
  }

  render() {
    const { valueSelect } = this.state;
    const { fileloading, files, form, webinfos, loading } = this.props;
    const { getFieldDecorator } = form;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="ae">模块0</Menu.Item>
        <Menu.Item key="aa">模块1</Menu.Item>
        <Menu.Item key="ab">模块2</Menu.Item>
        <Menu.Item key="ac">模块3</Menu.Item>
        <Menu.Item key="ad">模块4</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Card
          title="文件可视性"
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
        <Card
          style={{ marginTop: 4 }}
          loading={fileloading}
          title={ShowTitle(valueSelect)}
          extra={this.editExtra()}
        >
          {getFieldDecorator('fileview', {
            initialValue: files,
          })(<FileView onChange={(e, editEnable) => this.editState(e, editEnable)} />)}
        </Card>
        {
          <Card
            title="公告可视性"
            style={{ marginTop: 12 }}
            extra={this.webinfoExtra()}
            loading={loading}
          >
            {getFieldDecorator('webinfo', {
              initialValue: webinfos,
            })(
              <WebView
                loading={loading}
                onChange={(e, editEnable) => this.WebinfoEdit(e, editEnable)}
              />
            )}
          </Card>
        }
      </div>
    );
  }
}
