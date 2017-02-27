var config = require('../config');
var request = require('request');
module.exports = {

	send: function(numbers, message, cb) {

		var smsconfig = {
			to: numbers.join(','),
			text: message,
			token: config.sparrowSMS.token,
			from: config.sparrowSMS.identity
		};


		// request.get(config.sparrowSMS.baseUrl + '/sms/', {
		// 	qs: smsconfig
		// }, function(err, res) {
		// 	if (err) return cb(err);
		// 	return cb(null, res);

		// })



	}


}