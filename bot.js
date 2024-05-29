// bot.js
const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const minecraftData = require('minecraft-data');
const logger = require('./config');

const bot = mineflayer.createBot({
  host: process.env['host'], // Địa chỉ server Minecraft
  port: process.env['port'], // Cổng server Minecraft
  username: process.env['username'], // Tên người dùng Minecraft (tài khoản TLauncher)
  version: false // Phiên bản Minecraft (tự động phát hiện nếu là false)
});

bot.loadPlugin(pathfinder);

bot.on('login', () => {
  logger.info(`Logged in as ${bot.username}`);
});

bot.on('spawn', () => {
  logger.info('Bot spawned in the game');
  const mcData = minecraftData(bot.version);
  const defaultMove = new Movements(bot, mcData);
  bot.pathfinder.setMovements(defaultMove);
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  logger.info(`${username}: ${message}`);
  if (message === 'come') {
    const player = bot.players[username];
    if (player) {
      const { position } = player.entity;
      bot.pathfinder.setGoal(new goals.GoalNear(position.x, position.y, position.z, 1));
    }
  }
});

bot.on('death', () => {
  logger.warn('Bot has died. Attempting to use /back.');
  bot.once('spawn', () => {
    bot.chat('/back');
  });
});

bot.on('error', (err) => {
  logger.error(`Bot encountered an error: ${err}`);
  process.exit(1); // Thoát với mã lỗi
});

bot.on('end', () => {
  logger.warn('Bot has ended');
  // Tự động kết nối lại sau 10 giây
  // setTimeout(() => {
  //   process.exit();
  // }, 10000);
  process.exit(0); // 0 giây
});

module.exports = bot;
