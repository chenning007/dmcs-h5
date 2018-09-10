import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row,  Card,} from 'antd';



import styles from './Data_list.less';


@connect()
export default class Data_list extends PureComponent {
  render() {

    return (
        <Row gutter={24}>
          <Card>
              内容待完善
          </Card>
        </Row>
            
    );
  }
}
