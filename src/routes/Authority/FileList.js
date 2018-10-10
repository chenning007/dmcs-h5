import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, List } from 'antd';
import { routerRedux } from 'dva/router';
import { getAuthority } from '../../utils/authority';
import { cookieToJson } from '../../utils/cookieToJson';
import httpAddress from '../../../public/constant';

@connect(state => ({
  files: state.document.files,
}))
export default class FileList extends PureComponent {
  state = {
    loading: true,
    files: [],
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

  componentDidMount() {
    const { files = [] } = this.props;
    this.setState({ files: [...files], loading: false });
  }

  DeleteFile(fileid) {
    var Files = [];
    const { dispatch } = this.props;
    const { files } = this.state;
    this.setState({ loading: true });
    console.log(fileid);
    Files = [...files];
    for (var i = 0; i < Files.length; i++) {
      if (Files[i - 1].fileid === fileid) Files.splice(i, 1);
      break;
    }
    dispatch({
      type: 'document/getFile',
      payload: {
        fileid: fileid,
      },
    });
    this.setState({ files: [...Files], loading: false });
  }
  render() {
    const { files = [], loading } = this.state;

    return (
      <Card>
        <List
          itemLayout="vertical"
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
                title={<a href={httpAddress + item.filesrc}>{item.filename}</a>}
                description={<a href={httpAddress + item.filesrc}>{item.filedescription}</a>}
              />
            </List.Item>
          )}
        />
      </Card>
    );
  }
}
