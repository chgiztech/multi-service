import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/config.js';

export const UserModel = (sequelize, DataTypes, Sequelize) => {
  const User = sequelize.define(
    config.POSTGRES_SQL_TABLE,
    {
      _id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => {
          const salt = crypto
            .randomBytes(config.SALT_LENGTH)
            .toString(config.BYTE_TO_STRING_ENCODING);

          return crypto
            .pbkdf2Sync(
              '_id',
              salt,
              config.ITERATIONS,
              config.LENGTH,
              config.DIGEST
            )
            .toString(config.BYTE_TO_STRING_ENCODING);
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_reg: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
    }
  );

  User.prototype.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRE,
    });
  };

  return User;
};
