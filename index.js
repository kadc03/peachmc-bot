// index.js
const express = require('express');
const bot = require('./bot');
const logger = require('./config');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Minecraft bot is running');
});

app.get('/status', (req, res) => {
  res.json({ status: bot.state });
});

app.listen(port, () => {
  logger.info(`Express server is running on http://localhost:${port}`);
});

setInterval(() => {
  logger.info('Keeping the bot alive');
}, 5 * 60 * 1000);