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
        const companyId = req.params.companyId
        let data = {};
        for (var o in req.body){
            console.log(o)
            console.log(req.body[o])
            data[o] = req.body[o]
        }
        
        companyModels.updateCompany(data, companyId)
        .then( function(result){
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    },

    deleteCompany: function(req, res){
        const companyId = req.params.companyId
        companyModels.deleteCompany(companyId)
        .then( function(result){
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    }
}
