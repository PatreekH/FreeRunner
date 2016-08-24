var path = require('path');

module.exports = function(app, db){
	

	app.get('/multiplayer', function(req, res){
		console.log('test');
		res.sendFile(path.join(__dirname + '/../../public/freeRunnerMulti.html'));
	});

	app.use(function(req, res){
		res.sendFile(path.join(__dirname + '/../../public/freeRunner.html'));
	});
};