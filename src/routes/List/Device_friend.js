import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Avatar, Input, Button, Icon, Modal, Form,  Tooltip, Table, Divider } from 'antd';
import styles from './Device_friend.less';
import Table_friend from './Table_friend';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24, offset: -10 },
    sm: { span: 7 , offset: -10 }, 
  },
  wrapperCol: {
    xs: { span: 24, offset: 3},
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 10 },
  },
};

const columns =  [{
  title: '朋友',
  dataIndex: 'avatar',
  key: 'avatar',
  width: '4%',
  render: text => <Avatar src={text}/>,
},{
  title: '',
  dataIndex: 'userName',
  key: 'userName',
  width:'6%'
}, {
  title: '用户号',
  dataIndex: 'useridNumber',
  key: 'useridNumber',
  width: '20',
}, {
  title: '姓名',
  key: 'userTitle',
  width: '20%',
  dataIndex: 'userTitle',
}, {
  title: '联系方式',
  dataIndex: 'userTelephone',
  key: 'userTelephone',
  width: '20',
},
{
  title: '单位',
  key: 'userworkPlace',
  width: '30%',
  dataIndex: 'userworkPlace',
}];

const columns1 =  [{
  title: '朋友',
  dataIndex: 'avatar',
  key: 'avatar',
  width: '4%',
  render: text => <Avatar src={text}/>,
},{
  title: '',
  dataIndex: 'userName',
  key: 'userName',
  width:'6%'
}, {
  title: '用户号',
  dataIndex: 'useridNumber',
  key: 'useridNumber',
  width: '20',
}, {
  title: '姓名',
  key: 'userTitle',
  width: '20%',
  dataIndex: 'userTitle',
}, {
  title: '联系方式',
  dataIndex: 'userTelephone',
  key: 'userTelephone',
  width: '20',
},
{
  title: '单位',
  key: 'userworkPlace',
  width: '30%',
  dataIndex: 'userworkPlace',
}];

@connect(state => ({
  list_device_friend: state.friend.list_device_friend,
  list_friend: state.friend.list_friend,
  loading: state.friend.loading,
}))

@Form.create()
export default class Device_friend extends PureComponent {
  state={ /********* ***********/
    content_condition: 0,  //用于设置content部分的内容,其中1时权限管理，2时添加人员,0为正常状态/******************* *********/
    selectedRowkeys: [],   //用于列表的选择，可以通过该部分信息得到权限情况
    modalVisible1: false,  //用于显示删除的信息
    modalVisible2: false,  //用于显示提示的信息
    edit_condition: false,
  }
  onSelectedChange = (selectedRowkeys) => {
    this.setState({selectedRowkeys: selectedRowkeys});
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'friend/fetchList',
    });
    //获得friend数据
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    this.setState({
      content_condition: 0,
      selectedRowkeys: [],
      modalVisible1: false,
      modalVisible2: false,
    });
    dispatch({
      type: 'friend/clear',
    });
  }
submitAuthority() {
  const { dispatch, } = this.props;
  const { validateFieldsAndScroll } = this.props.form;
  validateFieldsAndScroll( (error, values) => {
    if(!error) {
      dispatch({
        type: 'user/submitRegularForm',
        payload: values,
      });
    }
  });
}
/**** */
  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }

  resetCondition = () => {
    this.setState({
      content_condition: 0,
      selectedRowkeys: [],
      modalVisible1: false,
      modalVisible2: false,
      edit_condition: false,
    });
  }
  /***** */
  reset_submit() {
    this.submitAuthority();
    this.resetCondition();
  }
  /***** */

  contentCondition = (content_condition) =>{
    this.setState({content_condition: content_condition});
  }
  

  setModalvisible1(visible) {
    if(!visible){
      this.setState({modalVisible1: visible});
      this.setState({
        content_condition: 0,
        selectedRowkeys: [],
        modalVisible1: false,
        modalVisible2: false,
      });
    }
    if(visible){
      this.setState({modalVisible1: visible,});
    }
  }
  setModalvisible2(visible) {
    if(!visible){
      this.setState({modalVisible2: visible});
    //this.setState({selectedRowkeys: []});
    }
    if(visible){
      this.setState({modalVisible2: visible});
    }
  }
  
  extraContent( selectedRowkeys, content_condition) {
    if(selectedRowkeys.length > 0) {
      return( 
        <div>
          <Tooltip placement='topRight' title='删除人员'><Button type='primary' onClick={() => this.setModalvisible1(true)}>删除</Button></Tooltip>
        </div>
      );
    }
    if(selectedRowkeys.length===0) {
      if(content_condition===0){
        return(
          <div>           
              <span>
                <Tooltip placement='topLeft' title='添加人员'><Button type='primary' onClick={() => this.contentCondition(2)}>添加</Button></Tooltip>
                  <Divider type='vertical' />
                <Tooltip placement='top' title='删除人员'><Button type='primary' onClick={() => this.setModalvisible2(true)}>删除</Button></Tooltip>
                  <Divider type='vertical' />
                <Tooltip placement='topRight' title='权限管理'><Button type='primary' onClick={() => this.contentCondition(1)}>权限</Button></Tooltip>
              </span>
            </div>
        );
      }
      if(content_condition===1){
        let edit_condition = this.state.edit_condition;
        if(!edit_condition){
          return(
            <div>  
              <Tooltip placement='top' title='返回'>         
                <Button type='primary' onClick={() => this.resetCondition()}>
                  <Icon type="rollback" />
                </Button>
              </Tooltip>
            </div> 
          );
        }
        return(
          <div>  
            <Tooltip placement='topLeft' title='保存权限更改'>         
              <Button type='primary' onClick={() => this.reset_submit()}>
                保存
              </Button>
            </Tooltip>
            <Divider type='vertical'/>
            <Tooltip placement='topRight' title='取消权限更改'>         
              <Button type='primary' onClick={() => this.resetCondition()}>
                取消
              </Button>
            </Tooltip>
          </div> 
        );
      }
    }   
       
  } 
  extraContent_3(length){
    if(length){
      return(
        <div>
          <Tooltip placement='top' title='加入设备绑定成员'><Button type='primary' onClick={() => this.resetCondition()}>加入成员</Button></Tooltip>
        </div>
      );
    }
    else{
      return(
        <div>
          <Tooltip placement='top' title='返回'>
          <Button type='primary' onClick={() => this.resetCondition()}>
            <Icon type="rollback" />
          </Button>
          </Tooltip>
       </div>
      );
    }
  }

  show_title() {
    if(this.props.location.state !== undefined ){
      return(
        <div>
          <span><Avatar src={this.props.location.state.avatar} size='large'/></span>
          {this.props.location.state.title}
        </div>
      );
    }
    else
      return(
        <div>
          <span><Avatar size= 'large' src=''/></span>
        </div>
      )
  }
  
  edit_Condition(e,edit_enable) {
    //let edit_enable = edit_enable;
    this.setState({edit_condition: edit_enable});
  }
 /**** */ 
  renderActivities() {
    const {
      list_device_friend=[],
      list_friend=[],
    } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldValue } = this.props.form;
    const {content_condition, selectedRowkeys=[], modalVisible1, modalVisible2} =　this.state;
    const rowSelection = {
      selectedRowkeys,
      onChange: this.onSelectedChange,
      hideDefaultSelections: true,
    }
    if(content_condition!==2)      //３时显示朋友列表,在此状态，显示正常模式＋权限管理模式＋删除模式
    {
      return (
        <div style={{padding: 10}}>
          { ((content_condition === 0)||(selectedRowkeys.length !==0))
            &&
            <div>
              <Table columns={columns} dataSource={ list_friend } 
                pagination={false} rowSelection={rowSelection}
              />
            </div>
            //这里直接显示出了人员的列表,只有在选择人数不为0或要求显示的内容不为２时，才显示出来
            //
          }
          { (content_condition === 1)&&(selectedRowkeys.length ===0)
            &&
            <Card /*title="权限管理"*/ bordered={false} style={{marginTop: 12}}>
              {getFieldDecorator('authorize', {
                initialValue: list_device_friend,
              })(<Table_friend onChange={(e, edit_enable) => this.edit_Condition(e,edit_enable)}/>)}
            </Card>
          }
          {(selectedRowkeys.length > 0)&&(content_condition===0)
            &&
            <Modal
              title='删除下列人员'
              visible={modalVisible1} //删除人员时
              onOk={()=>this.setModalvisible1(false)}
              onCancel={()=>this.setModalvisible1(false)}
              okText='确认'
              cancelText='取消'
            >
            {/* 利用form进行显示，不太合乎常理,form主要还是用于展示数据**/}
             <Form >　
                {selectedRowkeys.map((item)=>{
                  let tem=item-1;
                  return(
                    <Form.Item key={item}>
                      <span>{(list_friend[tem]).useridNumber}</span>
                    </Form.Item>
                  );
                })}   
              </Form>
            </Modal>
          } {/* 插入<Modal>块*/}
          { selectedRowkeys.length === 0
            &&
            <Modal visible={modalVisible2}
              onOk={()=>this.setModalvisible2(false)}
              onCancel={()=>this.setModalvisible2(false)}
              title='请选择需要删除的人员'
            >
               
            </Modal>
          }
        </div>
      );
    }
    if(content_condition===2){
    return (
      <Card title='朋友列表' bodyStyle={{ padding: 0 }}
       extra={this.extraContent_3(selectedRowkeys.length)}
      >
        <div style={{padding:10 }}>
          <Table columns={columns1} dataSource={ list_friend } 
          pagination={false} rowSelection={rowSelection}/>
        </div>
      </Card>
      );
    }
  }

  render() {
    const { loading } = this.props;
    // const {avatar_src} = this.props.location.state.avatar !==undefined ?this.props.location.state.avatar:'';

    const { getFieldDecorator, } = this.props.form;
    const { selectedRowkeys, content_condition } = this.state;

    return (
      <Row gutter={24}>
        { content_condition!== 2　//在3状态下，需要完全的更换界面，故选择了采用两种状态下之间的转换形式。
          &&
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title={this.show_title()}
              loading={loading}
              extra={this.extraContent(selectedRowkeys, content_condition)}
              style={{ marginBottom: 24 }} 
            > 
              <div className={styles.activitiesList}>
                {this.renderActivities()} 
              </div>
            </Card>
            <Card 
                bordered={true}
                title={this.show_title()}
                style={{ marginBottom: 36 }}
            >
              <Row>
                <Col span={12}>
                  <Form
                    //onSubmit={this.handleSubmit}
                    hideRequiredMark
                    style={{ marginTop: 8 }}
                  >  
                    <FormItem
                      {...formItemLayout}
                      label="设备id"
                    >
                      {getFieldDecorator('id', {
                      initialValue: "2015000000",
                      rules: [{
                          required: false, 
                        }],
                      })(
                          <Input  size="large" placeholder="例如: 2015000000" disabled
                          />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="名称"
                    >
                    {getFieldDecorator('number', {
                      initialValue: "conditionar",
                      rules: [{
                        required: false, 
                      }],
                    })(
                        <Input  size="large" placeholder="例如: 2015000000" disabled
                        />
                      )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="日期"
                    >
                    {getFieldDecorator('date', {
                      initialValue: "2017-08-01",
                      rules: [{
                        required: false, 
                      }],
                    })(
                        <Input  size="large" placeholder="例如: 2015000000" disabled
                        />
                      )}
                    </FormItem>  
                    <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                      <Button type="primary" htmlType="submit" /*loading={submitting}*/>
                        保存
                      </Button>
                    </FormItem>           
                  </Form>
                </Col>
              </Row>
            </Card>
            <Card 
              style={{ marginBottom: 36 , textAlign: 'center' }}
            >
              <Button type="danger" htmlType="submit" size="large"/*loading={submitting}*/>
                  权限转让
              </Button> 
            </Card>
            <Card style={{ textAlign: 'center' }}>
              <Button type="danger" htmlType="submit" size="large"/*loading={submitting}*/>
                  删除并退出
                </Button>   
            </Card>
          </Col>    
        } 
        { content_condition === 2
          &&
          this.renderActivities()
        }      
      </Row>
    );
  }
}

