const Koa = require('koa');
const winston = require('winston');

const app = new Koa();
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'promo-observer' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// response
app.use((ctx) => {
  ctx.body = 'Hello Koa';
});

logger.info('Init server');
app.listen(3000);
