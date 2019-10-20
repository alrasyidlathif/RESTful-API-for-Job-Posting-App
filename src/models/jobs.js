// import required files
const conn = require('../configs/db')
console.log('model')
module.exports = {
    readJobs: function(){
        return new Promise( function(resolve, reject){
            //conn.query('SELECT j.id, j.name AS jobs, j.description, cat.name AS category, j.salary, j.location, com.name AS company, j.date_added, j.date_updated FROM jobs j INNER JOIN category cat ON j.category_id = cat.id INNER JOIN company com ON j.company_id = com.id', function(err, result){
                conn.query('SELECT * FROM jobs', function(err,result){
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    createJobs: function(data){
        return new Promise( function(resolve, reject){

            conn.query('SELECT * FROM category WHERE name = ?', data.category, function(err, result){
                console.log(result)
            })

            conn.query('INSERT INTO jobs SET ?', data, function(err, result){
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
