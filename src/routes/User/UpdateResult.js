import React, {Component} from 'react';
import { Button } from 'antd';
import { Link, Route, Redirect, Switch, routerRedux } from 'dva/router';
import Result from '../../components/Result';
import styles from './RegisterResult.less';
import logo from '../../assets/logo.svg';

const title = <div className={styles.title}>你的账户：AntDesign@example.com 注册成功</div>;

const actions = (
  <div className={styles.actions}>
    <Link to="/user/login"><Button size="large" type="primary">重新登录</Button></Link>
    <Link to="/user/firstpage"><Button size="large">返回首页</Button></Link>
  </div>
);


export default class UpdateResult extends Component { 
  show_title() {
    if(this.props.location.state!== undefined){
      return (<div className={styles.title}>你的账户：{this.props.location.state.email} 注册成功</div>);
    }
    return title;
  }
  render() { 
    return (
    <div style={{paddingTop:110 ,paddingRight:0 ,paddingBottom:144 ,paddingLeft:0}}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Link to="/">
            <img alt="logo" className={styles.logo} src={logo} />
            <span className={styles.title}>DMCS Valley</span>
          </Link>
        </div>
        <div className={styles.desc}>DMCS Valley 最先进的物联网解决方案专家</div>
      </div>
      <Result
        className={styles.registerResult}
        type="error"
        title="会话失败，请登录"
        description="返回登录界面或回到主页"    
        actions={actions}
        style={{ marginTop: 56 }}
      />
    </div>);
  }
};
