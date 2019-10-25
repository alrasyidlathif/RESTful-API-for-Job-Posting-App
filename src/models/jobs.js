// import required dependencies
const uuidv4 = require('uuid/v4');

// import required files
const conn = require('../configs/db');

console.log('model'); // where I am

module.exports = {
  readJobs: function(searchData) {
    return new Promise( function(resolve, reject) {
      // get offset by page
      let offset = 0;
      const limit = 5;
      if (searchData.page != 1) {
        offset = 5*(searchData.page-1);
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

      if (searchData.name != null && searchData.company != null) {
        const data = [searchData.name, searchData.company];
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
            resolve(result);
          } else {
            reject(new Error(err));
          }
        });
      } else if (searchData.name != null) {
        const data = [searchData.name];
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
            resolve(result);
          } else {
            reject(new Error(err));
          }
        });
      } else if (searchData.company != null) {
        const data = [searchData.company];
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
            resolve(result);
          } else {
            reject(new Error(err));
          }
        });
      } else {
        conn.query(`SELECT j.id, j.name AS jobs, j.description,
            cat.name AS category, j.salary, j.location,
            com.name AS company, j.date_added, j.date_updated
            FROM category cat
            INNER JOIN jobs j ON j.category_id = cat.id
            INNER JOIN company com ON j.company_id = com.id
            ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`,
        function(err, result) {
          console.log(result);
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        });
      }
    });
  },


  createJobs: function(dataJobs, dataCategory) {
    return new Promise( function(resolve, reject) {
      conn.query('SELECT * FROM company WHERE id = ?',
          dataJobs.company_id, function(err, result) {
            if (result.length == 0) {
              resolve({error: 'company did not found'});
            } else {
              conn.query('SELECT * FROM category WHERE name = ?',
                  dataCategory.name, function(err, result) {
                    if (result.length > 0) {
                      dataJobs.category_id = result[0].id;
                    } else {
                      const categoryId = uuidv4();
                      dataCategory.id = categoryId;
                      dataJobs.category_id = categoryId;
                      conn.query('INSERT INTO category SET ?',
                          dataCategory, function(err, result) {
                            if (err) {
                              reject(new Error(err));
                            }
                          }
                      );
                    }
                    conn.query('INSERT INTO jobs SET ?',
                        dataJobs, function(err, result) {
                          if (!err) {
                            resolve(result);
                          } else {
                            reject(new Error(err));
                          }
                        }
                    );
                  }
              );
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
      delete updateData['category']; // meskipun const tapi bisa didelete
      updateData['category_id'] = catData['id'];
    };

    return new Promise( function(resolve, reject) {
      conn.query(`SELECT * FROM jobs WHERE id = '${jobsId}'`,
          [updateData], function(err, result) {
            if (!err) {
              if (result.length == 0) {
                resolve({error: 'jobs did not found'});
              }

              if (catData != null) {
                conn.query(`INSERT INTO category SET ?`,
                    catData, function(err, result) {
                      if (err) {
                        Error(err);
                      } else {
                        console.log('success update category');
                      }
                    }
                );
              }

              conn.query(`UPDATE jobs SET ? WHERE id = '${jobsId}'`,
                  [updateData], function(err, result) {
                    if (!err) {
                      resolve(result);
                    } else {
                      reject(new Error(err));
                    }
                  }
              );
            } else {
              reject(new Error(err));
            }
          }
      );
    });
  },


  deleteJobs: function(jobsId) {
    return new Promise( function(resolve, reject) {
      conn.query('DELETE FROM jobs WHERE id = ?',
          jobsId, function(err, result) {
            if (!err) {
              resolve(result);
            } else {
              reject(new Error(err));
            }
          }
      );
    });
  },

};
