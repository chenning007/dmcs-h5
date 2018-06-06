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
    //const { user: { list, loading } } = this.props;
    return (
      <div>
        <Layout>
          <Header style={{background:'#f0f2f5'}}>
            {this.showheader()}
          </Header>
          <Header style={{color:'#FFFAFA'}}>
            {this.showheader_select()}
          </Header>
          <Content>
            content
          </Content>
          <Footer>
            Footer
          </Footer>
        </Layout>
        {/*<Row gutter={24}>
          <Col span={8}>
            <Card bordered={false}>
              <p>卡片内容</p>
              <p>卡片内容</p>
              <p>卡片内容</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <p>卡片内容</p>
              <p>卡片内容</p>
              <p>卡片内容</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <p>卡片内容</p>
              <p>卡片内容</p>
              <p>卡片内容</p>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 24 }}>
          <Col span={12}>
            <Card bordered={false}>
              <p>卡片内容</p>
              <p>卡片内容</p>
              <p>卡片内容</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <p>卡片内容</p>
              <p>卡片内容</p>
              <p>卡片内容</p>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card
              title="业务表格"
              bordered={false}
              extra={<Icon type="setting" />}
            >
            {/*  <Table dataSource={list} loading={loading} columns={columns} />*/}
          {/*}  </Card>
          </Col>
        </Row>*/}

      </div>
    );
  }
}

/*export default connect(state => ({
  user: state.user,
}))(Dashboard);*/
