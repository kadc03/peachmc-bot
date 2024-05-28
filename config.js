// config.js
const log4js = require('log4js');

log4js.configure({
  appenders: { out: { type: 'console' }, app: { type: 'file', filename: 'bot.log' } },
  categories: { default: { appenders: ['out', 'app'], level: 'debug' } }
});

const logger = log4js.getLogger();

module.exports = logger;
