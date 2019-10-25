// import required dependencies
const configs = require('../configs/configs')
const jwtSecret = configs.jwtSecret
// const expressjwt = require('express-jwt')
const jwt = require('jsonwebtoken')
currentUserModel = require('../models/currentUser')

// We are assuming that the JWT will come in the header Authorization but it could come in the req.body or in a query param, you have to decide what works best for you.
module.exports = {
	getToken: function(req, res, next){

		// console.log(req.headers.authorization)
		// console.log(req.headers.authorization.split(' ')[0])
		// console.log(req.headers.authorization.split(' ')[1])

		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'hello00world') {
    		
			// data_token = {
			// 	credentialsRequired: false,
			// 	secret: jwtSecret,
			// 	requestProperty: 'token',
			// 	getToken: req.headers.authorization.split(' ')[1]
			// }
			// tes = expressjwt(data_token)

			const token = req.headers.authorization.split(' ')[1]
			decoded = jwt.decode(token, jwtSecret)
			// console.log(tes)
			// console.log(tes2)
			// console.log(Date.now().valueOf() / 1000)
			// console.log(tes2.exp <= (Date.now().valueOf() / 1000))
			
			if (decoded.exp <= (Date.now().valueOf() / 1000) ){
				return res.status(401).end('Unauthorize. Expired token.')
			}

			const userRecord = currentUserModel.findOne(decoded.data_login.username)

			req.currentUser = userRecord;

			if(!userRecord) {
				return res.status(401).end('Unauthorize')
			} else {
				console.log('you are ' + decoded.data_login.username)
				return next();
	 		}

			// req.decoded = decoded
			// next()
    		
  		} else {
  			res.status(401).end('Unauthorize')
  		}
	}
}
// isAuthMethod = expressjwt({
//   	secret: jwtSecret, // Has to be the same that we used to sign the JWT

//   	userProperty: 'token', // this is where the next middleware can find the encoded data generated in services/auth:generateToken -> 'req.token'

//   	getToken: getTokenFromHeader, // A function to get the auth token from the request
// })

// exports.default = isAuthMethod
