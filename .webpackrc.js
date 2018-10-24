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
    '/api/v1/user/login': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/user/login': '' },
    },
    '/api/v1/user/temcheck': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/user/temcheck': '' },
    },
    '/api/v1/user/register': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/user/register': '' },
    },
    '/api/v1/user/getuser': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/user/getuser': '' },
    },
    '/api/v1/user/logout': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/user/logout': '' },
    },
    '/api/v1/user/verifyaccount': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/user/verifyaccount': '' },
    },
    '/api/v1/user/motivate': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/user/motivate': '' },
    },
    '/api/v1/user/updateuser': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/user/updateuser': '' },
    },
    '/api/v1/user/image': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/user/image': '' },
    },
    '/api/v1/admin/getAdminuser': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/admin/getAdminuser': '' },
    },
    '/api/v1/admin/addAdminuser': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/admin/addAdminuser': '' },
    },
    '/api/v1/admin/changeAuthority': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/admin/changeAuthority': '' },
    },
    '/api/v1/admin/getSelfuser': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/admin/getSelfuser': '' },
    },
    '/api/v1/file/deleteFile': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/file/deleteFile': '' },
    },
    '/api/v1/file/getFilelist': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/file/getFilelist': '' },
    },
    '/api/v1/file/getImagelist': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/file/getImagelist': '' },
    },
    '/api/v1/file/getFileToken': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/file/getFileToken': '' },
    },
    '/api/v1/file/addFile': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/file/addFile': '' },
    },
    '/api/v1/file/getFileImage': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/file/getFileImage': '' },
    },
    '/api/v1/file/addFileImage': {
      target: 'http://127.0.0.1:8080/dmcs',
      changeOrigin: true,
      pathRewrite: { '^api/v1/file/addFileImage': '' },
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
