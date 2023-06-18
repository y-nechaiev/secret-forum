/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

export const checkAuth = (request, response, next) => {
  const token = (request.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.userId = decoded.id;
      next();
    } catch (error) {
      return response.json({
        massage: 'No access!',
      });
    }
  } else {
    return response.json({
      massage: 'No access!',
    });
  }
};
