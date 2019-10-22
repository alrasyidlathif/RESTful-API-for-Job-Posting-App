// import required dependencies
const express = require('express')
const Route = express.Router()

// import required files
const signupController = require('../controllers/signup')
console.log('route')
Route
  	// .get('/:page', jobsController.readJobs)
  	// .get('/', jobsController.readJobs)
  	.post('/', signupController.signupUser)
  	// .patch('/:jobsId', jobsController.updateJobs)
  	// .delete('/:jobsId', jobsController.deleteJobs)

module.exports = Route
