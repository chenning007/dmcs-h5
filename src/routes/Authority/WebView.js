import React, { PureComponent, Fragment } from 'react';
import { Button, Table, Icon, Divider, Switch, Input, message } from 'antd';

function NumberInfos(data) {
  if (!Array.isArray(data)) return 0;
  else {
    let num = 0;
    const length = data.length;
    let i = 0;
    for (i = 0; i < length; i += 1) {
      if (data[i].viewed === 'true') num += 1;
    }
    return num;
  }
}

export default class WebView extends PureComponent {
  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: Array.isArray(props.value) ? props.value : [],
      viewloading: false,
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
      let num = 0;
      if (e) num = NumberInfos(data);
      if (num < 3) {
        target[fieldName] = e ? 'true' : 'false';
        this.setState({ data: newData });

        const editEnable = true;
        onChange(newData, editEnable); // 数据传递的父组件中
      } else {
        this.setState({ data: newData });
        message.error('选择可视的公告已超出3条,更改将无效');
      }
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
      viewloading: true,
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
        viewloading: false,
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
    const { loading } = this.props;
    const { viewloading, data = [] } = this.state;
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
        render: (viewed, record) => (
          <span>
            <Switch
              checkedChildren={<Icon type="check" />}
              defaultChecked={viewed !== 'false'}
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
          if (!!record.editable && viewloading) {
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
        <Table
          loading={viewloading || loading}
          columns={columns}
          dataSource={data}
          rowKey="infid"
        />
      </Fragment>
    );
  }
}
