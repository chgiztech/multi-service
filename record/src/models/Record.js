import config from '../config/config.js';

export const RecordModel = (sequelize, DataTypes) => {
  return sequelize.define(
    config.POSTGRES_SQL_TABLE,
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
