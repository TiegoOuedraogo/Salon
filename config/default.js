module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'defaultSecretKey',
    dbUri: process.env.DB_URI || 'mongodb://localhost:27017/salon',
  };

