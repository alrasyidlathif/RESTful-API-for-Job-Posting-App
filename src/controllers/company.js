// import required dependencies
const uuidv4 = require('uuid/v4');

// import required files
const companyModels = require('../models/company');
console.log('controller'); // where I am
module.exports = {
  readCompany: function(req, res) {
    companyModels.readCompany()
        .then( function(result) {
          let msg = '';
          if (result.length > 0) {
            msg = 'Companies found';
          } else {
            msg = 'No companies found';
          }
          const pagination = {
            'dataShow': result.length,
            'limit': null,
            'offset': 0,
            'page': 1,
            'totalPage': 1,
            'totalData': result.length,
          };
          res.status(200).json({
            status: 200,
            error: false,
            message: msg,
            pagination,
            result: result,
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


  createCompany: function(req, res) {
    const {name, location, description} = req.body;
    let {logo} = req.body;
    const id = uuidv4();

    // Saving file path to database
    console.log(req.file)
    // if (req.file.fieldname === 'logo') {
    if (req.file) {
      // const host = req.hostname;
      logo = req.protocol+'://'+req.hostname+'/src/helpers/media/img/company_logo/'+req.file.filename;
      // req.file.filename = data.name + req.file.filename
      // logo = req.file.path
    }
    
    const data_company = {
      id,
      name,
      logo,
      location,
      description,
      njob: 0,
    };
    companyModels.createCompany(data_company)
        .then( function(result) {
          console.log(result);
          if (result.error) {
            res.status(400).json(result);
          }
          res.status(201).json({
            status: 201,
            error: false,
            message: 'Company was created successfully',
            result: {
              company: data_company,
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


  updateCompany: function(req, res) {
    const companyId = req.params.companyId;
    const data = {};
    for (o in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, o)) {
        console.log(o);
        console.log(req.body[o]);
        console.log('========== update company ==========')
        if (o !== 'logo') {
          data[o] = req.body[o];
        }
      }
    }

    // Saving file path to database
    console.log(req.file)
    // if (req.file.fieldname === 'logo') {
    if (req.file) {
      // req.file.filename = data.name + req.file.filename
      // const host = req.hostname;
      data.logo = req.protocol+'://'+req.hostname+'/src/helpers/media/img/company_logo/'+req.file.filename;
      // data.logo = req.file.path
    }

    companyModels.updateCompany(data, companyId)
        .then( function(result) {
          if (result.error) {
            res.status(400).json(result);
          } else {
            data['id'] = companyId;
            console.log('BERHASIL');
            console.log(result);
            res.status(200).json({
              status: 200,
              error: false,
              message: 'Company was updated successfully',
              result: {
                data,
              },
            });
          }
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


  deleteCompany: function(req, res) {
    const companyId = req.params.companyId;
    companyModels.deleteCompany(companyId)
        .then( function(result) {
          if (result.error) {
            res.status(400).json(result);
          }
          res.status(200).json({
            status: 200,
            error: false,
            message: 'Company and its jobs was deleted successfully',
            result: {
              'id': companyId,
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

};
