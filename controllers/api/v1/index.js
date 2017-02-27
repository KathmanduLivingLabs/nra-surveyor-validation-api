var smsFlier = require('../../../libs/smsflier');
var mw = require('../../../libs/middleware');

module.exports = (router) =>{

	router.get('/api/v1/user/validate',function(req,res){


		console.log('NEW REQUESTT ***************')

		console.log(req.body)

		console.log(req.params)

		console.log(req.query)

		req.cdata = {
			status : 200,
			message : 'Done Successfully !'
		};

		// var numbers = [ 9841834495 ];

		// smsFlier.send(numbers,'For login');


	},
	mw.respond,
	mw.error)
}