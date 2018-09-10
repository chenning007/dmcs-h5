import React, { Component } from 'react';
import { connect } from 'dva';
import { Card,} from 'antd';
import { TimelineChart, } from '../../components/Charts';
import styles from './monitor_graph.less';


const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}
function newdata_graph() {
  const ChartData = [];
  for (let i = 0; i < 20; i += 1) {
  ChartData.push({
    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
    y1: Math.floor(Math.random() * 200) + 10,
    y2: Math.floor(Math.random() * 200) + 10,
  });
}
  return ChartData;
}


@connect(state => ({
  chart: state.chart,
}))
export default class Monitor_graph extends Component {
  state = {
    chartdata: newdata_graph(),
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        chartdata: newdata_graph(),
      });
    }, 5000);
  }

  componentWillUnmount() {
    this.setState({chartdata: []});
  }

 
  render() {
    const { chart } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
      loading,
    } = chart;
    const { chartdata }=this.state;

    return (
      <div>
        <Card
          className={styles.offlineCard}
          bordered={false}
          bodyStyle={{ padding: '0 0 32px 0' }}
          style={{ marginTop: 32 }}
        >
          <div style={{ padding: '0 24px' }}>
            <TimelineChart
              height={400}
              data={chartdata}
              titleMap={{ y1: '客流量', y2: '支付笔数' }}
            />
          </div>
        </Card>
      </div>
    );
  }
}
