import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, List, Button, Icon } from 'antd';
import { routerRedux } from 'dva/router';

import { getAuthority } from '../../utils/authority';
import { httpAddress } from '../../../public/constant';
@connect(state => ({
  files: state.document.files,
  images: state.document.images,
  fileloading: state.document.fileloading,
  imageloading: state.document.imageloading,
  tem_id: state.tem_store.tem_id,
}))
export default class FileWindow extends PureComponent {
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

  render() {
    const { files = [], images = [], fileloading, imageloading } = this.props;
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
      </div>
    );
  }
}
