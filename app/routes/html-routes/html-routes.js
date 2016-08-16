var path = require('path');

module.exports = function(app, db){
	app.use(function(req, res){
		res.sendFile(path.join(__dirname + '/../../public/freeRunner.html'));
	});
};