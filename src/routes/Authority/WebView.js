import React, { PureComponent, Fragment } from 'react';
import { Button, Table, Icon, Divider, Switch, Input } from 'antd';

export default class WebView extends PureComponent {
  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: Array.isArray(props.value) ? props.value : [],
      loading: false,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.infid === key)[0];
  }

  toggleEditable = (e, key) => {
    const { data } = this.state;

    e.preventDefault();
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  edit(e, key) {
    this.toggleEditable(e, key);
    // this.props.callbackParent(editEnable);
  }

  handleChangeView(e, fieldName, key) {
    const { onChange } = this.props;
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e ? 'true' : 'false';
      this.setState({ data: newData });

      const editEnable = true;
      onChange(newData, editEnable); // 数据传递的父组件中
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data = [] } = this.state;
    const newData = [...data];
    const target = this.getRowByKey(key);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    const { onChange } = this.props;
    const { data } = this.state;
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      delete target.isNew;
      this.toggleEditable(e, key);
      const editEnable = true;
      onChange(data, editEnable);

      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {
    const { loading, data = [] } = this.state;
    const columns = [
      {
        title: '编号',
        key: 'infid',
        width: '10%',
        dataIndex: 'infid',
      },
      {
        title: '公告内容',
        key: 'inftxt',
        width: '60%',
        dataIndex: 'inftxt',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                placeholder="公告内容"
                onChange={e => this.handleFieldChange(e, 'inftxt', record.infid)}
              />
            );
          }
          return text;
        },
      },
      {
        title: '可视性',
        key: 'viewed',
        width: '15%',
        dataIndex: 'viewed',
        render: (viewd, record) => (
          <span>
            <Switch
              checkedChildren={<Icon type="check" />}
              defaultChecked={viewd !== 'false'}
              unCheckedChildren={<Icon type="cross" />}
              disabled={!record.editable}
              onChange={e => this.handleChangeView(e, 'viewed', record.infid)}
            />
          </span>
        ),
      },
      {
        title: '操作',
        key: 'operation',
        width: '15%',
        render: (_, record) => {
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            return (
              <span>
                <Button onClick={e => this.saveRow(e, record.infid)}>保存</Button>
                <Divider type="vertical" />
                <Button onClick={e => this.cancel(e, record.infid)}>取消</Button>
              </span>
            );
          }
          return (
            <span>
              <Button onClick={e => this.edit(e, record.infid)}>编辑</Button>
            </span>
          );
        },
      },
    ];

    return (
      <Fragment>
        <Table loading={loading} columns={columns} dataSource={data} rowKey="infid" />
      </Fragment>
    );
  }
}
