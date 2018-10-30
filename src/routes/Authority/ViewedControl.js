import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Menu, Radio, Dropdown, Button, Tooltip, Icon, Form } from 'antd';
import { routerRedux } from 'dva/router';
import FileView from './FileView';
import { getAuthority } from '../../utils/authority';

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
  files: state.document.files,
  fileloading: state.document.fileloading,
}))
@Form.create()
export default class ViewedControl extends PureComponent {
  state = {
    valueSelect: 'a',
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

  ReturnRouter() {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/authority/manage_list'));
  }

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

  render() {
    const { valueSelect } = this.state;
    const { fileloading, files, form } = this.props;
    const { getFieldDecorator } = form;
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
        <Card style={{ marginTop: 4 }} loading={fileloading} title={this.showTitle(valueSelect)}>
          {getFieldDecorator('fileview', {
            initialValue: files,
          })(<FileView />)}
        </Card>
      </div>
    );
  }
}
