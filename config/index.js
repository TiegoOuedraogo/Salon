
  
const config = require('config');
const defaultConfig = require('./default');
const developmentConfig = require('./development');
const productionConfig = require('./production');

let environmentConfig = {};

if (process.env.NODE_ENV === 'development') {
  environmentConfig = developmentConfig;
} else if (process.env.NODE_ENV === 'production') {
  environmentConfig = productionConfig;
}

module.exports = { ...defaultConfig, ...environmentConfig };
