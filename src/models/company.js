// import required dependencies
// const uuidv4 = require('uuid/v4');

// import required files
const conn = require('../configs/db')
console.log('model')
module.exports = {
    readCompany: function(){
        return new Promise( function(resolve, reject){
            conn.query('SELECT * FROM company', function(err, result){
            //conn.query('SELECT * FROM jobs', function(err,result){
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    createCompany: function(data_company){
        return new Promise( function(resolve, reject){
            conn.query('INSERT INTO company SET ?', data_company, function(err, result){
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
