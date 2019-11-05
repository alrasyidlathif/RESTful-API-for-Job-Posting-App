// import required dependencies
const configs = require('../configs/configs');
const jwtSecret = configs.jwtSecret;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

// const uuidv4 = require('uuid/v4');
// const { check, validationResult } = require('express-validator');

// import required files
const loginModels = require('../models/login');
console.log('controller'); // where I am
module.exports = {

  loginUser: function(req, res) {
    const errors = validationResult(req);
    // is username, password valid
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Invalid input',
        result: errors.array(),
      });
    }

    const username = req.body.username;
    const password = req.body.password;

    // if (username == null || password == null) {
    //   res.json({'error': 'username or password cannot be empty'});
    //     }

    const data_login = {
      'username': username,
      'password': password,
    };

    loginModels.loginUser(data_login)
        .then( function(result) {
          if (result.error) {
            res.status(400).json(result);
          }

          compareInfo = bcrypt.compareSync(data_login.password, result.hash);

          if (!compareInfo) {
            res.status(400).json({
              status: 400,
              error: true,
              message: 'Wrong password',
              result: {},
            });
          }

          // generate token for logged in user
          const token = 'hello00world ' + jwt.sign({data_login},
              jwtSecret, {expiresIn: 3600}); // per unit second

          res.status(201).json({
            status: 201,
            error: false,
            message: 'Login as ' + result.username,
            result: {
              authorization: token,
            },
          });
        })
        .catch( function(err) {
          console.log(err);
          res.status(500).json({
            status: 500,
            error: true,
            message: 'Internal server error',
            result: {},
          });
        });
  },

};
