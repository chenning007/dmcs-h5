import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, List,Icon,Button } from 'antd';
import { routerRedux } from 'dva/router';
import { getAuthority } from '../../utils/authority';
import { cookieToJson } from '../../utils/cookieToJson';
import {httpAddress} from '../../../public/constant';

@connect(state => ({
  files: state.document.files,
  document:state.document,
}))
export default class FileList extends PureComponent {
  state = {
    loading: true,
    files: [],
    fuzhi: true,
  };

  componentWillMount() {
    const { dispatch } = this.props;
    let authority = getAuthority();
    let cookie = cookieToJson();
    if ((authority !== 'admin' && authority !== 'host') || cookie.admin_token === undefined) {
      dispatch(routerRedux.push('/exception/403'));
      message.error('权限错误或身份无法验证');
    }
  }

  /*componentDidMount() {
    const { files = [] } = this.props;
    this.setState({ files: [...files], loading: false });
  }*/

  componentWillReceiveProps(nextProps){
    const {fuzhi}=this.state;
    if(fuzhi && nextProps.document.files.length>0){
      this.setState({ files: [...nextProps.document.files], loading: false,fuzhi: false });
    }
  }

  DeleteFile(fileid) {
    var Files = [];
    const { dispatch } = this.props;
    const { files } = this.state;
    this.setState({ loading: true });
    console.log(fileid);
    Files = [...files];
    for (var i = 0; i < Files.length; i++) {
      if (Files[i].fileid === fileid) Files.splice(i, 1);
      break;
    }
    dispatch({
      type: 'document/deleteFile',
      payload: {
        fileid: fileid,
      },
    });
    this.setState({ files: [...Files], loading: false });
  }

  ReturnRouter(){
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/authority/manage_file'));
  }

  render() {
    const { files = [], loading } = this.state;

    return (
      <Card title='上传文件' extra={<Button type='primary' onClick={() =>this.ReturnRouter()}><Icon type="rollback" /></Button>}>
        <List
          itemLayout="horizontal"
          pagination
          dataSource={files}
          loading={loading}
          renderItem={item => (
            <List.Item
              key={item.fileid}
              actions={[
                <Button type="danger" onClick={() => this.DeleteFile(item.fileid)}>
                  删除
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={<a href={httpAddress + item.filesrc} target='_blank'>{item.filename}</a>}
              />
              <div>{<a href={httpAddress + item.filesrc} target='_blank'>{item.filedescription}</a>}</div>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}
