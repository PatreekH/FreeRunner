
var request = require('request');
var cheerio = require('cheerio');
var mongojs = require('mongojs');
var path = require('path');

module.exports = function(app, db){

	app.get('/isAuthenticated', function(req, res){
		if (req.session.isAuth == true){
			res.json(req.session.userInfo);
		} else {
			res.json('invalid');
		}
	});

	app.post('/loginAttempt', function(req, res){
		console.log("login attempt! username: " + req.body.user + " password: " + req.body.pass);
		//Idea, search for username: and password: db param then error handle from there
		db.userdata.find({}, function (err, docs) {
    		if (err) throw err
    		console.log("attempting login...");
    		var login;
    		for (i = 0; i < docs.length; i++){
    			if (req.body.user == docs[i].username && req.body.pass == docs[i].password){
    				req.session.userInfo = {
    					user: req.body.user,
    					userCoins: docs[i].coins,
    					userBest: docs[i].score
    				}
  					req.session.isAuth = true;
  					i = docs.length;
    			} else {
    				req.session.isAuth = false;
    			}
    		}

			if (req.session.isAuth == true){
				res.send('success');
				console.log("login successful!");
			} else if (req.session.isAuth == false){
				res.send('invalid');
				console.log("login failed!");
			}
    	});
	});

	app.post('/submitNewUser', function(req, res){
		db.userdata.insert({"username": req.body.newUser, "password": req.body.newPass, "coins": 0, "score": 0, "items": [false, false, false, false, false]}, function(err, docs){
			if (err) throw err
			res.send('success');
		});
	});

	app.get('/logout', function(req, res){
		req.session.destroy();
		console.log('successfully logged out.');
		res.send('success');
	});

	app.post('/makePurchase', function(req, res){
		db.userdata.find({username: req.body.username}, function (err, docs) {
    		if (err) throw err

    		console.log("Making purchase..");

    		var itemsArray = docs[0].items
    		
    		itemsArray[req.body.itemId] = true;

    		var userCoinCount = docs[0].coins;

    		if (userCoinCount < req.body.cost){
    			console.log("Purchase Failed!");
    			var purchaseConfirm = {
    				confirmed: false
    			};
    			res.json(purchaseConfirm);
    		} else {
    			var purchased;

    			itemsArray[req.body.itemId] = true;
    			purchased = parseInt(userCoinCount) - parseInt(req.body.cost);

    			db.userdata.update({username: req.body.username}, {$set: {items: itemsArray, coins: purchased}}, function (err, docs) {
		    		if (err) throw err

		    		console.log("Purchase Made!");

		    		res.json(docs);
    			});
    		}
    		

    	});
	});

	app.get('/highScoreData', function(req, res) {
	  db.userdata.find().sort({score: -1}).limit(5, function (err, docs) {
	  	if (err) throw err
	 		/*console.log(docs);*/
	 		var currentOverallHighScore = {
	 			rank1: [docs[0].username, docs[0].score],
	 			rank2: [docs[1].username, docs[1].score],
	 			rank3: [docs[2].username, docs[2].score],
	 			rank4: [docs[3].username, docs[3].score],
	 			rank5: [docs[4].username, docs[4].score]
	 		}
	 	res.json(currentOverallHighScore);
	  });
	});

//will be used to grab unique user data
	app.post('/userData', function(req, res){
		console.log(req.body);
    	db.userdata.find({username: req.body.username}, function (err, docs) {
    		if (err) throw err
    		// the update is complete
    		console.log("Grabbed user data");
    		res.json(docs[0]);
    	});
	});

/*	app.get('/userData', function(req, res){
		console.log(req.body);
    	db.userdata.find({name: req.body.username}, function (err, docs) {
    		// the update is complete
    		console.log("Grabbed user data");
    		if (err) throw err
    		console.log(docs);
    		res.json(docs[0]);
    	});
	});*/


//DOES COIN UPDATE IN THE DOM AFTER RUN?
//yes because the page refreshes
	app.post('/updateAfterRun', function(req, res){
		console.log(req.body);
		db.userdata.find({username: req.body.username}, function (err, docs) {
	    	if (err) throw err
	    	/*res.json(docs[0]);*/
	    	var username = docs[0].username;
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

			db.userdata.update({username: username}, {$set: {score: newHighScore, coins: newCoinCount}}, function (err, docs) {
	    		// the update is complete
	    		console.log("Updated user data");
	    		if (err) throw err
	    		res.json(docs[0]);
    		});

		});
	});

	/* -/-/-/-/-/-/-/-/-/-/-/-/- */

};

