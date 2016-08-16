
var request = require('request');
var cheerio = require('cheerio');
var mongojs = require('mongojs');
var path = require('path');

module.exports = function(app, db){

	app.get('/highScoreData', function(req, res) {
	  db.userdata.find().sort({score: -1}).limit(5, function (err, docs) {
	 		/*console.log(docs);*/
	 		var currentOverallHighScore = {
	 			rank1: [docs[0].name, docs[0].score],
	 			rank2: [docs[1].name, docs[1].score],
	 			rank3: [docs[2].name, docs[2].score],
	 			rank4: [docs[3].name, docs[3].score],
	 			rank5: [docs[4].name, docs[4].score]
	 		}
	 	res.json(currentOverallHighScore);
	  });
	});

	app.post('/userData', function(req, res){
		console.log(req.body);
    	db.userdata.find({name: req.body.username}, function (err, docs) {
    		// the update is complete
    		console.log("Grabbed user data");
    		if (err) throw err
    		res.json(docs[0]);
    	});
	});

	app.post('/updateAfterRun', function(req, res){
		console.log(req.body);
		db.userdata.find({name: req.body.username}, function (err, docs) {
	    	if (err) throw err
	    	/*res.json(docs[0]);*/
	    	var username = docs[0].name;
	    	var currentHighScore = docs[0].score;
	    	var currentCoinCount = docs[0].coins;
	    	var newHighScore;

	    	if (currentHighScore < req.body.score){
	    		console.log("New personal best!");
	    		newHighScore = parseInt(req.body.score);
	    	} else {
	    		newHighScore = parseInt(currentHighScore);
	    	}

	    	var newCoinCount = parseInt(req.body.coinsCollected) + parseInt(currentCoinCount);

			db.userdata.update({name: username}, {$set: {score: newHighScore, coins: newCoinCount}}, function (err, docs) {
	    		// the update is complete
	    		console.log("Updated user data");
	    		if (err) throw err
	    		res.json(docs[0]);
    		});

		});
	});

	/* -/-/-/-/-/-/-/-/-/-/-/-/- */

};

