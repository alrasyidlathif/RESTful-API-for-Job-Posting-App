// import required dependencies
const uuidv4 = require('uuid/v4');

// import required files
const jobModels = require('../models/jobs');
const redisHelper = require('../helpers/redis');

console.log('controller'); // where I am

module.exports = {
  readJobs: function(req, res) {
    // get page, if null then 1
    let page = 1;
    if (req.query.page != null) {
      page = req.query.page;
    }

    console.log('page ' + page); // what page

    // get updatedData search from url
    const name = req.query.name;
    const company = req.query.company;
    const order = req.query.order;
    const searchData = {name, company, order, page};

    console.log(searchData); // what to be search

    jobModels.readJobs(searchData)
        .then( function(result) {
          // design the redis key
          let redisKey = '';
          for (q in searchData) {
            if (Object.prototype.hasOwnProperty.call(searchData, q)) {
              redisKey = redisKey + q;
              redisKey = redisKey + searchData[q];
            }
          }

          redisHelper.client.setex(redisKey, 60, JSON.stringify(result));
          console.log('SAVED DATA TO REDIS');

          res.json(result);
        })
        .catch( function(err) {
          console.log(err);
        });
  },


  createJobs: function(req, res) {
    const {name, description, category, salary, location, company_id} = req.body;
    const id = uuidv4();
    const dataJobs = {
      id,
      name,
      description,
      category_id: '',
      salary,
      location,
      company_id,
      date_added: new Date(),
      date_updated: new Date(),
    };
    const dataCategory = {
      id: '',
      name: category,
    };

    jobModels.createJobs(dataJobs, dataCategory)
        .then( function(result) {
          console.log(result);
          res.json({
            Status: 'Success',
            Msg: 'Job created',
            Data: {
              Name: dataJobs.name,
              Description: dataJobs.description,
            },
          });
        })
        .catch( function(err) {
          console.log(err);
          res.json({
            Status: 'Error',
            Msg: 'Job not created',
          });
        });
  },


  updateJobs: function(req, res) {
    const jobsId = req.params.jobsId;
    const updatedData = {};
    for (o in req.body) {
      if (Object.hasOwnProperty.call(req.body, o)) {
        updatedData[o] = req.body[o];
      }
    }
    updatedData['date_updated'] = new Date();

    jobModels.updateJobs(updatedData, jobsId)
        .then( function(result) {
          console.log(result);
          res.json({
            Status: 'Success',
            Msg: 'Job updated',
            Data: updatedData,
          });
        })
        .catch( function(err) {
          console.log(err);
          res.json({
            Status: 'Error',
            Msg: 'Job not updated',
          });
        });
  },


  deleteJobs: function(req, res) {
    const jobsId = req.params.jobsId;
    jobModels.deleteJobs(jobsId)
        .then( function(result) {
          console.log(result);
          res.json({
            Status: 'Success',
            Msg: 'Job deleted',
          });
        })
        .catch( function(err) {
          console.log(err);
          res.json({
            Status: 'Error',
            Msg: 'Job not deleted',
          });
        });
  },

};
