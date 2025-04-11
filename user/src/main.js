import express from 'express';
import morgan from 'morgan';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import auth from './routers/auth.route.js';
import users from './routers/users.route.js';
import { errorsHandler } from './middlewares/errorsHandler.js';
import { conectionDB } from './config/db.js';

const app = express();

config.NODE_ENV === 'development'
    ? app.use(morgan('dev'))
    : app.use(morgan('combined'));

conectionDB();

app
    .use(cookieParser())
    .use(express.json())
    .use('/auth', auth)
    .use('/users', users)
    .use(errorsHandler);

const server = app.listen(config.PORT, () => {
    console.log(
        `Server running in ${config.NODE_ENV} mode on ${config.PORT} PORT`
            .bgMagenta
    );
});

process.on('unhandledRejection', e => {
    console.log(`Error: ${e.message}`.red.underline.bold);
    server.close(() => process.exit(1));
});
