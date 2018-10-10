import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, List } from 'antd';
import { routerRedux } from 'dva/router';
import { getAuthority } from '../../utils/authority';
import { cookieToJson } from '../../utils/cookieToJson';
import httpAddress from '../../../public/constant';

@connect(state => ({
  images: state.document.images,
}))
export default class ImageList extends PureComponent {
  state = {
    loading: true,
    images: [],
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
    const { images = [] } = this.props;
    this.setState({ images: [...images], loading: false });
  }

  DeleteFile(fileid) {
    var Images = [];
    const { dispatch } = this.props;
    const { images } = this.state;
    this.setState({ loading: true });
    console.log(fileid);
    Images = [...images];
    for (var i = 0; i < Images.length; i++) {
      if (Images[i - 1].fileid === fileid) Images.splice(i, 1);
      break;
    }
    dispatch({
      type: 'document/getFile',
      payload: {
        fileid: fileid,
      },
    });
    this.setState({ images: [...Images], loading: false });
  }
  render() {
    const { images = [], loading } = this.state;

    return (
      <Card>
        <List
          itemLayout="vertical"
          pagination
          dataSource={images}
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
