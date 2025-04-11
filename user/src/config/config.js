import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname + '/config.env' });

export default {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE,
  DATABASE_URL: process.env.DATABASE_URL,

  QUEUE: process.env.QUEUE,
  MES_BROKER_HOST: process.env.MES_BROKER_HOST,

  SALT_LENGTH: 8,
  LENGTH: 13,
  ITERATIONS: 2000,
  DIGEST: 'sha256',
  BYTE_TO_STRING_ENCODING: 'hex',
};
