// import required dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// import required files
const conn = require('../configs/db')
console.log('model')
module.exports = {

    loginUser: function(data_login){
        // console.log(data_jobs)
        // console.log(data_category)
        return new Promise( function(resolve, reject){

            console.log('login 1')
            console.log(data_login)

            conn.query('SELECT * FROM user WHERE username = ?', data_login.username, function(err, result){
                if (!err){
                    if (result.length == 0){
                        reject(new Error('username was not registered'))
                    } else {

                        const hash = result[0].password;
                        const username = result[0].username;

                        console.log('login 2')
                        console.log(hash)

                        if (bcrypt.compare(data_login.password, hash)){
                            console.log('give token')
                            const token = jwt.sign({ username }, 'secretKey');
                            console.log(token)
                            console.log('login 3')

                            resolve(JSON.stringify({ authorization: token }));
                            console.log('login 4')

                        } else {
                            reject(new Error('wrong password'))
                        }

                        // console.log(bcrypt.compareSync('', hash)); // true
                        // console.log(bcrypt.compareSync('', hash)); // false

                    }
                
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}
