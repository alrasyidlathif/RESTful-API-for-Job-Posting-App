// import required dependencies
const uuidv4 = require('uuid/v4');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const moment = require('moment');

// import required files
const signupModels = require('../models/signup');
console.log('controller'); // where I am
module.exports = {

  signupUser: function(req, res) {
    // get error from validation
    const errors = validationResult(req);

    // is username, password, email valid
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Invalid input',
        result: errors.array(),
      });
    }

    // if valid
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        console.log(err);
        res.status(500).json({
          status: 500,
          error: true,
          message: 'Internal server error',
          result: {},
        });
      }
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          res.status(500).json({
            status: 500,
            error: true,
            message: 'Internal server error',
            result: {},
          });
        }

        const id = uuidv4();
        const data_signup = {
          id,
          username,
          'password': hash,
          email,
          'date_registered': moment().format().split('+')[0],
        };
        signupModels.signupUser(data_signup)
            .then( function(result) {
              if (result.error) {
                res.status(400).json(result);
              }
              res.status(201).json({
                status: 201,
                error: false,
                message: 'Your registration was successful',
                result: {
                  username: data_signup.username,
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
      });
    });
  },

};
