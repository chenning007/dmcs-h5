import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Card, Avatar, List, Tooltip, Dropdown, Menu, Table } from 'antd';

/* eslint react/no-array-index-key: 0 */
const device_data = [{
    key: 1,
    title: '节点１',
    node: [{
        key: 1,
        type: 'S1',
        data: 5,
    },{
        key: 2,
        type: 'S2',
        data: 6,  
    },{
        key: 3,
        type: 'S3',
        data: 2, 
    },{
        key: 4,
        type: 'R1',
        data: 3, 
    },{
        key: 5,
        type: 'R2',
        data: 1, 
    },{
        key: 6,
        type: 'R2',
        data: 4, 
    }
    ],
},
{   key: 2,
    title: '节点2',
    node: [{
        key: 1,
        type: 'S1',
        data: 5,
    },{
        key: 2,
        type: 'S2',
        data: 6,  
    },{
        key: 3,
        type: 'S3',
        data: 2, 
    },{
        key: 4,
        type: 'R1',
        data: 3, 
    },
    ],
},
{   key: 3,
    title: '节点3',
    node: [{
        key: 1,
        type: 'S1',
        data: 5,
    },{
        key: 2,
        type: 'S2',
        data: 6,  
    },{
        key: 3,
        type: 'S3',
        data: 2, 
    },{
        key: 4,
        type: 'R1',
        data: 3, 
    },{
        key: 5,
        type: 'R2',
        data: 1, 
    },
    ],
}
];

const columns=[ 
    {title: '端点',width: '40%', dataIndex: 'type', key: 'type'},
    {title: '数据', width: '60%', dataIndex: 'data', key: 'data'}
   ]

@connect(state => ({ 
}))
export default class Monitor_data extends PureComponent {
  //componentDidMount() {
  //  this.props.dispatch();
  //}


  render() {

    const formItemLayout = {
        wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        },
    };

    return (
      <div>
        <List
            rowKey="id"
            style={{ marginTop: 24 }}
            grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
            //loading={loading}
            dataSource={device_data}
            renderItem={item => (
            <List.Item key={item.key}>
                < Card
                  hoverable
                  bodyStyle={{ paddingBottom: 20 }} 
                  title={item.title}
                >
                <Table columns={columns} dataSource={item.node} scroll={{y: 200}} pagination={false}/>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
