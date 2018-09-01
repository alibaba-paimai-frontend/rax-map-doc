var webpack =  require('webpack');
var path = require('path');

module.exports = {
  source: ['./rax-map', './articles', 'CHANGELOG.md'],
  output: './_site',
  entry: {
    index: {
      theme: './_theme',
      htmlTemplate: './_theme/static/template.html'
    }
  },
  plugins: [
    'bisheng-plugin-react?lang=__react',
    'bisheng-plugin-antd'
  ],
  port: 9001,
  webpackConfig(config) {
    // config.externals = {
    //   'React': 'react'
    // },
    // config.plugins = [
    //   new webpack.ProvidePlugin({
    //     "React": "react",
    //   }),
    // ],
    config.resolve.alias = {
      'rax-map': path.join(process.cwd(), 'rax-map'),
      //'libs': path.join(process.cwd(), 'libs'),
      'react-router': 'react-router/umd/ReactRouter'
    };
    return config;
  },
  root: ''
};
