const StatsD = require('node-statsd');

const statsdClient = new StatsD();

module.exports = statsdClient;