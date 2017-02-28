var request = require('request');
var config = require('../../../config');
var passwordGenerator = require('../../../libs/passwordgen');

module.exports = {

	createUser: function(req, res, next) {

		var createdPassword = passwordGenerator.generate();
		// var userName = 'nrasurveyor' + req.surveyor.mobile.split(' ')[0];
		var userName = "nrasurveyor" + new Date().getUnix();
		var name = req.surveyor.name.split(' ');

		var userForm = {
			username: userName,
			password: createdPassword,
			first_name: name[0],
			last_name: name[1],
			email: 'kathmandulivinglabs+' + userName + '@gmail.com'
		}

		console.log('YOYO',userForm);

		request.post('https://api.ona.io/api/v1'+ '/profiles', {
			form: userForm
		}, function(err, res) {
			if (err) return next(err);

			if (res && res.body && res.body.id) {
				req.surveyor.surveyorID = res.body.id;
				req.surveyor.createdPassword = createdPassword;
				req.surveyor.username = userName;
			}

			next();

		})

	}

}