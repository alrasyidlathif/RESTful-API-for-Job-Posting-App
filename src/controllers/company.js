// import required dependencies
const uuidv4 = require('uuid/v4');

// import required files
const companyModels = require('../models/company')
console.log('controller')
module.exports = {
    readCompany: function(req, res){
        companyModels.readCompany()
        .then( function(result){
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    },

    createCompany: function(req, res){
        const { name, logo, location, description } = req.body
        const id = uuidv4();
        const data_company = {
            id,
            name,
            logo,
            location,
            description,
        }
        companyModels.createCompany(data_company)
        .then( function(result){
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    },

    updateCompany: function(req, res){
        const productid = req.params.productid
        const { name, categoryid } = req.body
        const data = {
            name,
            categoryid,
            updated_at: new Date()
        }
        companyModels.updateCompany(data, productid)
        .then( function(result){
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    },

    deleteCompany: function(req, res){
        const productid = req.params.productid
        companyModels.deleteCompany(productid)
        .then( function(result){
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    }
}
