import React, { PureComponent, Fragment } from 'react';
import { Table, Divider, Switch, Icon, Avatar } from 'antd';



/****** */
const avatar = [
    'http://localhost:80/image/BiazfanxmamNRoxxVxka.png',
    'http://localhost:80/image/cnrhVkzwxjPwAaCfPbdc.png',
    'http://localhost:80/image/gaOngJwsRYRaVAuXXcmB.png',
    'http://localhost:80/image/ubnKSIfAJTxIgXOKlciN.png',
    'http://localhost:80/image/WhxKECPNujWoWEFNdnJE.png',
    'http://localhost:80/image/jZUIxmJycoymBprLOUbT.png',
    'http://localhost:80/image/psOgztMplJMGpVEqfcgF.png',
    'http://localhost:80/image/ZpBqSxLxVEXfcUNoPKrz.png',
    'http://localhost:80/image/laiEnJdGHVOhJrUShBaJ.png',
    'http://localhost:80/image/UrQsqscbKEpNuJcvBZBu.png',
  ];
/****** */
/****** */
  const Data1 = [];
  for (let i = 0; i < 100; i++) {
    Data1.push({
      key: i,
      avatar: avatar[i % 10],
      userName: `Edrward ${i}`,
      auth1: true,
      auth2: true,
      auth3: true,
      auth4: true,
      auth5: false,
      auth6: true,
      auth7: false,
      auth8: true,
      auth9: false,
    });
  }
  
 
/******* */

/****** */



/****** */

export default class Table_friend extends PureComponent{
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            loading: false,
        }
    }

    getRowByKey(key, newData) {
        return (newData || this.state.data).filter(item => item.key === key)[0];
    }

    cacheOriginData = {};
    toggleEditable=(e, key) => {
        e.preventDefault();
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (target) {
          // 进入编辑状态时保存原始数据
          if (!target.editable) {
            this.cacheOriginData[key] = { ...target };
          }
          target.editable = !target.editable;
          this.setState({ data: newData });
        }
      }
    
    //
    edit(e, key) {
        this.toggleEditable(e,key);
        //this.props.callbackParent(edit_enable);
    }
    saveRow(e, key) {
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
          let edit_enable = true;
          this.props.onChange(this.state.data, edit_enable);
          
          this.setState({
            loading: false,
          });
        }, 500);
    }
    cancel(e, key) {
        this.clickedCancel = true;
        e.preventDefault();
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (this.cacheOriginData[key]) {
            Object.assign(target, this.cacheOriginData[key]);
            target.editable = false;
            delete this.cacheOriginData[key];
        }
        this.setState({ data: newData });
        this.clickedCancel = false;
    }
//这里已经对newData进行了直接的操作    
    handleFieldChange(e, fieldName, key) {
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (target) {
            target[fieldName] = e;
            this.setState({ data: newData });
        }
    }

    render() {

        const columns = [
            { title: '朋友', width: 60, dataIndex: 'avatar', key: 'avatar', fixed: 'left',
              render: text =>  <Avatar src={text}/>,
            },
            { title: '', width: 100, dataIndex: 'username', key: 'username', fixed: 'left'  },
            { title: '权限1', dataIndex: 'auth1', key:'1', width: 150, 
              render: (auth1,record) =>
              <span style={{paddingLeft: 8}}>
                    <Switch 
                        checkedChildren={<Icon type='check'/>}
                        defaultChecked={auth1}
                        unCheckedChildren={<Icon type="cross" />}
                        disabled={record.editable? false:true}
                        onChange={e => this.handleFieldChange(e, 'auth1', record.key)}
                    />
                </span>
            },
            { title: '权限2', dataIndex: 'auth2', key: '2', width: 150, 
              render: (auth2,record) =>  
              <span style={{paddingLeft: 8}}>
                    <Switch 
                        checkedChildren={<Icon type='check'/>}
                        defaultChecked={auth2}
                        unCheckedChildren={<Icon type="cross" />}
                        disabled={record.editable? false:true}
                        onChange={e => this.handleFieldChange(e, 'auth2', record.key)}
                    />
                </span>
                
            },
            { title: '权限 3', dataIndex: 'auth3', key: '3', width: 150,
              render: (auth3, record) =>  
                <span style={{paddingLeft: 8}}>
                    <Switch 
                        checkedChildren={<Icon type='check'/>}
                        defaultChecked={auth3}
                        unCheckedChildren={<Icon type="cross" />}
                        disabled={record.editable? false:true}
                        onChange={e => this.handleFieldChange(e, 'auth3', record.key)}
                    />
                </span>
                
            },
            { title: '权限 4', dataIndex: 'auth4', key: '4', width: 150, 
                render: (auth4,record) =>  
                <span style={{paddingLeft: 8}}>
                    <Switch 
                        checkedChildren={<Icon type='check'/>}
                        defaultChecked={auth4}
                        unCheckedChildren={<Icon type="cross" />}
                        disabled={record.editable? false:true}
                        onChange={e => this.handleFieldChange(e, 'auth4', record.key)}
                    />
                </span>
                
            },
            { title: '权限 5', dataIndex: 'auth5', key: '5', width: 150, 
                render: (auth5,record) =>  
                <span style={{paddingLeft: 8}}>
                    <Switch 
                        checkedChildren={<Icon type='check'/>}
                        defaultChecked={auth5}
                        unCheckedChildren={<Icon type="cross" />}
                        disabled={record.editable? false:true}
                        onChange={e => this.handleFieldChange(e, 'auth5', record.key)}
                    />
                </span>
                
            },
            { title: '权限 6', dataIndex: 'auth6', key: '6', width: 150,
                render: (auth6,record) =>  
                <span style={{paddingLeft: 8}}>
                    <Switch 
                        checkedChildren={<Icon type='check'/>}
                        defaultChecked={auth6}
                        unCheckedChildren={<Icon type="cross" />}
                        disabled={record.editable? false:true}
                        onChange={e => this.handleFieldChange(e, 'auth6', record.key)}
                    />
                </span>
                
            },
            { title: '权限 7', dataIndex: 'auth7', key: '7', width: 150,
                render: (auth7, record) =>  
                <span style={{paddingLeft: 8}}>
                    <Switch 
                        checkedChildren={<Icon type='check'/>}
                        defaultChecked={auth7}
                        unCheckedChildren={<Icon type="cross" />}
                        disabled={record.editable? false:true}
                        onChange={e => this.handleFieldChange(e, 'auth7', record.key)}
                    />
                </span>
                 
            },
            { title: '权限 8', dataIndex: 'auth8', key: '8', width: 150,
              render: (auth8, record) =>  
                <span style={{paddingLeft: 8}}>
                    <Switch 
                        checkedChildren={<Icon type='check'/>}
                        defaultChecked={auth8}
                        unCheckedChildren={<Icon type="cross" />}
                        disabled={record.editable? false:true}
                        onChange={e => this.handleFieldChange(e, 'auth8', record.key)}
                    />
                </span>       
            },
            { title: '权限9', dataIndex: 'auth9', key: '9', width: 150, 
              render: (auth9, record) =>  
                <span style={{paddingLeft: 8}}>
                    <Switch 
                        checkedChildren={<Icon type='check'/>}
                        defaultChecked={auth9}
                        unCheckedChildren={<Icon type="cross" />}
                        disabled={record.editable? false:true}
                        onChange={e => this.handleFieldChange(e, 'auth9', record.key)}
                    />
                </span>      
            },
            {
              title: '设置',
              key: 'operation',
              fixed: 'right',
              width: 150,
              render: (text ,record) => {
                if(!!record.editable && this.state.loading) {
                  return null;
                }
                if(record.editable) {
                  return (
                    <span>
                      <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                      <Divider type='vertical'/>
                      <a onClick={e => this.cancel(e,record.key)}>取消</a>
                    </span>
                  )
                }
                return (
                  <span>
                    <a onClick={e => this.edit(e, record.key)}>
                      编辑
                    </a>
                  </span>
                );
              }
            },
          ];
        const { data = [] } = this.state;
        return (
            <Fragment>
               <Table 
                loading={this.state.loading}
                columns={columns} 
                dataSource={data} 
                scroll={{ x:1660, y:500}}
                rowKey='key'
               />
            </Fragment>
        );
    }   

}