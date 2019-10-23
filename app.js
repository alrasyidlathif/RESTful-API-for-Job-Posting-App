// import required dependencies
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const configs = require('./src/configs/configs')
const logger = require('morgan')
// const session = require('express-session')
// const redis = require('redis')
// const redisStore = require('connect-redis')(session)

// use dependencies
// const redisClient = redis.createClient();

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

app.use('/', routerNav)

module.exports = app
