// import required files
const conn = require('../configs/db')
console.log('model')
module.exports = {

    signupUser: function(data_jobs, data_category){
        // console.log(data_jobs)
        // console.log(data_category)
        return new Promise( function(resolve, reject){

            // check if company is valid
            conn.query('SELECT * FROM company WHERE id = ?', data_jobs.company_id, function(err, result){
                console.log('create 1')
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
    )}

}
