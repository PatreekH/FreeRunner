
// Initialize Express app
var express = require('express');
var app = express();

// Require request, cheerio, and body-parser. This makes the scraping possible
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');

var http = require('http');
var server = http.createServer();
var io = require('socket.io')(server);

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
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongojs = require('mongojs');
var databaseUrl = "mongodb://patrickh:newave12@ds013486.mlab.com:13486/freerunner";

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, ["userdata", "rooms"]);
db.on('error', function(err) {
  console.log('Database Error:', err);
});

// Use connect method to connect to the Server
MongoClient.connect(databaseUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', databaseUrl);
  }
});

var newRoom;

io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('createRoom', function(room) {
        newRoom = room.toString();
        console.log("Current Room: " + room);
        socket.join(room.toString());
    });
});


/*io.socket.on('roomCheck', function(room){
  io.sockets.to(room).emit('message', 'PLEASE WORK!!!');
});*/


// ROUTES
require('./app/routes/data-routes/data-routes.js')(app, db);
require('./app/routes/html-routes/html-routes.js')(app, db);

// listen on port 3000

server.listen(8080, function() {
  console.log('WS running on port 8080!');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('App running on port 3000!');
});
