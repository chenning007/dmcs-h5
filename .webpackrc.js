const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  externals: {
    '@antv/data-set': 'DataSet',
    rollbar: 'rollbar',
  },
  //
  proxy: {
    '/api/v1/user/image': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/user/image': '' },
    },
    '/api/v1/file/addFile': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/file/addFile': '' },
    },
  },
  //
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};
