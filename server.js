
// Initialize Express app
var express = require('express');
var app = express();

// Require request, cheerio, and body-parser. This makes the scraping possible
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');

// express session for user authentication
session = require('express-session');
app.use(session({
    secret: 'no secret',
    resave: true,
    saveUninitialized: true
}));

// uses any static files required by the html files
app.use(express.static('app/public/'));

// sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Database configuration
var mongojs = require('mongojs');
var databaseUrl = "mongodb://heroku_rs91s41p:1pad3lb01as7t262d8lalqif7l@ds013486.mlab.com:13486/heroku_rs91s41p";
var collections = ["userdata"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});

// ROUTES
require('./app/routes/data-routes/data-routes.js')(app, db);
require('./app/routes/html-routes/html-routes.js')(app, db);

// listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});
