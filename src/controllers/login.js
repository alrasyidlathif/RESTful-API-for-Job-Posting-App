// import required dependencies
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
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    }

}
