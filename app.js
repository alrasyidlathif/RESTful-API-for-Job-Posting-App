// import required dependencies
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const configs = require('./src/configs/configs')
const logger = require('morgan')

const app = express()
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
