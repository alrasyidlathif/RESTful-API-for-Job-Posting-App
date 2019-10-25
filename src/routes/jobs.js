// import required dependencies
const express = require('express');

// use dependencies
const Route = express.Router();

// import required files
const jobsController = require('../controllers/jobs');
const redisHelper = require('../helpers/redis');
const isAuthHelper = require('../helpers/isAuth');

console.log('route'); // where I am

// create endpoints
Route
    .get('/', redisHelper.cache, jobsController.readJobs)
    .post('/', isAuthHelper.getToken, jobsController.createJobs)
    .patch('/:jobsId', isAuthHelper.getToken, jobsController.updateJobs)
    .delete('/:jobsId', isAuthHelper.getToken, jobsController.deleteJobs);

module.exports = Route;
