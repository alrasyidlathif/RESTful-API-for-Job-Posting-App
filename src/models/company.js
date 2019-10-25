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
            conn.query('SELECT * FROM company WHERE name = ?', data_company.name, function(err, result){
                if (!err){
                    if (result.length > 0){
                        resolve({
                            Status: 'Error',
                            Msg: 'Company name was already used by other',
                        })
                        // reject(new Error('company name was used by other'))
                    } else {
                        conn.query('INSERT INTO company SET ?', data_company, function(err, result){
                            if (!err) {
                                resolve(result)
                            } else {
                                reject(new Error(err))
                            }
                        })
                    }
                } else {
                    reject( new Error(err));
                }
            })
        })
    },

    updateCompany: function(data, companyId){
        return new Promise( function(resolve, reject){
            conn.query('UPDATE company SET ? WHERE id = ?', [data, companyId], function(err, result){
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    deleteCompany: function(companyId){
        return new Promise( function(resolve, reject){
            conn.query('DELETE FROM company WHERE id = ?', companyId, function(err, result){
                if (err) {
                    reject(new Error(err))
                } else {
                    conn.query('DELETE FROM jobs WHERE company_id = ?', companyId, function(err, result){
                        if (err) {
                            reject(new Error(err))
                        } else {
                            resolve('success delete company and jobs relate to them.')
                        }
                    })
                }
            })
        })
    }
}
