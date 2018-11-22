import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Form, Icon, Tooltip, Button, Input, Table } from 'antd';
import { getAuthority } from '../../utils/authority';
import { getSmpFormatDateByLong } from '../../utils/getFormDate';

@connect(state => ({
  temid: state.tem_store.temid,
  webinfos: state.system.webinfos,
  loading: state.system.loading,
}))
@Form.create()
export default class Webinfo extends PureComponent {
  componentWillMount() {
    // 基本的验证信息
    const { temid, dispatch } = this.props;
    const authority = getAuthority();
    if (authority !== 'admin' && authority !== 'host') {
      dispatch(routerRedux.push('/exception/403'));
    } else if (temid !== 5) {
      dispatch(routerRedux.push('/authority/manage_list'));
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/getWebinfo',
    }); // 获取网站公告信息
  }

  ReturnRouter() {
    // 返回权限列表
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/authority/manage_list'));
  }

  AddWebinfo() {
    const { dispatch, form } = this.props;

    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const inftxt = values.inftxt;
        dispatch({
          type: 'system/addWebinfo',
          payload: {
            inftxt,
          },
        });
      }
    });
  }

  Refresh() {
    // 重新获取网站信息
    const { dispatch } = this.props;
    dispatch({
      type: 'system/getWebinfo',
    });
  }

  DeleteWebinfo(keyid) {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/deleteWebinfo',
      payload: { infid: keyid },
    });
  }

  render() {
    const { form, loading, webinfos } = this.props;
    const { getFieldDecorator } = form;
    const columns = [
      { title: '编号', key: 'infid', dataIndex: 'infid', width: '10%' },
      { title: '内容', key: 'inftxt', dataIndex: 'inftxt', width: '60%' },
      {
        title: '日期',
        key: 'insertTime',
        dataIndex: 'insertTime',
        width: '15%',
        render: text => {
          if (text !== null) {
            return <span>{getSmpFormatDateByLong(text, false)}</span>;
          } else {
            return <div />;
          }
        },
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        width: '15%',
        render: (_, record) => (
          <div>
            <Button type="danger" onClick={() => this.DeleteWebinfo(record.infid)}>
              删除
            </Button>
          </div>
        ),
      },
    ];
    return (
      <div>
        <Card
          title="公告添加"
          style={{ marginBottom: 12 }}
          extra={
            <Tooltip placement="top" title="返回">
              <Button type="primary" onClick={() => this.ReturnRouter()}>
                <Icon type="rollback" />
              </Button>
            </Tooltip>
          }
        >
          <Form>
            <Form.Item
              colon={false}
              labelCol={{ span: 4, offset: 0 }}
              wrapperCol={{ span: 8, offset: 2 }}
              label={<b>公告内容:</b>}
            >
              {getFieldDecorator('inftxt', {
                rules: [
                  {
                    required: true,
                    message: '公告内容不能为空',
                  },
                ],
              })(<Input placeholder="输入公告内容" />)}
            </Form.Item>
            <Button type="primary" loading={loading} onClick={() => this.AddWebinfo()}>
              添加公告
            </Button>
          </Form>
        </Card>

        <Card
          title="公告列表"
          extra={
            <Tooltip placement="top" title="刷新列表数据">
              <Button type="primary" onClick={() => this.Refresh()}>
                <Icon type="retweet" />
              </Button>
            </Tooltip>
          }
        >
          <Table columns={columns} dataSource={webinfos} loading={loading} rowKey="infid" />
        </Card>
      </div>
    );
  }
}
