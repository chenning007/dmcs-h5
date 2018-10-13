import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, List, Button, Icon, Select, Input } from 'antd';
import { routerRedux } from 'dva/router';

import { getAuthority } from '../../utils/authority';
import { httpAddress } from '../../../public/constant';


const Option = Select.Option;



@connect(state => ({
  files: state.document.files,
  images: state.document.images,
  fileloading: state.document.fileloading,
  imageloading: state.document.imageloading,
  tem_id: state.tem_store.tem_id,
}))
export default class FileWindow extends PureComponent {

  state={
    fileid: undefined,
    imageid: undefined,
    file_image: undefined,
  }

  componentWillMount() {
    const { tem_id, dispatch } = this.props;
    let authority = getAuthority();
    if (authority !== 'admin' && authority !== 'host') {
      dispatch(routerRedux.push('/exception/403'));
    } else if (tem_id !== 2) {
      dispatch(routerRedux.push('/authority/manage_list'));
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'document/getFilelist',
    });
    dispatch({
      type: 'document/getImagelist',
    });
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'document/clear',
    });
  }

  ReturnRouter() {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/authority/manage_list'));
  }

  handleFileChange = (value) =>{
    console.log("filevalue: "+value);
    this.setState({fileid: value, file_image: undefined});

    const { fileid=undefined,imageid=undefined } = this.state;
    if(fileid!== undefined && imageid!== undefined) {
      let fileImage = "file"+ fileid + "image"+imageid;
      this.setState({ file_image: fileImage, fileid: undefined, imageid: undefined });
    }
  }

  handleImageChange = (value) =>{
    console.log("imagevalue: "+value);
    this.setState({imageid: value, file_image: undefined});
    console.log(this.state.imageid);
    const { fileid,imageid} = this.state;
    if(fileid!== undefined && imageid!== undefined) {
      let fileImage = "file"+ fileid + "image"+imageid;
      this.setState({ file_image: fileImage,fileid: undefined,imageid: undefined });
    }
  }

  render() {
    const { files = [], images = [], fileloading, imageloading } = this.props;

    const {file_image=undefined} = this.state;
    return (
      <div>
        <Card
          title="上传文件"
          extra={
            <Button type="primary" onClick={() => this.ReturnRouter()}>
              <Icon type="rollback" />
            </Button>
          }
        >
          <List
            itemLayout="horizontal"
            pagination
            dataSource={files}
            loading={fileloading}
            renderItem={item => (
              <List.Item key={item.fileid}>
                <List.Item.Meta
                  title={
                    <a href={httpAddress + item.filesrc} target="_blank">
                      {item.filename}
                    </a>
                  }
                />
                <div>
                  {
                    <a href={httpAddress + item.filesrc} target="_blank">
                      {item.filedescription}
                    </a>
                  }
                </div>
              </List.Item>
            )}
          />
        </Card>
        <Card title="上传图片" style={{ marginTop: 12 }}>
          <List
            itemLayout="horizontal"
            pagination
            dataSource={images}
            loading={imageloading}
            renderItem={item => (
              <List.Item key={item.fileid}>
                <List.Item.Meta
                  title={
                    <a href={httpAddress + item.filesrc} target="_blank">
                      {item.filename}
                    </a>
                  }
                />
                <div>
                  {
                    <a href={httpAddress + item.filesrc} target="_blank">
                      {item.filedescription}
                    </a>
                  }
                </div>
              </List.Item>
            )}
          />
        </Card>
        <Card title="文件与窗口绑定" style={{marginTop:12}}>
          <Input.Group style={{width:'80%'}}>
            <Select placeholder="选择文件"onChange={this.handleFileChange} style={{width:'35%'}}>
              {files.map(item => (
                <Option value={item.fileid} key={item.fileid}>
                  文件编号：{item.fileid}
                </Option>
              ))}
            </Select>
            <Select placeholder="选择图片" onChange={this.handleImageChange} style={{width:'35%'}}>
              {images.map(item => (
                <Option value={item.fileid} key={item.fileid}>
                  图像编号:{item.fileid}
                </Option>
              ))}
            </Select>
            <Input style={{width:'30%'}}
              disabled
              defaultValue={file_image!==undefined ? file_image : null}
            />
          </Input.Group>
        
        </Card>
      </div>
    );
  }
}
