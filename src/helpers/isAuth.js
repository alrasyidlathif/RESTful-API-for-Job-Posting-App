// import required dependencies
const configs = require('../configs/configs');
const jwtSecret = configs.jwtSecret;
// const expressjwt = require('express-jwt')
const jwt = require('jsonwebtoken');
currentUserModel = require('../models/currentUser');

// We are assuming that the JWT will come in the header Authorization
// but it could come in the req.body or in a query param,
// you have to decide what works best for you.

module.exports = {
  getToken: function(req, res, next) {
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'hello00world') {
      const token = req.headers.authorization.split(' ')[1];
      decoded = jwt.decode(token, jwtSecret);

      if (decoded.exp <= (Date.now().valueOf() / 1000) ) { 
        console.log(Date.now().valueOf() / 1000);
        console.log(decoded.exp); // use global time
        res.status(401).json({
          status: 401,
          error: true,
          message: 'Expired token. Log out and log in again.',
          result: 'Unauthorized',
        });
      }

      const userRecord = currentUserModel.findOne(decoded.data_login.username);
      req.currentUser = userRecord;
      if (!userRecord) {
        res.status(401).json({
          status: 401,
          error: true,
          message: 'Wrong token',
          result: 'Unauthorized',
        });
      } else {
        console.log(decoded.data_login.username + ' was authorized');
        return next();
      }
    } else {
      res.status(401).json({
        status: 401,
        error: true,
        message: 'Invalid token',
        result: 'Unauthorized',
      });
    }
  },
};
