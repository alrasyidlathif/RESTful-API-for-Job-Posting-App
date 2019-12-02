// import required dependencies
// const uuidv4 = require('uuid/v4');

// import required files
const conn = require('../configs/db');
console.log('model'); // where I am
module.exports = {
  readCompany: function() {
    return new Promise( function(resolve, reject) {
      conn.query('SELECT * FROM company', function(err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },


  createCompany: function(data_company) {
    return new Promise( function(resolve, reject) {
      conn.query('SELECT * FROM company WHERE name = ?',
          data_company.name, function(err, result) {
            if (!err) {
              if (result.length > 0) {
                resolve({
                  status: 400,
                  error: true,
                  message: 'Company name was already used by other',
                  result: {},
                });
              } else {
                conn.query('INSERT INTO company SET ?',
                    data_company, function(err, result) {
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


  updateCompany: function(data, companyId) {
    return new Promise( function(resolve, reject) {
      conn.query('SELECT * FROM company WHERE id = ?',
          companyId, function(err, result) {
            if (!err) {
              if (result.length == 0) {
                resolve({
                  status: 400,
                  error: true,
                  message: 'Company id was not found',
                  result: {},
                });
              } else {
                conn.query('UPDATE company SET ? WHERE id = ?',
                    [data, companyId], function(err, result) {
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


  deleteCompany: function(companyId) {
    return new Promise( function(resolve, reject) {
      conn.query('SELECT * FROM company WHERE id = ?',
          [companyId], function(err0, result0) {
            if (!err0) {
              if (result0.length == 0) {
                resolve({
                  status: 400,
                  error: true,
                  message: 'Company id was not found',
                  result: {},
                });
              } else {
                conn.query('DELETE FROM company WHERE id = ?',
                    companyId, function(err1, result1) {
                      if (err1) {
                        reject(err1);
                      } else {
                        conn.query('DELETE FROM jobs WHERE company_id = ?',
                            companyId, function(err, result) {
                              if (err) {
                                reject(err);
                              } else {
                                resolve(result);
                              }
                            });
                      }
                    }
                );
              }
            } else {
              reject(err0);
            }
          }
      );
    });
  },

};
