import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Select, Popover, Progress } from 'antd';
import styles from './Register.less';
import logo from '../../assets/logo.svg';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  pool: <div className={styles.error}>强度：太短</div>,
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  pool: 'exception',
};

@connect(state => ({
  register: state.register,
}))
@Form.create()
export default class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
    register_status: true,
  };

  componentWillReceiveProps(nextProps) {
    const { getFieldValue } = this.props.form;
    if (nextProps.register.status === 'ok') {
      if (getFieldValue('mail') && getFieldValue('username')) {
        this.props.dispatch(
          routerRedux.push({
            pathname: '/user/register-result',
            state: {
              username: getFieldValue('username'),
              email: getFieldValue('mail'),
            },
          })
        );
      } else {
        this.props.register.status = '';
      }
    }
    if (nextProps.register.status === 'error') {
      this.setState({ register_status: false });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'pool';
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'register/submit',
          payload: {
            ...values,
            prefix: this.state.prefix,
          },
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!this.state.visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value,
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, register } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix } = this.state;
    return (
      <div style={{ paddingTop: 110, paddingRight: 0, paddingBottom: 144, paddingLeft: 0 }}>
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
          <h3>注册</h3>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              <Popover
                content={<b>"用户名已存在"</b>}
                overlayStyle={{ width: 120 }}
                placement="right"
                visible={!this.state.register_status}
              >
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名！',
                    },
                  ],
                })(<Input size="large" placeholder="用户名,可由字母与数字组成" />)}{' '}
                {/* 这里有必要加入用户名校验措施*/}
              </Popover>
            </FormItem>
            <FormItem>
              {getFieldDecorator('sex', {
                rules: [
                  {
                    required: true,
                    message: '请输入性别！',
                  },
                ],
              })(
                <Select placeholder="性别" style={{ width: '20%' }}>
                  <Option value="man">男</Option>
                  <Option value="woman">女</Option>
                  <Option value="man_woman">无</Option>
                </Select>
              )}{' '}
              {/* 这里有必要加入用户名校验措施*/}
            </FormItem>
            <FormItem>
              {getFieldDecorator('mail', {
                rules: [
                  {
                    required: true,
                    message: ' 请输入邮箱地址！',
                  },
                  {
                    type: 'email',
                    message: '邮箱地址格式错误！',
                  },
                ],
              })(<Input size="large" placeholder="邮箱" />)}
            </FormItem>
            <FormItem help={this.state.help}>
              <Popover
                content={
                  <div style={{ padding: '4px 0' }}>
                    {passwordStatusMap[this.getPasswordStatus()]}
                    {this.renderPasswordProgress()}
                    <div style={{ marginTop: 10 }}>
                      请至少输入 6 个字符。请不要使用容易被猜到的密码。
                    </div>
                  </div>
                }
                overlayStyle={{ width: 240 }}
                placement="right"
                visible={this.state.visible}
              >
                {getFieldDecorator('password', {
                  rules: [
                    {
                      validator: this.checkPassword,
                    },
                  ],
                })(
                  <Input
                    size="large"
                    type="password"
                    placeholder="至少6位密码，可有数字和字母组成，区分大小写"
                  />
                )}
              </Popover>
            </FormItem>
            <FormItem>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请确认密码！',
                  },
                  {
                    validator: this.checkConfirm,
                  },
                ],
              })(<Input size="large" type="password" placeholder="确认密码" />)}
            </FormItem>
            <FormItem>
              <InputGroup compact>
                <Select
                  size="large"
                  value={prefix}
                  onChange={this.changePrefix}
                  style={{ width: '20%' }}
                >
                  <Option value="86">+86</Option>
                </Select>
                {getFieldDecorator('mobile', {
                  rules: [
                    {
                      required: true,
                      message: '请输入手机号！',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '手机号格式错误！',
                    },
                  ],
                })(<Input size="large" style={{ width: '80%' }} placeholder="11位手机号" />)}
              </InputGroup>
            </FormItem>

            <FormItem>
              <Button
                size="large"
                loading={register.submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                注册
              </Button>
              <Link className={styles.login} to="/user/login">
                使用已有账户登录
              </Link>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}
