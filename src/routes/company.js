// import required dependencies
const express = require('express');
const Route = express.Router();

const isAuthHelper = require('../helpers/isAuth');
// const attachCurrentUserHelper = require('../helpers/attachCurrentUser');
// import ItemsModel from '../models/items';

const upload = require('../helpers/multer').companyMulter

// import required files
const companyController = require('../controllers/company');
console.log('route');
Route
    .get('/', companyController.readCompany)
    .post('/', isAuthHelper.getToken,
    		upload.single('logo'), companyController.createCompany)
    .patch('/:companyId', isAuthHelper.getToken,
        upload.single('logo'), companyController.updateCompany)
    .delete('/:companyId', isAuthHelper.getToken,
        companyController.deleteCompany);

module.exports = Route;
