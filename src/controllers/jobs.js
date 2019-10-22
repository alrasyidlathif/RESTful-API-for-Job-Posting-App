// import required dependencies
const uuidv4 = require('uuid/v4');

// import required files
const jobModels = require('../models/jobs')
console.log('controller')
module.exports = {
    readJobs: function(req, res){

        // get page, if null then 1
        let page = 1;
        if (req.query.page != null){
            page = req.query.page;
        }

        console.log('page ' + page)

        // get data search from url
        const name = req.query.name
        const company = req.query.company
        const order = req.query.order
        const search_data = {name, company, order}
        
        console.log(search_data)
        // console.log(name)
        // console.log(company)

        jobModels.readJobs(search_data, page)
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
        const jobsId = req.params.jobsId
        console.log('create 1')
        let data = {};
        for (var o in req.body){
            console.log(o)
            console.log(req.body[o])
            data[o] = req.body[o]
        }
        console.log('create 2')
        // const { name, categoryid } = req.body
        // const data = {
        //     name,
        //     categoryid,
        //     updated_at: new Date()
        // }
        data['date_updated'] = new Date()
        console.log('create 3')
        let update_data = data;
        jobModels.updateJobs(update_data, jobsId)
        .then( function(result){
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    },

    deleteJobs: function(req, res){
        const jobsId = req.params.jobsId
        jobModels.deleteJobs(jobsId)
        .then( function(result){
            res.json(result)
        })
        .catch( function(err){
            console.log(err)
        })
    }
}
