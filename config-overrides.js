const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@feature': path.resolve(__dirname, 'src/feature'),
    '@redux': path.resolve(__dirname, 'src/redux')
  })
);