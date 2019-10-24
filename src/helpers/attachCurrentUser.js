attachCurrentUserModel = require('../models/attachCurrentUser')

module.exports = {

	attachCurrentUserMethod: function(req, res, next) {
		console.log('attachCurrentUserHelper 1')
		// console.log(req.token)
		// console.log(req.user)
		// console.log(userRecord)

		const decodedTokenData = req.decoded;

		if (decodedTokenData.exp <= (Date.now().valueOf() / 1000) ){
			return res.status(401).end('Unauthorize. Expired token.')
		}

		const userRecord = attachCurrentUserModel.findOne(decodedTokenData.data_login.username)

		req.currentUser = userRecord;

		if(!userRecord) {
			return res.status(401).end('Unauthorize')
		} else {
			console.log('you are ' + decodedTokenData.data_login.username)
			return next();
 		}
	}
}
