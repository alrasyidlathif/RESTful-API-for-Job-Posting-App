// import required dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

// import required files
const configs = require('./src/configs/configs');
const routerNav = require('./src/index');

// main app
const app = express();

// use dependencies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(logger('dev'));

// use files
const port = configs.port;
app.use('/', routerNav);

// listening port
app.listen(port, function() {
  console.log(`\n Server listening on port ${port} \n`);
});

app.use('/src/helpers/media/img/company_logo', express.static(path.join(__dirname, '/src/helpers/media/img/company_logo')));

module.exports = app;
