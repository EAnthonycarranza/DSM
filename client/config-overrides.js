const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    'pdfjs-dist/build/pdf.worker.mjs': path.join(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.mjs'),
  })
);
