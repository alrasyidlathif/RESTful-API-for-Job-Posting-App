// import required dependencies
const configs = require('../configs/configs')
const jwtSecret = configs.jwtSecret
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
        const password = req.body.password;

        if (username == null || password == null){
            res.json({'error': 'username or password cannot be empty'})
        }

        const data_login = {
            'username': username,
            'password': password
        }

        loginModels.loginUser(data_login)
        .then( function(result){


            console.log(result)
            console.log(result.username)
            console.log(result.hash)
            console.log('login 3')

            compareInfo = bcrypt.compareSync(data_login.password, result.hash);

            // bcrypt.compare(data_login.password, result.hash, function(err, compareInfo){

            // console.log(err)
            console.log(data_login)
            console.log('login 4')
            if (!compareInfo) {
                res.send({msg: 'wrong password'})
            }

            console.log('give token')
            const token = 'hello00world ' + jwt.sign({ data_login }, jwtSecret, { expiresIn: 300 }); // 300 second
            // const token = jwt.sign({ data_login }, jwtSecret, { expiresIn: 300 }); // 300 second
            console.log(token)
            console.log('login 5')
            // res.json(JSON.stringify({ authorization: token }));
            res.json({
              Status: "Success",
              Msg: "Login as " + result.username,
              Authorization: token
            });
            console.log('login 6')

            // })

            // res.send()

        })

        //     {
                

        //     } else {
        //         reject(new Error('wrong password'))
        //     }

        //     // res.json(result)
        // })
        .catch( function(err){
            console.log(err)
        })
    }

}
