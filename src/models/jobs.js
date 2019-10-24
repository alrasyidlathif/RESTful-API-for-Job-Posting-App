// import required dependencies
const uuidv4 = require('uuid/v4');

// import required files
const conn = require('../configs/db')
console.log('model')
module.exports = {
    readJobs: function(search_data){
        console.log('ENTER TO readJobs FUNCTION..')
        return new Promise( function(resolve, reject){

            // get pagefrom and pageto by page
            let offset = 0;
            const limit = 5;
            if (search_data.page != 1){
                offset = 5*(search_data.page-1);
            }

            console.log('===PAGE DEF===')
            console.log('page ' + search_data.page)
            console.log('limit ' + limit)
            console.log('offset ' + offset)
            console.log('===PAGE DEF===')

            console.log(search_data.order)
            let order = 'NULL'
            if (search_data.order != null){
                order = search_data.order;
                // console.log(order)
                if (order == 'category'){
                    order = 'cat.name';
                } else {
                    order = 'j.'+order;
                }
            }
            
            console.log(order)

            if (search_data.name != null && search_data.company != null){
                const data = [search_data.name, search_data.company];
                conn.query(`SELECT j.id, j.name AS jobs, j.description, cat.name AS category, j.salary, j.location, com.name AS company, j.date_added, j.date_updated FROM category cat INNER JOIN jobs j ON j.category_id = cat.id INNER JOIN company com ON j.company_id = com.id WHERE j.name LIKE "%"?"%" AND com.name LIKE "%"?"%" ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`, data, function(err, result){
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                });
            } else
            if (search_data.name != null){
                const data = [search_data.name];
                conn.query(`SELECT j.id, j.name AS jobs, j.description, cat.name AS category, j.salary, j.location, com.name AS company, j.date_added, j.date_updated FROM category cat INNER JOIN jobs j ON j.category_id = cat.id INNER JOIN company com ON j.company_id = com.id WHERE j.name LIKE "%"?"%" ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`, data, function(err, result){
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            } else
            if (search_data.company != null){
                const data = [search_data.company];
                conn.query(`SELECT j.id, j.name AS jobs, j.description, cat.name AS category, j.salary, j.location, com.name AS company, j.date_added, j.date_updated FROM category cat INNER JOIN jobs j ON j.category_id = cat.id INNER JOIN company com ON j.company_id = com.id WHERE com.name LIKE "%"?"%" ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`, data, function(err, result){
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            } else {

                // if (order != 'NULL'){
                    // order = 'j.'+order
                // }

                //conn.query('SELECT * FROM jobs', function(err, result){
                conn.query(`SELECT j.id, j.name AS jobs, j.description, cat.name AS category, j.salary, j.location, com.name AS company, j.date_added, j.date_updated FROM category cat INNER JOIN jobs j ON j.category_id = cat.id INNER JOIN company com ON j.company_id = com.id ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`, function(err, result){
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
                console.log('create 1')
                console.log(err)
                console.log(result)
                // if (result == null){
                //     resolve({error:'company_id did not found'})
                // }
                console.log('create 2')
                console.log('create 3')
                if (result.length == 0){
                    resolve({error:'company did not found'})
                } else {

                    // check if category is already or not, if not create new category category_id
                    conn.query('SELECT * FROM category WHERE name = ?', data_category.name, function(err, result){
                        console.log('create 4')
                        console.log('create 5')
                        if (result.length > 0){
                            data_jobs.category_id = result[0].id
                            console.log('create 6')
                            console.log('create 7')
                            console.log('create 8')
                        } else {
                            const category_id = uuidv4();
                            data_category.id = category_id;
                            data_jobs.category_id = category_id;
                            console.log('create 6')
                            console.log('create 7')
                            console.log('create 8')
                            conn.query('INSERT INTO category SET ?', data_category, function(err, result){
                                if (err) {
                                    reject(new Error(err))
                                }
                            })
                        }
                        console.log('create 9')
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

    updateJobs: function(update_data, jobsId){

        let cat_data = {}
        // let cat_id = {}
        console.log(cat_data != null)
        // console.log(cat_id != null)
        // let upd_data = update_data

        if ('category' in update_data){
            // console.log(upd_data)
            console.log(update_data)
            console.log('create 4')
            cat_data['name'] = update_data['category'];

            cat_data['id'] = uuidv4();

            // cat_id['id'] = catid.values[0]
            delete update_data['category'] // meskipun const tapi bisa didelete
            update_data['category_id'] = cat_data['id']
            console.log(cat_data)
            // console.log(cat_id)
            console.log('create 5')
        }        

        return new Promise( function(resolve, reject){

            // let cat_data = {};
            // let cat_id = {};
            // let upd_data = update_data;

            console.log(update_data)
            // console.log(upd_data)
            console.log(cat_data)
            // console.log(cat_id)
            // console.log(upd_data)
            console.log('create 6')
            // console.log('category' in update_data)

            console.log(jobsId)

            conn.query(`SELECT * FROM jobs WHERE id = '${jobsId}'`, [update_data], function(err, result){
                if (!err) {
                    if (result.length == 0){
                        resolve({error:'jobs did not found'})
                    }

                if (cat_data != null){
                    conn.query(`INSERT INTO category SET ?`, cat_data, function(err, result){
                        if (err){
                            Error(err);
                        } else {
                            console.log('success update category')
                        }
                    })
                }
    
                conn.query(`UPDATE jobs SET ? WHERE id = '${jobsId}'`, [update_data], function(err, result){
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })


                } else {
                    reject(new Error(err))
                }
            })

        })
    },

    deleteJobs: function(jobsId){
        return new Promise( function(resolve, reject){
            conn.query('DELETE FROM jobs WHERE id = ?', jobsId, function(err, result){
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}
