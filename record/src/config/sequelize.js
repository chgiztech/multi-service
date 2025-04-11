import { Sequelize, DataTypes } from 'sequelize';
import { RecordModel } from '../models/Record.js';
import config from './config.js';

const sequelize = new Sequelize(config.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export const conectionDB = async () => {
  await sequelize.authenticate();
  console.log('Connection to PostgresSQL is successful'.bgCyan.underline);

  if (config.NODE_ENV === 'development') {
    await sequelize.sync({ force: false });
    console.log('Table recreated successfully'.bgGreen);
  } else {
    await sequelize.sync();
  }
};

export default RecordModel(sequelize, DataTypes);
