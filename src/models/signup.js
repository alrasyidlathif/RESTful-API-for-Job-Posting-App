// import required dependencies
// const bcrypt = require('bcrypt');

// import required files
const conn = require('../configs/db');
console.log('model'); // where I am
module.exports = {

  signupUser: function(data_signup) {
    return new Promise( function(resolve, reject) {
      conn.query('SELECT * FROM user WHERE username = ?',
          data_signup.username, function(err, result) {
            if (!err) {
              if (result.length > 0) {
                // reject(new Error('username was used by other'));
                resolve({
                  status: 400,
                  error: true,
                  message: 'Username was already used by other',
                  result: {},
                });
              } else {
                conn.query('INSERT INTO user SET ?',
                    data_signup, function(err, result) {
                      if (!err) {
                        resolve(result);
                      } else {
                        reject(err);
                      }
                    }
                );
              }
            } else {
              reject(err);
            }
          }
      );
    });
  },
};
