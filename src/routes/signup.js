// import required dependencies
const express = require('express')
const Route = express.Router()
const { check, validationResult } = require('express-validator');

// import required files
const signupController = require('../controllers/signup')
console.log('route')
Route
  	// .get('/:page', jobsController.readJobs)
  	// .get('/', jobsController.readJobs)
  	.post('/', [check('username').isAlphanumeric(),
				check('password').isLength({ min: 6 }),
             	check('email').isEmail()],
             	signupController.signupUser)
  	// .patch('/:jobsId', jobsController.updateJobs)
  	// .delete('/:jobsId', jobsController.deleteJobs)

module.exports = Route
