import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import UserModel from '../config/db.js';
import ErrorResponce from './errors.js';

export const protect = async (req, res, next) => {
  let token;
  const reqHeadTok = req.headers.authorization;
  const reqCookTok = req.cookies.token;

  if (reqHeadTok && reqHeadTok.startsWith('Bearer')) {
    token = reqHeadTok.split(' ')[1];
  } else if (reqCookTok) {
    token = reqCookTok;
  }

  if (!token) {
    return next(new ErrorResponce('User not authorized', 401));
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = await UserModel.findOne({
      where: { _id: decoded.id },
    });

    next();
  } catch (e) {
    return next(new ErrorResponce('User not authorized', 401));
  }
};
