// import required dependencies
const uuidv4 = require('uuid/v4');

// import required files
const companyModels = require('../models/company');
console.log('controller'); // where I am
module.exports = {
  readCompany: function(req, res) {
    companyModels.readCompany()
        .then( function(result) {
          res.json(result);
        })
        .catch( function(err) {
          console.log(err);
          res.json({
            Status: 'Error',
            Msg: 'Cannot get company',
          });
        });
  },


  createCompany: function(req, res) {
    const {name, logo, location, description} = req.body;
    const id = uuidv4();
    const data_company = {
      id,
      name,
      logo,
      location,
      description,
    };
    companyModels.createCompany(data_company)
        .then( function(result) {
          console.log(result);
          res.json({
            Status: 'Success',
            Msg: 'Company created',
            Data: {
              Name: data_company.name,
              Description: data_company.description,
            },
          });
        })
        .catch( function(err) {
          console.log(err);
          res.json({
            Status: 'Error',
            Msg: 'Company not created',
          });
        });
  },


  updateCompany: function(req, res) {
    const companyId = req.params.companyId;
    let data = {};
    for (var o in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, o)) {
        console.log(o);
        console.log(req.body[o]);
        data[o] = req.body[o];
      }
    }

    companyModels.updateCompany(data, companyId)
        .then( function(result) {
          console.log(result);
          res.json({
            Status: 'Success',
            Msg: 'Company updated',
            Data: data,
          });
        })
        .catch( function(err) {
          console.log(err);
          res.json({
            Status: 'Error',
            Msg: 'Company not updated',
          });
        });
  },


  deleteCompany: function(req, res) {
    const companyId = req.params.companyId;
    companyModels.deleteCompany(companyId)
        .then( function(result) {
          console.log(result);
          res.json({
            Status: 'Success',
            Msg: 'Company and its jobs deleted',
          });
        })
        .catch( function(err) {
          console.log(err);
          res.json({
            Status: 'Error',
            Msg: 'Company not deleted',
          });
        });
  },

};
