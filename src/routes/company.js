// import required dependencies
const express = require('express');
const Route = express.Router();

const isAuthHelper = require('../helpers/isAuth');
// const attachCurrentUserHelper = require('../helpers/attachCurrentUser');
// import ItemsModel from '../models/items';

// import required files
const companyController = require('../controllers/company');
console.log('route');
Route
    .get('/', companyController.readCompany)
    .post('/', isAuthHelper.getToken, companyController.createCompany)
    .patch('/:companyId', isAuthHelper.getToken, companyController.updateCompany)
    .delete('/:companyId', isAuthHelper.getToken, companyController.deleteCompany);

module.exports = Route;
