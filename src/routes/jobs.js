// import required dependencies
const express = require('express')
const Route = express.Router()

// import required files
const jobsController = require('../controllers/jobs')
const redisHelper = require('../helpers/redis')

const isAuthHelper = require('../helpers/isAuth');

console.log('route')

Route
  	// .get('/:page', jobsController.readJobs)
  	.get('/', redisHelper.cache, jobsController.readJobs)
  	.post('/', isAuthHelper.getTokenFromHeader, jobsController.createJobs)
  	.patch('/:jobsId', isAuthHelper.getTokenFromHeader, jobsController.updateJobs)
  	.delete('/:jobsId', isAuthHelper.getTokenFromHeader, jobsController.deleteJobs)

module.exports = Route
