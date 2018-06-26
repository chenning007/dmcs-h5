import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Table, Icon, Divider, Menu, Dropdown,Button,message } from 'antd';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content} = Layout ;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="">Delete</a>
      <Divider type="vertical" />
      <a href="" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

export default class FirstPage extends PureComponent {
  /*componentDidMount() {
    this.props.dispatch({
      type: 'user/fetch',
    });
  }*/
  
  handleMenuClick(e){
    return;
  }

  menu = (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );

  showheader() {
    return (
      <div>
        <Button type='primary'>登录</Button>
        <Divider type='vertical'/>
        <Button type='primary'>注册</Button>
      </div>
    );
  }

  showheader_select() {
    return(
      <Row>
        <Col style={{width:'20%'}}>
          <Dropdown overlay={this.menu}>
            <Button style={{ marginLeft: 8 }}>
              Button <Icon type="down" />
            </Button>
          </Dropdown>
        </Col>
        <Col style={{width:'20%'}}>
          <Dropdown overlay={this.menu}>
            <Button style={{ marginLeft: 8 }}>
              Button <Icon type="down" />
            </Button>
          </Dropdown>
        </Col>
        <Col style={{width:'20%'}}>
          <Dropdown overlay={this.menu}>
            <Button style={{ marginLeft: 8 }}>
              Button <Icon type="down" />
            </Button>
          </Dropdown>
        </Col>
        <Col style={{width:'20%'}}>
          <Dropdown overlay={this.menu}>
            <Button style={{ marginLeft: 8 }}>
              Button <Icon type="down" />
            </Button>
          </Dropdown>
        </Col>
        <Col style={{width:'20%'}}>
          <Dropdown overlay={this.menu}>
            <Button style={{ marginLeft: 8 }}>
              Button <Icon type="down" />
            </Button>
          </Dropdown>
        </Col>
      </Row>
    )
  }
  render() {
    return (
      <div>
        <Layout>
          <Header style={{/*position: 'fixed', */marginTop:0 ,background:'#f0f2f5'}}>
            <div>{this.showheader()}</div>
          </Header>
          <Header style={{position: 'fixed', marginTop:60 ,width:'100%' , color:'#FFFAFA'}}>
            <div>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="1">关于我们</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="2">学术交流</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="3">科研成果</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="4">设计案例</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="5">合作方式</Menu.Item>
                <Menu.Item style={{width:'16%',textAlign: 'center',fontSize:18}} key="6">关注更多</Menu.Item>
              </Menu>
            </div>
          </Header>

          <Content style={{marginTop:72, textAlign: 'center'}}>
            <img src="http://localhost:80/image/u108.png"/>
            <Card>
              <Card title="关于我们">

              </Card>
              <Card title="学术交流">

              </Card>
              <Card title="科研成果">

              </Card>
              <Card title="设计案例">

              </Card>
              <Card title="合作方式">

              </Card>
              <Card title="关注更多">

              </Card>
            </Card>
          </Content>

        </Layout>  
      </div>
    );
  }
}

