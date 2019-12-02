// import required dependencies
const uuidv4 = require('uuid/v4');
const moment = require('moment');

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

    // get updatedData search from url
    const name = req.query.name;
    const company = req.query.company;
    const order = req.query.order;
    const myCategory = req.query.category;
    const searchData = {name, company, order, page};

    // console.log(searchData); // what to be search

    jobModels.readJobs(searchData, myCategory)
        .then( function(resultArray) {
          // design the redis key
          let redisKey = '';
          for (q in searchData) {
            if (Object.prototype.hasOwnProperty.call(searchData, q)) {
              redisKey = redisKey + q;
              redisKey = redisKey + searchData[q];
            }
          }
          redisKey = redisKey + myCategory;

          // resultArray[0] is the total data
          const totalData = Number(
              JSON.stringify(resultArray[0]).split(':')[1].split('}')[0]
          );
          // resultArray[1] is the data found
          // const dataFound = Number(
          //     JSON.stringify(resultArray[1]).split(':')[1].split('}')[0]
          // );
          // resultArray[1] is the result of the search
          const result = resultArray[1];

          let msg = '';
          if (result.length > 0) {
            msg = 'Jobs found';
          } else {
            msg = 'No jobs found';
          }
          let offset = 0;
          const limit = 10;
          if (Number(page) != 1) {
            offset = limit*(Number(page)-1);
          }
          const totalPage = Math.ceil(totalData/limit);
          const pagination = {
            'dataShow': result.length,
            limit,
            offset,
            'page': Number(page),
            totalData,
            totalPage,
          };
          let nextAble = true;
          if (Number(page) < totalPage) {
            nextAble = true;
          } else {
            nextAble = false;
          }
          let prevAble = true;
          if (Number(page) > 1) {
            prevAble = true;
          } else {
            prevAble = false;
          }
          // const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
          if (req.query.page == null) {
            if (req.originalUrl == '/jobs/') {
              req.originalUrl = req.originalUrl + '?page=1';
            } else if (req.originalUrl == '/jobs') {
              req.originalUrl = req.originalUrl + '/?page=1';
            } else {
              req.originalUrl = req.originalUrl + '&page=1';
            }
          }
          // console.log(fullUrl);
          // console.log(req.get('host'));
          // console.log(req.originalUrl);
          const baseLink = req.protocol + '://' + req.get('host');
          const searchLink = req.originalUrl;
          let nextPage = '';
          if (nextAble) {
            const searchLinkSplit = searchLink.split('page=');
            searchLinkSplit[1] = searchLinkSplit[1].substr(0, 0) +
            (Number(page)+1).toString() + searchLinkSplit[1].substr(0 + 1);
            nextPage = searchLinkSplit[0] + 'page=' + searchLinkSplit[1];
          } else {
            nextPage = null;
          }
          let prevPage = '';
          if (prevAble) {
            const searchLinkSplit = searchLink.split('page=');
            searchLinkSplit[1] = searchLinkSplit[1].substr(0, 0) +
            (Number(page)-1).toString() + searchLinkSplit[1].substr(0 + 1);
            prevPage = searchLinkSplit[0] + 'page=' + searchLinkSplit[1];
          } else {
            prevPage = null;
          }
          const pageLink = {
            searchLink,
            nextAble,
            nextPage,
            prevAble,
            prevPage,
            baseLink,
          };
          const resObject = {
            status: 200,
            error: false,
            message: msg,
            pagination,
            result: result,
            pageLink,
          };

          redisHelper.client.setex(redisKey, 5, JSON.stringify(resObject));
          console.log('SAVED DATA TO REDIS');

          res.status(200).json(resObject);
        })
        .catch( function(err) {
          console.log(err);
          res.status(500).json({
            status: 500,
            error: true,
            message: 'Internal server error',
            result: {},
          });
        });
  },


  createJobs: function(req, res) {
    const {name, description, category, salary,
      location, company_id} = req.body;
    const id = uuidv4();
    const dataJobs = {
      id,
      name,
      description,
      category_id: '',
      salary,
      location,
      company_id,
      date_added: moment().format().split('+')[0],
      date_updated: moment().format().split('+')[0],
    };
    const dataCategory = {
      id: '',
      name: category,
    };
    console.log('DATE UPDATED');
    console.log(dataJobs.date_updated);
    jobModels.createJobs(dataJobs, dataCategory)
        .then( function(result) {
          if (result.error) {
            res.status(400).json(result);
          }
          res.status(201).json({
            status: 201,
            error: false,
            message: 'Job was created successfully',
            result: {
              job: dataJobs,
            },
          });
        })
        .catch( function(err) {
          console.log(err);
          res.status(500).json({
            status: 500,
            error: true,
            message: 'Internal server error',
            result: {},
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
    updatedData['date_updated'] = moment().format().split('+')[0];

    jobModels.updateJobs(updatedData, jobsId)
        .then( function(result) {
          if (result.error) {
            res.status(400).json(result);
          }
          res.status(200).json({
            status: 200,
            error: false,
            message: 'Job was updated successfully',
            result: updatedData,
          });
        })
        .catch( function(err) {
          console.log(err);
          res.status(500).json({
            status: 500,
            error: true,
            message: 'Internal server error',
            result: {},
          });
        });
  },


  deleteJobs: function(req, res) {
    const jobsId = req.params.jobsId;
    jobModels.deleteJobs(jobsId)
        .then( function(result) {
          if (result.error) {
            res.status(400).json(result);
          }
          res.status(200).json({
            status: 200,
            error: false,
            message: 'Job was deleted successfully',
          });
        })
        .catch( function(err) {
          console.log(err);
          res.status(500).json({
            status: 500,
            error: true,
            message: 'Internal server error',
            result: {},
          });
        });
  },

};
