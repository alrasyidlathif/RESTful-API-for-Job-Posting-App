// import required dependencies
const express = require('express');
const Route = express.Router();
const {check} = require('express-validator');

// const { check, validationResult } = require('express-validator');

// import required files
const loginController = require('../controllers/login');
console.log('route'); // where I am
Route
    // .get('/:page', jobsController.readJobs)
    // .get('/', jobsController.readJobs)
    .post('/', [check('username').isAlphanumeric(),
      check('password').isLength({min: 6})],
    loginController.loginUser);
// .patch('/:jobsId', jobsController.updateJobs)
// .delete('/:jobsId', jobsController.deleteJobs)

module.exports = Route;
