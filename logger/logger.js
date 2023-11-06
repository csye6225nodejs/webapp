const { createLogger, transports, format } = require('winston')

const customFormat = format.combine(format.timestamp(), format.printf((info) => {
    return `[${info.level.toUpperCase().padEnd(4)}] - ${info.message}`
}))
const logger = createLogger({
    format: customFormat,
    level: 'debug',
    transports: [
        new transports.File({ filename: 'logs/csye6225.log'}),
    ]
});

module.exports = logger;
