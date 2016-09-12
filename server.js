
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


var globalRoom;
var user1;
var user2;
var user1hat;
var user2hat; 

io.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('createRoom', function(payload) {
        console.log(payload);
        console.log("p1 connected to room: " + payload.room);
        socket.join(payload.room);
        user1 = payload.name;
        user1hat = payload.hat;
        globalRoom = payload.room;
    });

    socket.on('joinRoom', function(payload) {
        console.log(payload);
        console.log("p2 connected to room: " + payload.room);
        socket.join(payload.room);
        user2 = payload.name;
        user2hat = payload.hat;
        globalRoom = payload.room;

        io.to(payload.room).emit('setup', {user1: user1, user2: user2, user1hat: user1hat, user2hat: user2hat});
    });

    socket.on('playerReady', function(playerNum) {
        console.log("player" + playerNum + " is ready!");
        io.to(globalRoom).emit('readyStatusChange', playerNum);
    });

    socket.on('moveup', function(playerNum) {
        console.log("Move player " + playerNum + " up!");
        io.to(globalRoom).emit('movePlayerUp', playerNum);
    });

    socket.on('movedown', function(playerNum) {
      console.log("Move player " + playerNum + " down!");
        io.to(globalRoom).emit('movePlayerDown', playerNum);
    });

    socket.on('sendIntervals', function(interval) {
      console.log('created intervals: ' + interval.i1 + " " + interval.i2 + " " + interval.i3 + " " + interval.i4 + " " + interval.i5);
      io.to(globalRoom).emit('setIntervals', {i1: interval.i1, i2: interval.i2, i3: interval.i3, i4: interval.i4, i5: interval.i5});
    });

    socket.on('endGame', function(player) {
        console.log('player ' + player + " loses!");
        if (player == 1){
            io.to(globalRoom).emit('results', {playerNum: 1, p1hat: user1hat, p2hat: user2hat});
        } else if (player == 2){
            io.to(globalRoom).emit('results', {playerNum: 2, p1hat: user1hat, p2hat: user2hat});
        }
    });


});


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
