// import required dependencies
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// import required files
const conn = require('../configs/db');
console.log('model'); // where I am
module.exports = {

  loginUser: function(data_login) {
    return new Promise( function(resolve, reject) {
      conn.query('SELECT * FROM user WHERE username = ?',
          data_login.username, function(err, result) {
            if (!err) {
              if (result.length == 0) {
                resolve({
                  status: 400,
                  error: true,
                  message: 'Username was not registered',
                  result: {},
                });
              } else {
                const hash = result[0].password;
                const username = result[0].username;
                const data = {
                  'username': username,
                  'hash': hash,
                };

                resolve(data);
              }
            } else {
              reject(err);
            }
          });
    });
  },
};
