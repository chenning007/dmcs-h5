import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, List, Icon, Button  } from 'antd';
import { routerRedux } from 'dva/router';
import { getAuthority } from '../../utils/authority';
import { cookieToJson } from '../../utils/cookieToJson';
import {httpAddress} from '../../../public/constant';

@connect(state => ({
  images: state.document.images,
  document:state.document,
}))
export default class ImageList extends PureComponent {
  state = {
    loading: true,
    images: [],
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

  componentWillReceiveProps(nextProps){
    const {fuzhi}=this.state;

    if(fuzhi && nextProps.document.images.length>0){
      this.setState({ images: [...nextProps.document.images], loading: false,fuzhi: false });
    }
  }

  DeleteFile(fileid) {
    var Images = [];
    const { dispatch } = this.props;
    const { images } = this.state;
    this.setState({ loading: true });
    console.log(fileid);
    Images = [...images];
    for (var i = 0; i < Images.length; i++) {
      if (Images[i].fileid === fileid) Images.splice(i, 1);
      break;
    }
    dispatch({
      type: 'document/deleteFile',
      payload: {
        fileid: fileid,
      },
    });
    this.setState({ images: [...Images], loading: false });
  }

  ReturnRouter(){
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/authority/manage_file'));
  }

  render() {
    const { images = [], loading } = this.state;

    return (
      <Card title='上传图片' extra={<Button type='primary' onClick={() =>this.ReturnRouter()}><Icon type="rollback" /></Button>}>
        <List
          itemLayout="horizontal"
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
