// import required dependencies
const uuidv4 = require('uuid/v4');

// import required files
const conn = require('../configs/db')
console.log('model')
module.exports = {
    readJobs: function(){
        return new Promise( function(resolve, reject){
            conn.query('SELECT j.id, j.name AS jobs, j.description, cat.name AS category, j.salary, j.location, com.name AS company, j.date_added, j.date_updated FROM jobs j INNER JOIN category cat ON j.category_id = cat.id INNER JOIN company com ON j.company_id = com.id', function(err, result){
            //conn.query('SELECT * FROM jobs', function(err,result){
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    createJobs: function(data_jobs, data_category, data_company){
        return new Promise( function(resolve, reject){

            conn.query('SELECT * FROM category WHERE name = ?', data_category.name, function(err, result){
                if (result.length > 0){
                    console.log(result)
                    data_jobs.category_id = result[0].id
                } else {
                    const category_id = uuidv4();
                    data_category.id = category_id;
                    data_jobs.category_id = category_id;
                }
                conn.query('INSERT INTO category SET ?', data_category, function(err, result){
                    if (err) {
                        reject(new Error(err))
                    }
                })
            })

            conn.query('SELECT * FROM company WHERE name = ?', data_company.name, function(err, result){
                if (result.length > 0){
                    console.log(result)
                    data_jobs.company_id = result[0].id
                } else {
                    const company_id = uuidv4();
                    data_company.id = company_id;
                    data_jobs.company_id = company_id;
                }
                conn.query('INSERT INTO company SET ?', data_company, function(err, result){
                    if (err) {
                        reject(new Error(err))
                    }
                })
            })

            conn.query('INSERT INTO jobs SET ?', data_jobs, function(err, result){
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    updateJobs: function(data, productid){
        return new Promise( function(resolve, reject){
            conn.query('UPDATE product SET ? WHERE productid = ?', [data, productid], function(err, result){
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    deleteJobs: function(productid){
        return new Promise( function(resolve, reject){
            conn.query('DELETE FROM product WHERE productid = ?', productid, function(err, result){
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}
