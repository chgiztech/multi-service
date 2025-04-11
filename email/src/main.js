import express from 'express';
import config from './config/config.js';
import mailService from './services/rabbitmq.service.js';

const app = express();

mailService.sendwelcomeMail();

const server = app.listen(config.PORT, () => {
  console.log(
    `Server running in ${config.NODE_ENV} mode on ${config.PORT} PORT`
  );
});

process.on('unhandledRejection', (e) => {
  console.log(`Error: ${e.message}`);
  server.close(() => process.exit(1));
});
