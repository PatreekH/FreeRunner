
var request = require('request');
var cheerio = require('cheerio');
var mongojs = require('mongojs');
var path = require('path');

module.exports = function(app, db){

/*	app.get('/all', function(req, res) {
	  db.Articles.find({}, function (err, docs) {
	    if (err) throw err
	    res.send(docs);
	  });
	});

	app.get('/scrape', function(req, res) {
		request('http://www.nytimes.com/pages/technology/index.html?action=click&region=TopBar&pgtype=SectionFront&module=SectionsNav&version=BrowseTree&contentCollection=Tech&t=qry170', function (error, response, html) {

		  	var $ = cheerio.load(html);

		  	$('.story').each(function(i, element){

		  		var title = $(element).find('a').text();
		  		var link = $(element).find('a').attr('href');
		  		var article = $(element).find('p').text();*/

		    	/*var scrape = $(this).text();*/

/*				db.Articles.insert({title: title, article: article, link: link, comments: []}, function(err, saved){
					if (err) {
				      	console.log(err);
				    } else {
				    	console.log(saved);
				    }
				});

			});
			res.send("worked");
		});
	});

	app.post('/article', function(req, res){
		db.Articles.find({}, function (err, docs) {
	    	if (err) throw err
	    	res.json(docs[req.body.counter]);
		});
	});*/

	// app.get('/article', function(req, res){
	// 	var counter = req.query.counter;
	// 	console.log(counter)
	// });

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
	    		newHighScore = req.body.score;
	    	} else {
	    		newHighScore = currentHighScore;
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

/*	app.get('/article', function(req, res){
		var counter = req.query.id || 0;
		db.Articles.find({}, function (err, docs) {
	    	if (err) throw err
	    	res.json(docs[counter]);
		});
	});*/

	/* -/-/-/-/-/-/-/-/-/-/-/-/- */

};

