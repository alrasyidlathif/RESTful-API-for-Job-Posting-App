// import required dependencies
const uuidv4 = require('uuid/v4');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// import required files
const signupModels = require('../models/signup')
console.log('controller')
module.exports = {

    signupUser: function(req, res){

        // const validation_data = [
            // check('username').isAlphanumeric(),
            // check('password').isLength({ min: 6 }),
            // check('email').isEmail()
        // ]

        console.log(req)
        const errors = validationResult(req);
        console.log(errors)
        console.log('signup 0')
        // res.send('error')

        // is name, password, email valid
        if (!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }

        const username = req.body.username
        const password = req.body.password
        const email = req.body.email

        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                res.json({msg: 'error while generating salt'})
            }
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    res.json({msg: 'error while hashing password'})
                }

                // const hash = bcrypt.hashSync(password, 10);

                // if all is valid, continue send data
                const id = uuidv4();
                const data_signup = {
                    id,
                    username,
                    'password': hash,
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

            });
        });

    }

}
