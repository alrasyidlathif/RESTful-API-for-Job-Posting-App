// import required dependencies
const express = require('express')
const Route = express.Router()
// const { check, validationResult } = require('express-validator');

// import required files
const loginController = require('../controllers/login')
console.log('route')
Route
  	// .get('/:page', jobsController.readJobs)
  	// .get('/', jobsController.readJobs)
	.post('/', loginController.loginUser)
  	// .patch('/:jobsId', jobsController.updateJobs)
  	// .delete('/:jobsId', jobsController.deleteJobs)

module.exports = Route
