const conn = require('../configs/db');

module.exports = {
  findOne: function(dataUsername) {
    return new Promise( function(resolve, reject) {
      conn.query('SELECT * FROM user WHERE username = ?',
          dataUsername, function(err, result) {
            if (err) {
              reject(err);
            } else {
              if (result.length == 0) {
                resolve(false);
              } else {
                // console.log(result);
                resolve(result);
              }
            }
          }
      );
    });
  },
};
