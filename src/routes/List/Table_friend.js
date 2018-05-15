import React, { PureComponent } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider, Switch, Icon, Avatar } from 'antd';



/***** */
const avatar = [
    'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
    'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
    'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
    'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
    'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
    'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
    'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
    'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
  ];

/****** */
/***** **/

const columns = [
    { title: '用户', width: 60, dataIndex: 'avatar', key: 'avatar', fixed: 'left',
      render: text =>  <Avatar src={text}/>,
    },
    { title: '', width: 100, dataIndex: 'userName', key: 'userName', fixed: 'left'  },
    { title: '权限1', dataIndex: 'auth1', key:'1', width: 150, 
      render: (auth1) => <span style={{paddingLeft: 8}}>
                            <Switch checkedChildren={<Icon type="check" />} 
                                unCheckedChildren={<Icon type="cross" />} 
                                defaultChecked={auth1}
                            />
                          </span>,
    },
    { title: '权限2', dataIndex: 'auth2', key: '2', width: 150, 
      render: (auth2) =>  <span style={{paddingLeft: 8}}>
                                <Switch checkedChildren={<Icon type="check" />} 
                                    unCheckedChildren={<Icon type="cross" />} 
                                    defaultChecked={auth2}
                                />
                            </span>,
        
    },
    { title: '权限 3', dataIndex: 'auth3', key: '3', width: 150,
      render: (auth3) =>  <span style={{paddingLeft: 8}}>
                                <Switch checkedChildren={<Icon type="check" />} 
                                    unCheckedChildren={<Icon type="cross" />} 
                                    defaultChecked={auth3}
                                />
                            </span>
        
    },
    { title: '权限 4', dataIndex: 'auth4', key: '4', width: 150, 
        render: (auth4) =>  <span style={{paddingLeft: 8}}>
                            <Switch checkedChildren={<Icon type="check" />} 
                                unCheckedChildren={<Icon type="cross" />} 
                                defaultChecked={auth4}
                            />
                            </span>
        
    },
    { title: '权限 5', dataIndex: 'auth5', key: '5', width: 150, 
        render: (auth5) =>  <span style={{paddingLeft: 8}}>
                            <Switch checkedChildren={<Icon type="check" />} 
                                unCheckedChildren={<Icon type="cross" />} 
                                defaultChecked={auth5}
                            />
                            </span>
        
    },
    { title: '权限 6', dataIndex: 'auth6', key: '6', width: 150,
        render: (auth6) =>  <span style={{paddingLeft: 8}}>
                            <Switch checkedChildren={<Icon type="check" />} 
                                unCheckedChildren={<Icon type="cross" />} 
                                defaultChecked={auth6}
                            />
                            </span>
        
    },
    { title: '权限 7', dataIndex: 'auth7', key: '7', width: 150,
        render: (auth7) =>  <span style={{paddingLeft: 8}}>
                            <Switch checkedChildren={<Icon type="check" />} 
                                unCheckedChildren={<Icon type="cross" />} 
                                defaultChecked={auth7}
                            />
                            </span>
         
    },
    { title: '权限 8', dataIndex: 'auth8', key: '8', width: 150,
        render: (auth8) =>  <span style={{paddingLeft: 8}}>
                            <Switch checkedChildren={<Icon type="check" />} 
                                unCheckedChildren={<Icon type="cross" />} 
                                defaultChecked={auth8}
                            />
                            </span>
         
    },
    {title: '权限9', dataIndex: 'auth9', key: '9', width: 150, 
        render: (auth9) =>  <span style={{paddingLeft: 8}}>
                            <Switch checkedChildren={<Icon type="check" />} 
                                unCheckedChildren={<Icon type="cross" />} 
                                defaultChecked={auth9}
                            />
                            </span>
         
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <a>action</a>,
    },
  ];
  
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
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
    render() {
        const { list_device_friend=[] } = this.state;
        return (
            <Table columns={columns} dataSource={data} scroll={{ x:1500, y:300}}/>
        );
    }   

}