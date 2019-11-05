// import required dependencies
const uuidv4 = require('uuid/v4');

// import required files
const conn = require('../configs/db');

console.log('model'); // where I am

module.exports = {
  readJobs: function(searchData, myCategory) {
    return new Promise( function(resolve, reject) {
      // get offset by page
      let offset = 0;
      const limit = 10;
      // console.log(typeof searchData.page);
      // console.log('===============');
      if (Number(searchData.page) != 1) {
        offset = limit*(Number(searchData.page)-1);
      }

      console.log('order by: ' + searchData.order); // what order by
      let order = 'NULL';
      if (searchData.order != null) {
        order = searchData.order;
        if (order == 'category') {
          order = 'cat.name';
        } else {
          order = 'j.'+order;
        }
      }

      // get how many data in db
      // conn.query(`SELECT COUNT(*) FROM jobs`, function(err0, result0) {
      // if (!err0) {
      // SELECT COUNT(id) AS dataFound lebih simple, tinggal result.dataFound
      if (searchData.name != null && searchData.company != null) {
        const data = [searchData.name, searchData.company];
        conn.query(`SELECT COUNT(*) AS dataFound FROM jobs j
            INNER JOIN company com ON j.company_id = com.id
            WHERE j.name LIKE "%"?"%" AND com.name LIKE "%"?"%"`,
        data, function(err1, result1) {
          if (!err1) {
            conn.query(`SELECT j.id, j.name AS jobs, j.description,
                cat.name AS category, j.salary, j.location,
                com.name AS company, j.date_added, j.date_updated
                FROM category cat
                INNER JOIN jobs j ON j.category_id = cat.id
                INNER JOIN company com ON j.company_id = com.id
                WHERE j.name LIKE "%"?"%"
                AND com.name LIKE "%"?"%"
                ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`,
            data, function(err, result) {
              if (!err) {
                resolve([result1, result]);
              } else {
                reject(err);
              }
            });
          } else {
            reject(err1);
          }
        });
      } else if (searchData.name != null) {
        const data = [searchData.name];
        conn.query(`SELECT COUNT(*) AS dataFound FROM jobs j
            INNER JOIN company com ON j.company_id = com.id
            WHERE j.name LIKE "%"?"%"`,
        data, function(err1, result1) {
          if (!err1) {
            conn.query(`SELECT j.id, j.name AS jobs, j.description,
                cat.name AS category, j.salary, j.location,
                com.name AS company, j.date_added, j.date_updated
                FROM category cat
                INNER JOIN jobs j ON j.category_id = cat.id
                INNER JOIN company com ON j.company_id = com.id
                WHERE j.name LIKE "%"?"%"
                ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`,
            data, function(err, result) {
              if (!err) {
                resolve([result1, result]);
              } else {
                reject(err);
              }
            });
          } else {
            reject(err1);
          }
        });
      } else if (searchData.company != null) {
        const data = [searchData.company];
        conn.query(`SELECT COUNT(*) AS dataFound FROM jobs j
            INNER JOIN company com ON j.company_id = com.id
            WHERE com.name LIKE "%"?"%"`,
        data, function(err1, result1) {
          if (!err1) {
            conn.query(`SELECT j.id, j.name AS jobs, j.description,
                cat.name AS category, j.salary, j.location,
                com.name AS company, j.date_added, j.date_updated
                FROM category cat
                INNER JOIN jobs j ON j.category_id = cat.id
                INNER JOIN company com ON j.company_id = com.id
                WHERE com.name LIKE "%"?"%"
                ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`,
            data, function(err, result) {
              if (!err) {
                resolve([result1, result]);
              } else {
                reject(err);
              }
            });
          } else {
            reject(err1);
          }
        });
      } else {
        if (myCategory != null) {
          conn.query(`SELECT COUNT(*) AS dataFound FROM jobs j
              INNER JOIN category cat ON j.category_id = cat.id
              WHERE cat.name = ?`, myCategory,
          function(err1, result1) {
            if (!err1) {
              conn.query(`SELECT j.id, j.name AS jobs, j.description,
                  cat.name AS category, j.salary, j.location,
                  com.name AS company, j.date_added, j.date_updated
                  FROM category cat
                  INNER JOIN jobs j ON j.category_id = cat.id
                  INNER JOIN company com ON j.company_id = com.id
                  WHERE cat.name = ?
                  ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`,
              myCategory,
              function(err, result) {
                if (!err) {
                  resolve([result1, result]);
                } else {
                  reject(err);
                }
              });
            } else {
              reject(err1);
            }
          });
        } else {
          conn.query(`SELECT COUNT(*) AS dataFound FROM jobs j
              INNER JOIN company com ON j.company_id = com.id`,
          function(err1, result1) {
            if (!err1) {
              conn.query(`SELECT j.id, j.name AS jobs, j.description,
                  cat.name AS category, j.salary, j.location,
                  com.name AS company, j.date_added, j.date_updated
                  FROM category cat
                  INNER JOIN jobs j ON j.category_id = cat.id
                  INNER JOIN company com ON j.company_id = com.id
                  ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`,
              function(err, result) {
                if (!err) {
                  resolve([result1, result]);
                } else {
                  reject(err);
                }
              });
            } else {
              reject(err1);
            }
          });
        }
      }
    });
  },


  createJobs: function(dataJobs, dataCategory) {
    return new Promise( function(resolve, reject) {
      conn.query('SELECT * FROM company WHERE id = ?',
          dataJobs.company_id, function(err0, result0) {
            if (!err0) {
              console.log(0);
              if (result0.length == 0) {
                resolve({
                  status: 400,
                  error: true,
                  message: 'Company id was not found',
                  result: {},
                });
              } else {
                conn.query('SELECT * FROM category WHERE name = ?',
                    dataCategory.name, function(err1, result1) {
                      if (!err1) {
                        console.log(1);
                        if (result1.length > 0) {
                          console.log('1.a');
                          dataJobs.category_id = result1[0].id;
                          conn.query('INSERT INTO jobs SET ?',
                              dataJobs, function(err2, result2) {
                                if (!err2) {
                                  console.log(2);
                                  resolve(result2);
                                } else {
                                  reject(err2);
                                }
                              }
                          );
                        } else {
                          console.log('1.b');
                          const categoryId = uuidv4();
                          dataCategory.id = categoryId;
                          dataJobs.category_id = categoryId;
                          console.log(dataCategory);
                          conn.query('INSERT INTO category SET ?',
                              dataCategory, function(err2, result2) {
                                if (!err2) {
                                  console.log(2);
                                  conn.query('INSERT INTO jobs SET ?',
                                      dataJobs, function(err3, result3) {
                                        if (!err3) {
                                          console.log(3);
                                          resolve(result3);
                                        } else {
                                          reject(err3);
                                        }
                                      }
                                  );
                                } else {
                                  reject(err2);
                                }
                              }
                          );
                        }
                      } else {
                        reject(err1);
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


  updateJobs: function(updateData, jobsId) {
    const catData = {};
    if ('category' in updateData) {
      catData['name'] = updateData['category'];
      catData['id'] = uuidv4();
      delete updateData['category'];
      updateData['category_id'] = catData['id'];
    };

    return new Promise( function(resolve, reject) {
      conn.query(`SELECT * FROM jobs WHERE id = '${jobsId}'`,
          [updateData], function(err, result) {
            if (!err) {
              if (result.length === 0) {
                resolve({
                  status: 400,
                  error: true,
                  message: 'Job id was not found',
                  result: {},
                });
              } else {
                if (Object.keys(catData).length !== 0) {
                  conn.query(`INSERT INTO category SET ?`,
                      catData, function(err, result) {
                        if (err) {
                          reject(err);
                        }
                      }
                  );
                }
                conn.query(`UPDATE jobs SET ? WHERE id = '${jobsId}'`,
                    [updateData], function(err, result) {
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


  deleteJobs: function(jobsId) {
    return new Promise( function(resolve, reject) {
      conn.query('SELECT * FROM jobs WHERE id = ?',
          [jobsId], function(err, result) {
            if (!err) {
              if (result.length == 0) {
                resolve({
                  status: 400,
                  error: true,
                  message: 'Job id was not found',
                  result: {},
                });
              } else {
                conn.query('DELETE FROM jobs WHERE id = ?',
                    jobsId, function(err, result) {
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
