// import required dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const uuidv4 = require('uuid/v4');
// const { check, validationResult } = require('express-validator');

// import required files
const loginModels = require('../models/login')
console.log('controller')
module.exports = {

    loginUser: function(req, res){

        const username = req.body.username;
        const password = req.body.username;

        if (username == null || password == null){
            res.json({'error': 'username or password cannot be empty'})
        }

        const data_login = {
            'username': username,
            'password': password
        }

        loginModels.loginUser(data_login)
        .then( function(result){

            if (bcrypt.compare(data_login.password, result.hash)){
                console.log('give token')
                const token = jwt.sign({ username }, 'secretKey');
                console.log(token)
                console.log('login 3')

                res.json(JSON.stringify({ authorization: token }));
                console.log('login 4')

            } else {
                reject(new Error('wrong password'))
            }

            // res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    }

}
