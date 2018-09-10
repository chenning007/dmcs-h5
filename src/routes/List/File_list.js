import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Card, } from 'antd';
import styles from './File_list.less';


/* eslint react/no-array-index-key: 0 */
@connect()
export default class CoverCardList extends PureComponent {

  render() {
    return (
      <div className={styles.coverCardList}>
        <Card>
          内容待完善
        </Card>
    </div>
    );
  }
}
