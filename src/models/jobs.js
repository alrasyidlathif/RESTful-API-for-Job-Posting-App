// import required dependencies
const uuidv4 = require('uuid/v4');

// import required files
const conn = require('../configs/db')
console.log('model')
module.exports = {
    readJobs: function(search_data){
        console.log('ENTER TO readJobs FUNCTION..')
        return new Promise( function(resolve, reject){

            if (search_data.name != null && search_data.company != null){
                const data = [search_data.name, search_data.company];
                conn.query('SELECT j.id, j.name AS jobs, j.description, cat.name AS category, j.salary, j.location, com.name AS company, j.date_added, j.date_updated FROM category cat INNER JOIN jobs j ON j.category_id = cat.id INNER JOIN company com ON j.company_id = com.id WHERE j.name LIKE "%"?"%" AND com.name LIKE "%"?"%"', data, function(err, result){
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                });
            } else
            if (search_data.name != null){
                const data = [search_data.name];
                conn.query('SELECT j.id, j.name AS jobs, j.description, cat.name AS category, j.salary, j.location, com.name AS company, j.date_added, j.date_updated FROM category cat INNER JOIN jobs j ON j.category_id = cat.id INNER JOIN company com ON j.company_id = com.id WHERE j.name LIKE "%"?"%"', data, function(err, result){
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            } else
            if (search_data.company != null){
                const data = [search_data.company];
                conn.query('SELECT j.id, j.name AS jobs, j.description, cat.name AS category, j.salary, j.location, com.name AS company, j.date_added, j.date_updated FROM category cat INNER JOIN jobs j ON j.category_id = cat.id INNER JOIN company com ON j.company_id = com.id WHERE com.name LIKE "%"?"%"', data, function(err, result){
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            } else {
                //conn.query('SELECT * FROM jobs', function(err, result){
                conn.query('SELECT j.id, j.name AS jobs, j.description, cat.name AS category, j.salary, j.location, com.name AS company, j.date_added, j.date_updated FROM category cat INNER JOIN jobs j ON j.category_id = cat.id INNER JOIN company com ON j.company_id = com.id', function(err, result){
                //conn.query('SELECT j.id, j.name AS jobs, j.description, cat.name AS category, j.salary, j.location, j.date_added, j.date_updated FROM category cat INNER JOIN jobs j ON j.category_id = cat.id', function(err, result){
                //conn.query('SELECT j.*, cat.*, com.* FROM jobs j INNER JOIN category cat ON j.category_id = cat.id INNER JOIN company com ON j.company_id = com.id', function(err,result){
                    console.log('ENTER TO readJobs QUERY..')
                    console.log(result)
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            }
        })
    },

    createJobs: function(data_jobs, data_category){
        // console.log(data_jobs)
        // console.log(data_category)
        return new Promise( function(resolve, reject){

            // check if company is valid
            conn.query('SELECT * FROM company WHERE id = ?', data_jobs.company_id, function(err, result){
                console.log(result)
                console.log(data_jobs)
                console.log('========================')
                if (result.length == 0){
                    resolve({error:'company did not found'})
                } else {

                    // check if category is already or not, if not create new category category_id
                    conn.query('SELECT * FROM category WHERE name = ?', data_category.name, function(err, result){
                        console.log('lathif 0')
                        console.log(data_jobs)
                        if (result.length > 0){
                            data_jobs.category_id = result[0].id
                            console.log('lathif 1')
                            console.log(data_jobs)
                            console.log(this.data_jobs)
                        } else {
                            const category_id = uuidv4();
                            data_category.id = category_id;
                            data_jobs.category_id = category_id;
                            console.log('lathif 2')
                            console.log(data_jobs)
                            console.log(this.data_jobs)
                            conn.query('INSERT INTO category SET ?', data_category, function(err, result){
                                if (err) {
                                    reject(new Error(err))
                                }
                            })
                        }
                        console.log(data_jobs)
                        conn.query('INSERT INTO jobs SET ?', data_jobs, function(err, result){
                            console.log('INSERT JOB SUCCESS')
                                if (!err) {
                                    resolve(result)
                                } else {
                                    reject(new Error(err))
                            }
                        })
                    })                  
                }
            })
        }
    )},

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
