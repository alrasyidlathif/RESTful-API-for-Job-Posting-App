// import required dependencies
const uuidv4 = require('uuid/v4');

// import required files
const signupModels = require('../models/signup')
console.log('controller')
module.exports = {

    signupUser: function(req, res){
        const { name, password, email } = req.body
        const id = uuidv4();
        const data_signup = {
            id,
            name,
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
