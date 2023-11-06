const StatsD = require('node-statsd');

const statsdClient = new StatsD({
  host: process.env.DB_HOST,  
  port: 8125,        
});

module.exports = statsdClient;