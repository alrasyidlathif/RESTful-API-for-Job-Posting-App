// import required dependencies
const express = require('express')
const Route = express.Router()

// import required files
const jobsController = require('../controllers/jobs')

Route
  	.get('/', jobsController.createJobs)
  	.post('/', jobsController.readJobs)
  	.patch('/:jobsId', jobsController.updateJobs)
  	.delete('/:jobsId', jobsController.deleteJobs)

module.exports = Route
