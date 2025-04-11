import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname + '/config.env' });

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,

  SMPT_HOST: process.env.SMPT_HOST,
  SMPT_PORT: process.env.SMPT_PORT,
  SMPT_EMAIL: process.env.SMPT_EMAIL,
  SMPT_PASSWORD: process.env.SMPT_PASSWORD,

  FROM_NAME: process.env.FROM_NAME,
  FROM_EMAIL: process.env.FROM_EMAIL,

  SUBJECT: process.env.SUBJECT,

  MES_BROKER_HOST: process.env.MES_BROKER_HOST,
  QUEUE: process.env.QUEUE,
};
