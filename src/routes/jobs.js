// import required dependencies
const express = require('express')
const Route = express.Router()

// import required files
const jobsController = require('../controllers/jobs')
const redisHelper = require('../helpers/redis')

console.log('route')

Route
  	// .get('/:page', jobsController.readJobs)
  	.get('/', redisHelper.cache, jobsController.readJobs)
  	.post('/', jobsController.createJobs)
  	.patch('/:jobsId', jobsController.updateJobs)
  	.delete('/:jobsId', jobsController.deleteJobs)

module.exports = Route
