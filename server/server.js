/**
 * Satellizer Node.js Example
 * (c) 2015 Sahat Yalkabov
 * License: MIT
 */

var path = require('path');
var qs = require('querystring');

var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var colors = require('colors');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');
var request = require('request');

var config = require('./config');

var app = express();

app.set('port', process.env.NODE_PORT || 3000);
app.set('host', process.env.NODE_IP || 'localhost');
app.set('views', '../client/views');
app.use(express.static('../client'));
app.engine('html', require('ejs').renderFile);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}
app.use(express.static(path.join(__dirname, '../../client')));

app.get('/', function(req, res) {
  res.render('index.html');
})

app.listen(app.get('port'), app.get('host'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
