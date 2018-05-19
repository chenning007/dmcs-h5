import 'babel-polyfill';
import dva from 'dva';
import 'moment/locale/zh-cn';
import FastClick from 'fastclick';
import './g2';
import './rollbar';
import onError from './error';
import createHistory from 'history/createHashHistory';
// import browserHistory from 'history/createBrowserHistory';
//import createLoading from 'dva-loading';
import './index.less';
// 1. Initialize
const app = dva({
  history: createHistory(),
});
/*const app = dva({
  // history: browserHistory(),
  onError,
});*/

// 2. Plugins

//`app.use(createLoading());

// 3. Register global model,这个不知道有没有调用过
app.model(require('./models/global'));

// 4. Router
app.router(require('./router'));



// 5. Start
app.start('#root');

export default app._store;
