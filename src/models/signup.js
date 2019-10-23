// import required dependencies
// const bcrypt = require('bcrypt');

// import required files
const conn = require('../configs/db')
console.log('model')
module.exports = {

    signupUser: function(data_signup){
        // console.log(data_jobs)
        // console.log(data_category)
        return new Promise( function(resolve, reject){

            console.log('signup 1')
            console.log(data_signup)

            conn.query('SELECT * FROM user WHERE username = ?', data_signup.username, function(err, result){
                if (!err){
                    if (result.length > 0){
                        reject(new Error('username was used by other'))
                    } else {

                        // const hash = bcrypt.hashSync(data_signup['password'], 10);

                        console.log('signup 2')
                        console.log(data_signup.password)
                        // console.log(bcrypt.compareSync('', hash)); // true
                        // console.log(bcrypt.compareSync('', hash)); // false

                        // const data_signup_final = {
                        //     'id': data_signup['id'],
                        //     'username': data_signup['username'],
                        //     'password': hash,
                        //     'email': data_signup['email'],
                        //     'date_registered': data_signup['date_registered']
                        // }

                        console.log('signup 3')

                        conn.query('INSERT INTO user SET ?', data_signup, function(err, result){
                            if (!err) {
                                resolve(result)
                            } else {
                                reject(new Error(err))
                            }
                        })
                        console.log('signup 4')
                    }
                
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}
