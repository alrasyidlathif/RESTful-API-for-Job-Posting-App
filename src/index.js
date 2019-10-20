// import required dependencies
const express = require('express')
const Route = express.Router()

// import required files
const jobs = require('./routes/jobs')
//const jobsRead = require('./routes/jobsRead')
//const jobsUpdate = require('./routes/jobsUpdate')
//const jobsDelete = require('./routes/jobsDelete')
console.log('index')
// create used routes
Route
	.use('/jobs', jobs)
	//.use('/jobs-read', jobsRead)
  	//.use('/jobs-update', jobsUpdate)
  	//.use('/jobs-delete', jobsDelete)

module.exports = Route
