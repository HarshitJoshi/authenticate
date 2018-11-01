'use strict';
const { createLogger, format, transports } = require('winston');
const { colorize, combine, timestamp, printf } = format;

const customFormat = printf(info => {
  return `${info.timestamp} ${info.level} ${info.message}`;
});

const logger = createLogger({
  transports: [new transports.Console()],
  format: combine(
    timestamp(),
    colorize(),
    customFormat
  )
});

module.exports = logger;