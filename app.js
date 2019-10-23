// import required dependencies
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const configs = require('./src/configs/configs')
const logger = require('morgan')
// const passport = require('passport')
// const redisHelper = require('./src/helpers/passport')

// const session = require('express-session')
// const redis = require('redis')
// const redisStore = require('connect-redis')(session)

// const {
// 	clientApiKeyValidation,
// 	isNewSessionRequired,
// 	isAuthRequired,
// 	generateJWTToken,
// 	verifyToken
// } = require('./src/helpers/authUtils');

// use dependencies
// const redisClient = redis.createClient();

// main app
const app = express()

// redisClient.on('error', function(err){
	// console.log('redis error: ', err);
// });

const port = configs.port
const routerNav = require('./src/index')

app.listen(port, function(){
	console.log(`\n Server listening on port ${port} \n`)
})

// use dependencies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(logger('dev'))

// Passport Middleware
// app.use(passport.initialize());
// require('./src/helpers/passport')(passport);

app.use('/', routerNav)

module.exports = app
