import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import records from './routers/records.route.js';
import { errorsHandler } from './middlewares/errorsHandler.js';
import { conectionDB } from './config/db.js';

const app = express();

conectionDB();

config.NODE_ENV === 'development'
  ? app.use(morgan('dev'))
  : app.use(morgan('combined'));

app
  .use(cookieParser())
  .use(express.json())
  .use('/records', records)
  .use(errorsHandler);

const server = app.listen(config.PORT, () => {
  console.log(
    `Server running in ${config.NODE_ENV} mode on ${config.PORT} PORT`.bgMagenta
  );
});

process.on('unhandledRejection', (e) => {
  console.log(`Error: ${e.message}`.red.underline.bold);
  server.close(() => process.exit(1));
});
