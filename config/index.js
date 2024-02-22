const defaultConfig = require('./default');
const developmentConfig = require('./development');
const productionConfig = require('./production');

const environment = process.env.NODE_ENV || 'development'; 

let environmentConfig = {};

if (environment === 'development') {
    environmentConfig = developmentConfig;
} else if (environment === 'production') {
environmentConfig = productionConfig;
}

module.exports = {...defaultConfig, ...environmentConfig};

