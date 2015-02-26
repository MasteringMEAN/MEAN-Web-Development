var path = require('path');

module.exports = require(path.resolve('./config/env/' + process.env.NODE_ENV + '.js'));