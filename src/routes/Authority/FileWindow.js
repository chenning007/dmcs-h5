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
  temid: state.tem_store.temid,
}))
export default class FileWindow extends PureComponent {
  state = {
    fileid: undefined,
    imageid: undefined,
    fileimage: undefined,
  };

  componentWillMount() {
    const { temid, dispatch } = this.props;
    const authority = getAuthority();
    if (authority !== 'admin' && authority !== 'host') {
      dispatch(routerRedux.push('/exception/403'));
    } else if (temid !== 2) {
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

  bandFileWindow() {
    const { imageid, fileid } = this.state;
    if (imageid !== undefined && fileid !== undefined) {
      const fileWindow = `file${fileid}image${imageid}`;
      this.setState({ fileimage: fileWindow, imageid: undefined, fileid: undefined });
    }
  }

  imageChange(value) {
    this.setState({ imageid: value, fileimage: undefined });
  }

  handleFileChange(value) {
    this.setState({ fileid: value, fileimage: undefined });
  }

  render() {
    const { files = [], images = [], fileloading, imageloading } = this.props;

    const { fileimage = undefined } = this.state;
    return (
      <div>
        <Card
          title="文件"
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
                    <a href={httpAddress + item.filesrc} target="_blank" rel="noopener noreferrer">
                      {item.filename}
                    </a>
                  }
                />
                <div>
                  {
                    <a href={httpAddress + item.filesrc} target="_blank" rel="noopener noreferrer">
                      {item.filedescription}
                    </a>
                  }
                </div>
              </List.Item>
            )}
          />
        </Card>
        <Card title="图片" style={{ marginTop: 12 }}>
          <List
            itemLayout="horizontal"
            pagination
            dataSource={images}
            loading={imageloading}
            renderItem={item => (
              <List.Item key={item.fileid}>
                <List.Item.Meta
                  title={
                    <a href={httpAddress + item.filesrc} target="_blank" rel="noopener noreferrer">
                      {item.filename}
                    </a>
                  }
                />
                <div>
                  {
                    <a href={httpAddress + item.filesrc} target="_blank" rel="noopener noreferrer">
                      {item.filedescription}
                    </a>
                  }
                </div>
              </List.Item>
            )}
          />
        </Card>
        <Card title="文件与窗口绑定" style={{ marginTop: 12 }}>
          <Input.Group style={{ width: '70%' }}>
            <Select placeholder="选择文件" style={{ width: '50%' }}>
              {files.map(item => (
                <Option
                  value={item.fileid}
                  key={item.fileid}
                  onClick={() => this.handleFileChange(item.fileid)}
                >
                  文件编号：
                  {item.fileid}
                </Option>
              ))}
            </Select>
            <Select placeholder="选择图片" style={{ width: '50%' }}>
              {images.map(item => (
                <Option
                  value={item.fileid}
                  key={item.fileid}
                  onClick={() => this.imageChange(item.fileid)}
                >
                  图像编号:
                  {item.fileid}
                </Option>
              ))}
            </Select>
          </Input.Group>
          <Input
            style={{ width: '30%' }}
            disabled
            defaultValue={fileimage !== undefined ? fileimage : null}
          />
          <Button type="primary" onClick={() => this.bandFileWindow()}>
            文件绑定
          </Button>
        </Card>
      </div>
    );
  }
}
