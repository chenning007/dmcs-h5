import React, { PureComponent, Fragment } from 'react';
import {  Button, Input, Card, Icon, Row, Col, } from 'antd';


export default class Address extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
    };
  }
  //这里是创建一个对象，将Address实例化，从而可以进行操作;
  //这样的话数据是过来了，但是如何得到自己想要的结果呢。
  getRowByKey(key, newData) {
    return (newData || this.state.data).filter(item => item.key === key)[0];
  }

  handleFieldChange(e, fieldName, key) {
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
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
      const newData=this.state.data;
      const getData =this.props.value.map(item => ({ ...item }));
      if((getData !==undefined) && (getData.length >0)){
        if((newData !==undefined) && (newData.length >0))
        getData.splice(e.key-1,1,newData[key-1]);
      }
      this.props.onChange(getData);
      this.setState({
        loading: false,
      });
    }, 100);
  }

  render() {
    const { data={} }=this.state;
    return (
      <Fragment>
        {JSON.stringify(data) !== '{}'
        &&
        <div>
        {data.map((item) => {
            return (
                <Card 
                    bordered={true}
                    key={item.key}
                    title={<Input   
                            prefix={<Icon type="environment-o" style={{ color: 'rgba(0,0,0,.25)' }}/>}  
                            value={item.title}
                            onChange={e => this.handleFieldChange(e, 'title', item.key)}
                            //onKeyPress={e => this.handleKeyPress(e, item.key)}
                            placeholder="地址别名"
                            style={{width:100}}
                           />}
                    style={{marginBottom:12}}
                >   
                <Row>
                    <Col xl={4}/>
                    <Col xl={16}>
                    <Input
                        addonBefore={<strong>&nbsp;&nbsp;&nbsp;&nbsp;收件人</strong>}
                        value={item.name}
                        onChange={e => this.handleFieldChange(e, 'name', item.key)}
                        //onKeyPress={e => this.handleKeyPress(e, item.key)}
                        placeholder="收件人"
                        style={{marginBottom: 12}}
                    />
                    <Input
                        addonBefore={<strong>所在地区</strong>}
                        value={item.area}
                        onChange={e => this.handleFieldChange(e, 'area', item.key)}
                        //onKeyPress={e => this.handleKeyPress(e, item.key)}
                        placeholder="地址"
                        style={{marginBottom: 12}}
                    />
                    <Input
                        addonBefore={<strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址</strong>}
                        value={item.place}
                        onChange={e => this.handleFieldChange(e, 'place', item.key)}
                        //onKeyPress={e => this.handleKeyPress(e, item.key)}
                        placeholder="详细地址"
                        style={{marginBottom: 12}}
                    />
                    <Input
                        addonBefore={<strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手机</strong>}
                        value={item.mobilephone}
                        onChange={e => this.handleFieldChange(e, 'mobilephone', item.key)}
                        //onKeyPress={e => this.handleKeyPress(e, item.key)}
                        placeholder="手机"
                        style={{marginBottom: 12}}
                    />
                    <Input
                        addonBefore={<strong>固定电话</strong>}
                        value={item.fixedphone}
                        onChange={e => this.handleFieldChange(e, 'fixedphone', item.key)}
                        //onKeyPress={e => this.handleKeyPress(e, item.key)}
                        placeholder="固定电话"
                        style={{marginBottom: 12}}
                    />
                    <Input
                        addonBefore={<strong>电子邮箱</strong>}
                        value={item.emial}
                        onChange={e => this.handleFieldChange(e, 'emial', item.key)}
                        //onKeyPress={e => this.handleKeyPress(e, item.key)}
                        placeholder="电子邮箱"
                        style={{marginBottom: 12}}
                    />
                    <Button type='primary' onClick={e =>this.saveRow(e, item.key)}>
                        保存
                    </Button>
                    </Col>
                    <Col xl={4}/>
                </Row>
                </Card> 
            );           
        })}
        </div>
        }
      </Fragment>
    );
  }
}
