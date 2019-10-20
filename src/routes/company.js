// import required dependencies
const express = require('express')
const Route = express.Router()

// import required files
const companyController = require('../controllers/company')
console.log('route')
Route
  	.get('/', companyController.readCompany)
  	.post('/', companyController.createCompany)
  	//.patch('/:jobsId', jobsController.updateJobs)
  	//.delete('/:jobsId', jobsController.deleteJobs)

module.exports = Route
