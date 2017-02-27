var request = require('request');
var config = require('../../../config');
var passwordGenerator = require('../../../libs/passwordgen');

module.exports = {

	createUser: function(req, res, next) {

		var userForm = {
			username : 'khatramanche',
			password : passwordGenerator(),
			first_name : 'Khatra',
			last_name : 'Manche',
			email : 'khatra@dsa.com'
		}

		request.post(config.OnaApi.livebaseUrl + '/profiles', {
			form: userForm
		}, function(err, res) {
			if(err) return next(err);
			next();
			
		})

	}

}