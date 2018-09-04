import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Form, Card, List, Button,  } from 'antd';
import AvatarList from '../../components/AvatarList';
import styles from './File_list.less';


/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(state => ({
  list: state.list,
}))
export default class CoverCardList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  handleFormSubmit = () => {
    const { form, dispatch } = this.props;
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    setTimeout(() => {
      form.validateFields((err) => {
        if (!err) {
          // eslint-disable-next-line
          dispatch({
            type: 'list/fetch',
            payload: {
              count: 8,
            },
          });
        }
      });
    }, 0);
  }

  render() {
    const { list: { list = [], loading }, form } = this.props;

    const cardList = list ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              
              cover={<a href="#/list/friendgroup">{<img  alt={item.title}  src={item.cover} height={154} />}</a>}
             
            >
              <Card.Meta
               // title={item.title}
                title={<a href="#/list/friendgroup">{item.title}</a>}
                description={item.subDescription}
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className={styles.avatarList}>
                  <AvatarList size="mini">
                    {
                      item.members.map((member, i) => (
                        <AvatarList.Item
                          key={`${item.id}-avatar-${i}`}
                          src={member.avatar}
                          tips={member.name}
                        />
                      ))
                    }
                  </AvatarList>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    ) : null;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div className={styles.coverCardList}>
        {/*<Card bordered={false}>
          <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus">
            添加
          </Button>
        </Card>
        <div className={styles.cardList}>
          {cardList}
        </div>*/}
        <Card>
          内容待完善
        </Card>
    </div>
    );
  }
}
