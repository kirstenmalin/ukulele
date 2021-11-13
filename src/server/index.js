// Enable using the import/export syntax in node rather than require
// eslint-disable-next-line no-global-assign
require = require('esm')(module);
module.exports = require('./server.js');
