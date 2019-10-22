// import required dependencies
const uuidv4 = require('uuid/v4');
const { check, validationResult } = require('express-validator');

// import required files
const signupModels = require('../models/signup')
console.log('controller')
module.exports = {

    signupUser: function(req, res){

        // const username = req.body.username
        // const password = req.body.password
        // const email = req.body.email

        // const validation_data = [
            // check('username').isAlphanumeric(),
            // check('password').isLength({ min: 6 }),
            // check('email').isEmail()
        // ]

        const errors = validationResult(req);

        console.log(errors)
        // res.send('error')

        // is name, password, email valid
        if (!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }

        // if all is valid, continue send data
        const id = uuidv4();
        const data_signup = {
            id,
            username,
            password,
            email,
            date_registered: new Date()
        }
        signupModels.signupUser(data_signup)
        .then( function(result){
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    }

}
