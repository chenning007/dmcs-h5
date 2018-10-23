import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Tabs, Button, Icon, Checkbox, Alert } from 'antd';
import { urlArgs } from '../../utils/searchToJson';
import styles from './Login.less';
import logo from '../../assets/logo.svg';

const FormItem = Form.Item;
const { TabPane } = Tabs;

@connect(state => ({
  login: state.login,
}))
@Form.create()
export default class Login extends Component {
  state = {
    type: 'account',
  };

  componentDidMount() {
    const { location, dispatch } = this.props;
    if (location.search !== null && location.search !== undefined && location.search !== '') {
      const verify = urlArgs(location).verify;
      if (verify !== undefined && verify !== {}) {
        dispatch({
          type: 'login/verify',
          payload: { verify },
        });
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSwitch = type => {
    this.setState({ type });
  };

  handleSubmit = e => {
    const { form, dispatch } = this.props;
    const { type } = this.state;
    e.preventDefault();
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: {
            ...values,
            type,
          },
        });
      }
    });
  };

  renderMessage = message => {
    return <Alert style={{ marginBottom: 24 }} message={message} type="error" showIcon />;
  };

  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    const { type } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/user/firstpage">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>DMCS Valley</span>
            </Link>
          </div>
          <div className={styles.desc}>DMCS Valley 最先进的物联网解决方案专家</div>
        </div>
        <div className={styles.main}>
          <Form onSubmit={this.handleSubmit}>
            <Tabs
              animated={false}
              className={styles.tabs}
              activeKey={type}
              onChange={this.onSwitch}
            >
              <TabPane tab="账户密码登录" key="account">
                {login.status === 'error' &&
                  login.type === 'account' &&
                  login.submitting === false &&
                  this.renderMessage('账户或密码错误')}
                <FormItem>
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        required: type === 'account',
                        message: '请输入用户名/手机/邮箱！',
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      prefix={<Icon type="user" className={styles.prefixIcon} />}
                      placeholder="用户名/手机/邮箱"
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: type === 'account',
                        message: '请输入密码！',
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      prefix={<Icon type="lock" className={styles.prefixIcon} />}
                      type="password"
                    />
                  )}
                </FormItem>
              </TabPane>
            </Tabs>
            <FormItem className={styles.additional}>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox className={styles.autoLogin}>自动登录</Checkbox>)}
              <a className={styles.forgot} href="">
                忘记密码
              </a>
              <Button
                size="large"
                loading={login.submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
            </FormItem>
          </Form>
          <div className={styles.other}>
            <Link className={styles.register} to="/user/register">
              注册账户
            </Link>
            <Link to="/user/firstpage">返回首页</Link>
          </div>
        </div>
      </div>
    );
  }
}
