// import required dependencies
const uuidv4 = require('uuid/v4');

// import required files
const jobModels = require('../models/jobs')
console.log('controller')
module.exports = {
    readJobs: function(req, res){
        jobModels.readJobs()
        .then( function(result){
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    },

    createJobs: function(req, res){
        const { name, description, category, salary, location, company_id } = req.body
        const id = uuidv4();
        const data_jobs = {
            id,
            name,
            description,
            category_id: '',
            salary,
            location,
            company_id,
            date_added: new Date(),
            date_updated: new Date()
        }
        const data_category = {
            id: '',
            name: category
        }
        jobModels.createJobs(data_jobs, data_category)
        .then( function(result){
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    },

    updateJobs: function(req, res){
        const productid = req.params.productid
        const { name, categoryid } = req.body
        const data = {
            name,
            categoryid,
            updated_at: new Date()
        }
        jobModels.updateJobs(data, productid)
        .then( function(result){
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    },

    deleteJobs: function(req, res){
        const productid = req.params.productid
        jobModels.deleteJobs(productid)
        .then( function(result){
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    }
}
