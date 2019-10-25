// import required dependencies
const express = require('express');

// use dependencies
const Route = express.Router();

// import required files
const jobs = require('./routes/jobs');
const company = require('./routes/company');
const signup = require('./routes/signup');
const login = require('./routes/login');

console.log('index'); // where I am

// create routes
Route
    .use('/jobs', jobs)
    .use('/company', company)
    .use('/signup', signup)
    .use('/login', login);

module.exports = Route;
