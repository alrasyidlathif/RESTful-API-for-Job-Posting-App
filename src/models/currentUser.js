const conn = require('../configs/db')

module.exports = {
	findOne: function(data_username){
		console.log('attachCurrentUserModel 1')
        return new Promise( function(resolve, reject){

            conn.query('SELECT * FROM user WHERE username = ?', data_username, function(err, result){
                if (err){
                	resolve(null)
                }
                if (result.length == 0){
                    resolve(null)
                } else {
                	console.log(result)
                	resolve(result)
                }
            })
        })
    }
}
