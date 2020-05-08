const express = require('express');
const path = require('path');
const hbs = require('hbs');
const logger = require('morgan');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const http= require('http');
const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});


var appRoutes = require('./admin/routes/app');
var app = express();
var port = process.env.PORT || 8080;

//Setting up the partial directory path to include inside hbs files
hbs.registerPartials(__dirname+'/admin/views/partials')
app.set('view engine', 'hbs');
hbs.registerHelper("inc", (value, options)=>{
    return parseInt(value) + 1;
});
hbs.registerHelper("equal", require("handlebars-helper-equal"));

// view engine setup
app.set('views', path.join(__dirname, 'admin/views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());
app.use(session({secret : 'ssshhhhh', resave: false, saveUninitialized: true}));

app.use(express.static(path.join(__dirname, 'admin/public')));
app.use('/banner/', express.static( __dirname + '/admin/upload_banner' ));
app.use('/projects/', express.static( __dirname + '/admin/upload_project' ));
app.use('/team/', express.static( __dirname + '/admin/upload_team' ));
app.use('/upload_image/', express.static( __dirname + '/admin/upload_image' ));
app.use('/gallery/', express.static( __dirname + '/admin/upload_gallery' ));

// default optionsss
app.use(fileUpload());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/admin/', appRoutes);

// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
    return res.render('index');
});
*/

//Create app server

var server = http.createServer(app);
server.listen(port, function() {
  console.log("Server is runing in port number "+ port);
});

module.exports = app;

